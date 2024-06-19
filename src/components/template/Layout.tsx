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

    const { theme, changeMenuState, menuState } = useAppData()
    const [margin, setMargin] = useState(false)
    

    const handleButtonClick = () => {
        changeMenuState()
        setMargin(false);
    };

    const handleMouseOver = () => {
        if (!menuState) {
            setMargin(true);
        }
    };

    const handleMouseOut = () => {
        setMargin(false);
    };

    return (
        <ForceAuthentication activate={false}>
            <div className={`${theme} flex h-screen w-screen`}>
                {menuState && <SideMenu />}
                <div
                    className={`flex flex-col bg-gray-600 dark:bg-gray-900 ${margin ? 'w-2' : 'w-0'}`}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <Button
                        onClick={handleButtonClick}
                        className={`h-10 bg-transparent absolute p-0 ms-1 mt-10 ${menuState
                                ? 'bg-gray-600 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-900 rounded-none rounded-r-md ms-neg-8'
                                : 'hover:bg-gray-600 hover:border-l-4 border-l-gray-600 dark:hover:bg-gray-900  dark:border-l-gray-900'
                            }`}
                    >
                        {menuState ? CloseMenuIcon : OpenMenuIcon}
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
