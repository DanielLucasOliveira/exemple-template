import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";

import { LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { GoogleIcon } from "@/icons";
import useAuth from "@/data/hook/useAuth";

export default function Login(props: any) {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { user, googleLogin } = useAuth();

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        console.log(data);
    };

    return (
        <div className="xl:w-1/4 lg:w-1/3">
            <CardWrapper
                label="Login with your account"
                title="Login"
                backButtonHref="/authenticate?login=false"
                backButtonLabel="Don't have an account?"
                backButtonLink="Register here."
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="your_email@gmail.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="******" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
                <Button onClick={googleLogin} type="button" className="flex w-full mt-4 bg-white text-black hover:bg-gray-300 border border-gray-300 items-center relative">
                    <i className="absolute left-4">{GoogleIcon}</i>
                    <span className="w-full text-center">Login with Google</span>
                </Button>

            </CardWrapper>
        </div>
    );
}
