import useAppData from "@/data/hook/useAppData"
import Content from "./Content"
import Header from "./header/Header"
import ForceAuthentication from "../auth/ForceAuthentication"
import { ReactNode } from "react"
import SideMenu from "./header/SideMenu"


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { theme, menuState } = useAppData();

    return (
        <ForceAuthentication activate={false}>
            <div className={`${theme} flex h-screen w-screen`}>
                {menuState && <SideMenu />}
                <div className="flex flex-col w-full p-4 bg-gray-200 dark:bg-gray-800">
                    <Header />
                    <Content>{children}</Content>
                </div>
            </div>
        </ForceAuthentication>
    );
}

