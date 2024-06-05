import styles from '../../styles/Loader.module.css'


interface LoadingProps {
    loading?: boolean
}

export default function Loading(props: LoadingProps ) {

    
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

    if(props.loading){
        return onLoading()
    } else {
        return null
    }

};
