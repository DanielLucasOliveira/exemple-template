import useAppData from "@/data/hook/useAppData"
import SwitchTheme from "../SwitchTheme"
import UserAvatar from "../UserAvatar"
import ButtonHeader from "./ButtonHeader"
import MenuButton from "./MenuButton"
import { useState } from "react"

interface HeaderProps {

}

export default function Header(params: HeaderProps) {

    const { theme, changeTheme } = useAppData();

    const [selected, setSelected] = useState<string | null>(null);


    function renderize(button: string) {
        setSelected(button);
    }

    return (

        <div className="flex p-2 border-y-2 border-gray-700 dark:border-gray-950">
            <MenuButton />
            <div className="flex flex-grow justify-start items-center">
                <ButtonHeader text="Finans" isSelected={selected === 'finans'} onClick={() => renderize('finans')}/>
                <ButtonHeader text="Finans" isSelected={selected === 'invest'} onClick={() => renderize('invest')}/>
                <ButtonHeader text="Finans" isSelected={selected === 'report'} onClick={() => renderize('report')}/>
            </div>
            <div className="flex flex-grow">

            </div>
            <div className="flex flex-grow justify-end items-center">
                <SwitchTheme switchTheme={changeTheme} theme={theme} />
                <UserAvatar />
            </div>
        </div>

    )
};
