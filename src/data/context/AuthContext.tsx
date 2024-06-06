import { createContext, useEffect, useState } from "react";
import { auth } from '../../firebase/config';
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import User from "@/model/User";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import firebase from "firebase/compat/app";

interface AuthContextProps {
    user?: User | null;
    googleLogin?: () => Promise<void>;
    login?: (email: string, password: string) => Promise<void>
    logout?: () => Promise<void>;
    loading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: FirebaseUser): Promise<User> {
    const token = await firebaseUser.getIdToken();
    return {
        uid: firebaseUser.uid,
        username: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        token: token,
        provider: firebaseUser.providerData[0]?.providerId || '',
        imageUrl: firebaseUser.photoURL || ''
    };
}

function manageCookies(logged: any) {
    if (logged) {
        Cookies.set('template-auth', logged, { expires: 7 });
    } else {
        Cookies.remove('template-auth');
    }
}

export function AuthProvider(props: any) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    async function sessionConfig(firebaseUser: FirebaseUser | null) {
        if (firebaseUser?.email) {
            const user = await normalizedUser(firebaseUser);
            setUser(user);
            manageCookies(true);
            setLoading(false);
            return firebaseUser.email;
        } else {
            setUser(null);
            manageCookies(false);
            setLoading(false);
            return false;
        }
    }

    const router = useRouter();


    async function registerUser(/** username, email, password */) {
        try {
            setLoading(true)
            //todo: create method to register the user
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    async function googleLogin() {
        try {
            setLoading(true)
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await sessionConfig(result.user);
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    async function login(email: string, password: string) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = resp.user as FirebaseUser
            await sessionConfig(user)
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await auth.signOut()
            await sessionConfig(null)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if( Cookies.get('template-auth')) {
            const cancel = auth.onIdTokenChanged(sessionConfig);
            return () => cancel();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleLogin, logout, loading }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
