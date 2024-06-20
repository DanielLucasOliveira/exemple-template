import useAppData from "@/data/hook/useAppData"
import Content from "./Content"
import Header from "./header/Header"
import SideMenu from "./SideMenu"
import ForceAuthentication from "../auth/ForceAuthentication"
import { useState } from "react"
import { Button } from "../ui/button"
import { CloseMenuIcon, OpenMenuIcon } from "@/icons"

interface LayoutProps {
    children?: any
}

export default function Layout(params: LayoutProps) {

    const { theme, menuState } = useAppData()

    return (
        <ForceAuthentication activate={false}>
            <div className={`${theme} flex h-screen w-screen`}>
                {menuState && <SideMenu />}
                <div className="flex flex-col w-full p-4 bg-gray-200 dark:bg-gray-800">
                    <Header/>
                    <Content>{params.children}</Content>
                </div>
            </div>
        </ForceAuthentication>
    )
};
