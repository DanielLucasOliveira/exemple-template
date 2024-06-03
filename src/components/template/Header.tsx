import useAppData from "@/data/hook/useAppData"
import SwitchTheme from "./SwitchTheme"
import Title from "./Title"
import UserAvatar from "./UserAvatar"

interface HeaderProps {
    titulo: string
    subtitulo: string
}

export default function Header(params: HeaderProps) {

    const { theme, changeTheme } = useAppData()

    return (

        <div className="flex">
            <Title titulo={params.titulo} subtitulo={params.subtitulo} />
            <div className="flex flex-grow justify-end items-center">
                <SwitchTheme switchTheme={changeTheme} theme={theme} />
                <UserAvatar />
            </div>
        </div>

    )
};
