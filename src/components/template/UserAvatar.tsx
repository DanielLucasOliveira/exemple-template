import useAuth from "@/data/hook/useAuth";
import User from "@/model/User";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserAvatar() {
    const { user, isAuthenticated } = useAuth();
    const [loggedUser, setUser] = useState<User | null | undefined>(null)

    useEffect(() => {
        if(isAuthenticated){
            setUser(user)
        }
    }, [isAuthenticated, user])
    return (

        <Link href={'/profile'} className="ml-2">
            <Image
                src={loggedUser?.image ?? '/images/avatar.svg'}
                width={200}
                height={200}
                alt="User Image"
                className="w-10 h-10 rounded-full cursor-pointer"
                fetchPriority="auto"
            />
        </Link>
    )
};
