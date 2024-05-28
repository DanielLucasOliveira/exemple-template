import { useRouter } from 'next/router'
import Auth from '../components/auth/Auth'
import Login from '@/components/auth/Login';
import Image from 'next/image';

export default function Authenticate() {
    const router = useRouter();
    const { login } = router.query;

    // Converter o valor de login para booleano
    const isLogin = login === 'true';

    return (
        <div className='flex justify-center items-center h-screen'>

            {isLogin ? <Login /> : <Auth />}

        </div>
    );
}
