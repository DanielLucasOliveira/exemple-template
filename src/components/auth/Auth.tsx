import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";

import { RegisterSchema } from "./schema";
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

export default function Auth(props: any) {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        console.log(data);
    };
    const { user, googleLogin } = useAuth();

    return (
        <div className="xl:w-1/4 lg:w-1/3">
            <CardWrapper
                label="Create an account"
                title="Register"
                backButtonHref="/authentication?login=true"
                backButtonLabel="Already have an account? "
                backButtonLink="Login here."
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="Enter your name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm your password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="******" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </Form>
                <Button onClick={googleLogin} type="button" className="flex w-full mt-4 bg-white text-black hover:bg-gray-300 border border-gray-300 items-center relative">
                    <i className="absolute left-4">{GoogleIcon}</i>
                    <span className="w-full text-center">Sign with Google</span>
                </Button>
            </CardWrapper>
        </div>
    );
}
