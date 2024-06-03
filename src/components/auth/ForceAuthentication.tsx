import useAuth from '@/data/hook/useAuth'
import styles from '../../styles/Loader.module.css'

export default function ForceAuthentication(props: any) {
    const { user, loading } = useAuth()

    function renderizeContent() {
        return (
            <>
                {props.children}
            </>
        )
    }

    function onLoading() {
        return (
            <div className='flex justify-center items-center h-full planet'>
                <div className={`${styles.loader_main}`}>
                </div>
                <div className={`${styles.loader_one}`}>
                </div>
                <div className={`${styles.loader}`}>

                </div>
            </div>
        )
    }

    if(!loading){
        return renderizeContent()
    } else {
        return onLoading()
    }
}
