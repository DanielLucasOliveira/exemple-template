import Layout from "@/components/template/Layout";
import CardProfile from "@/components/template/profile/CardProfile";
import useAuth from "@/data/hook/useAuth";
export default function Profile(params: any) {

    const { isAuthenticated } = useAuth();

    return (
        <Layout>
            {!!isAuthenticated && (
                <div className="flex flex-col">
                    <CardProfile />
                    {/* <CardInvestments /> */}
                </div>
            )}
            {!isAuthenticated && (

                <div className="flex flex-col">
                    <span>Você não está logado</span>
                </div>

            )}


        </Layout>
    );
};
