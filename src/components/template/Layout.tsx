import useAppData from "@/data/hook/useAppData"
import Content from "./Content"
import Header from "./Header"
import SideMenu from "./SideMenu"
import ForceAuthentication from "../auth/ForceAuthentication"
import { useState } from "react"
import { Button } from "../ui/button"
import { CloseMenuIcon, OpenMenuIcon } from "@/icons"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(params: LayoutProps) {

    const { theme } = useAppData()
    const [menuVisible, setMenuVisible] = useState(false)
    const [margin, setMargin] = useState(false)

    const handleButtonClick = () => {
        setMenuVisible(!menuVisible);
        setMargin(false);
    };

    const handleMouseOver = () => {
        if (!menuVisible) {
            setMargin(true);
        }
    };

    const handleMouseOut = () => {
        setMargin(false);
    };

    return (
        <ForceAuthentication activate={false}>
            <div className={`${theme} flex h-screen w-screen`}>
                {menuVisible && <SideMenu />}
                <div
                    className={`flex flex-col bg-gray-600 dark:bg-gray-900 ${margin ? 'w-2' : 'w-0'}`}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <Button
                        onClick={handleButtonClick}
                        className={`h-10 bg-transparent absolute p-0 ms-1 mt-10 ${menuVisible
                                ? 'bg-gray-600 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-900 rounded-none rounded-r-md ms-neg-8'
                                : 'hover:bg-gray-600 hover:border-l-4 border-l-gray-600 dark:hover:bg-gray-900  dark:border-l-gray-900'
                            }`}
                    >
                        {menuVisible ? CloseMenuIcon : OpenMenuIcon}
                    </Button>
                </div>
                <div className="flex flex-col w-full p-7 bg-gray-200 dark:bg-gray-800">
                    <Header titulo={params.titulo} subtitulo={params.subtitulo} />
                    <Content>{params.children}</Content>
                </div>
            </div>
        </ForceAuthentication>
    )
};
