import CardWrapper from "./card-wrapper";


export default function Auth(props: any) {
    return (
        <div className="xl:w-1/4 lg:w-1/2">
            <CardWrapper
                label="Create an account"
                title="Register"
                backButtonHref="/auth/login"
                backButtonLabel="Already have an account? Login here."
            >
                <div>

                </div>
            </CardWrapper>
        </div>
    )
};
