import { createContext, useEffect, useState } from "react";
import { auth } from '../../firebase/config';
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import User from "@/model/User";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from "axios";

interface AuthContextProps {
    user?: User | null;
    googleLogin?: () => Promise<void>;
    googleRegister?: () => Promise<User | null>;
    registerUser?: (data: User, image: string | undefined) => Promise<void>;
    login?: (email: string, password: string) => Promise<void>;
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

function manageCookies(logged: boolean) {
    if (logged) {
        Cookies.set('template-auth', logged.toString(), { expires: 7 });
    } else {
        Cookies.remove('template-auth');
    }
}

export function AuthProvider(props: any) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    async function sessionConfig(user: User | null) {
        if (user?.email) {
            setUser(user);
            manageCookies(true);
        } else {
            setUser(null);
            manageCookies(false);
        }
        setLoading(false);
        return user?.email || false;
    }

    const router = useRouter();

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

                if (response.statusText === 'OK') {
                    const { email } = response.data;
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, { email, password });

            if (response.data.success) {
                const userData = response.data.user;
                await sessionConfig(userData);
                manageCookies(true);
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
                const user = await normalizedUser(result.user);
                await sessionConfig(user);
                router.push('/');
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
            await auth.signOut();
            await sessionConfig(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const cancel = auth.onIdTokenChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const user = await normalizedUser(firebaseUser);
                await sessionConfig(user);
            } else {
                setUser(null);
                manageCookies(false);
                setLoading(false);
            }
        });

        return () => cancel();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleLogin, googleRegister, logout, loading, registerUser, login, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
