import useAuth from '@/data/hook/useAuth'
import Loading from '../template/Loading'
import { useRouter } from 'next/router'

interface ForceAuthenticationProps {
    activate?: boolean
    children?: any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
    const { user, loading } = useAuth()

    const router = useRouter();

    function renderizeContent() {
        return (
            <>
                {props.children}
            </>
        )
    }

    if(!!props.activate) {
        if(!loading && user?.email){
            return renderizeContent()
        } else if (loading){
            return (
                <Loading loading={loading}/>
            )
        } else {
            router.push('/authentication?login=true')
            return null
        }
    } else {
        return renderizeContent();
    }
}
