import useAppData from "@/data/hook/useAppData"
import Content from "./Content"
import Header from "./Header"
import SideMenu from "./SideMenu"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(params: LayoutProps) {

    const {theme, changeTheme} = useAppData()
    
    return (
        <div className={`${theme} flex h-screen w-screen`}>
            <SideMenu />
            <div className="flex flex-col w-full p-7 bg-gray-200 dark:bg-gray-800">
                <Header titulo={params.titulo} subtitulo={params.subtitulo} />
                <Content>{params.children}</Content>
            </div>
        </div>
    )
};
