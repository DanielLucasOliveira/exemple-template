import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import { auth } from '../../firebase/config';
import User from "@/model/User";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from "axios";

interface AuthContextProps {
    user?: User | null;
    registerUser?: (data: User, image: string | undefined) => Promise<void>;
    googleRegister?: () => Promise<User | null>;
    login?: (email: string, password: string) => Promise<void>;
    googleLogin?: () => Promise<void>;
    logout?: () => Promise<void>;
    loading?: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false
});

async function normalizedUser(firebaseUser: FirebaseUser): Promise<User> {
    const token = await firebaseUser.getIdToken();
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        token: token,
        provider: firebaseUser.providerData[0]?.providerId || '',
        image: firebaseUser.photoURL || ''
    };
}

function manageCookies(logged: boolean, token?: string) {
    if (logged && token) {
        Cookies.set('template-auth-token', token, { expires: 7 });
    } else {
        Cookies.remove('template-auth-token');
    }
}

export function AuthProvider(props: any) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    async function sessionConfig(user: User | null, token?: string) {
        if (user?.email) {
            setUser(user);
            manageCookies(true, token);
        } else {
            setUser(null);
            manageCookies(false);
        }
        setLoading(false);
        return user?.email || false;
    }

    async function registerUser(data: User, image: string | undefined): Promise<void> {
        try {
            setLoading(true);
            if (data.password) {
                const parseData = {
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    image: image
                };
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, parseData);

                if (response.statusText === 'Created') {
                    const { email } = response.data.createdUser;
                    if (email && data.password) {
                        await login(email, data.password);
                    } else {
                        console.error("Email or password is undefined");
                    }
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    async function googleRegister(): Promise<User | null> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = await normalizedUser(result.user);
            setUser(user);
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function login(email: string, password: string) {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
            const token = response.data.acess_token;
            if (token) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/login/${res.data.sub}`)

                await sessionConfig(data, token);
                router.push('/');
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    async function googleLogin() {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const { email } = result.user;

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/email/${email}`);
            if (!res.data) {
                router.push('/authentication?login=false');
            } else {
                login(res.data.email, res.data.password)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            setLoading(true);
            setUser(null);
            manageCookies(false);
            router.push('/authentication?login=true');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('template-auth-token');

            if (token) {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    await sessionConfig(data.user, token);
                } catch (error) {
                    console.log(error);
                    manageCookies(false);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, logout, loading, registerUser, googleRegister, login, googleLogin, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
