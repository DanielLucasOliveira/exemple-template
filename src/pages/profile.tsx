import Layout from "@/components/template/Layout";
import CardProfile from "@/components/template/profile/CardProfile";
export default function Profile(params: any) {

    return (
        <Layout>
            <div className="flex flex-col">
                <CardProfile />
                {/* <CardInvestments /> */}
            </div>

        </Layout>
    );
};
