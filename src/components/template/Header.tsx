import useAppData from "@/data/hook/useAppData"
import SwitchTheme from "./SwitchTheme"
import Title from "./Title"

interface HeaderProps {
    titulo: string
    subtitulo: string
}

export default function Header(params : HeaderProps) {

    const {theme, changeTheme} = useAppData()

    return (
        <div className="flex">
            <Title titulo={params.titulo} subtitulo={params.subtitulo}/>
            <div className="flex flex-grow justify-end">
                <SwitchTheme switchTheme={changeTheme} theme={theme}/>
            </div>
        </div>
    )
};
