import { BellIcon, ConfigIcon, HomeIcon, LogoutIcon } from "@/icons";
import ItemsMenu from "./ItemsMenu";
import Logo from "./Logo";
import Link from "next/link";

interface MenuProps {
    
}

export default function SideMenu(params: MenuProps) {
    return (
        <aside className="flex flex-col bg-gray-600">
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
            <ul className="text-red-600 mb-3">
                <ItemsMenu text="logout" icon={LogoutIcon} onClick={() => console.log("logout")} className="hover:bg-red-600 hover:text-white"/>
            </ul>
        </aside>
    )
};
