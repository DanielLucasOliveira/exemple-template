import { BellIcon, ConfigIcon, HomeIcon, LoginIcon, LogoutIcon } from "@/icons";
import ItemsMenu from "./ItemsMenu";
import Logo from "./Logo";
import Link from "next/link";
import useAuth from "@/data/hook/useAuth";
import { useRouter } from "next/router";

interface MenuProps {

}

export default function SideMenu(params: MenuProps) {

    const { logout, user } = useAuth();
    const router = useRouter();

    function login() {
        router.push('/authentication?login=true')
    }

    return (
        <aside className="flex flex-col bg-gray-600 dark:bg-gray-900 ">
            <div className="flex flex-col items-center justify-center h-20 p-1 mb-2">
                <Link href={"/"} passHref>
                    <Logo />
                </Link>
            </div>
            <ul className="text-gray-200 flex-grow">
                <ItemsMenu url="/" text="Home" icon={HomeIcon} />
                <ItemsMenu url="/settings" text="Settings" icon={ConfigIcon} />
                <ItemsMenu url="/notifications" text="Notifications" icon={BellIcon} />
            </ul>
            {!!user ? (
                <ul className="text-red-600 mb-3 ">
                    <ItemsMenu text="logout" icon={LogoutIcon} onClick={logout} className="hover:bg-red-600 dark:hover:bg-red-600 hover:text-white" />
                </ul>
            ) : (
                <ul className="text-green-500 mb-3 ">
                    <ItemsMenu text="login" icon={LoginIcon} onClick={login} className="hover:bg-green-600 dark:hover:bg-green-600 hover:text-white" />
                </ul>
            )}
        </aside>
    )
};
