import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";

export default function UserAvatar() {
    const { user } = useAuth();
    return ( 
        <Link href={'/profile'} className="ml-2">
            <Image 
                src={user?.imageUrl ?? '/images/avatar.svg'} 
                width={200}
                height={200}
                alt="User Image"
                className="w-10 h-10 rounded-full cursor-pointer"
            />
        </Link>
    )
};
