// Importe corretamente

import useAppData from "@/data/hook/useAppData";
import { useRouter } from "next/router";
import SwitchTheme from "./SwitchTheme";
import UserAvatar from "../UserAvatar";
import ButtonHeader from "./ButtonHeader";
import MenuButton from "./MenuButton";
import useMenuData from "@/data/hook/useMenuData";

export default function Header() {
    const { theme, changeTheme } = useAppData();
    const { selectedButton, setSelectedButton } = useMenuData();
    const router = useRouter();

    return (
        <div>
            {router.pathname === '/' && (
                <div className="flex p-2 border-y-2 border-gray-700 dark:border-gray-950">
                    <MenuButton />
                    <div className="flex flex-grow justify-start items-center">
                        <ButtonHeader text="Finans" isSelected={selectedButton === 'Finans'} onClick={() => setSelectedButton('Finans')} />
                        <ButtonHeader text="Invest" isSelected={selectedButton === 'Invest'} onClick={() => setSelectedButton('Invest')} />
                        <ButtonHeader text="Report" isSelected={selectedButton === 'Report'} onClick={() => setSelectedButton('Report')} />
                    </div>
                    <div className="flex flex-grow"></div>
                    <div className="flex flex-grow justify-end items-center">
                        <SwitchTheme switchTheme={changeTheme} theme={theme} />
                        <UserAvatar />
                    </div>
                </div>
            )}

            {router.pathname != '/' && (
                <div className="flex p-2 border-y-2 border-gray-700 dark:border-gray-950">
                    <MenuButton />
                    <div className="flex flex-grow"></div>
                    <div className="flex flex-grow justify-end items-center">
                        <SwitchTheme switchTheme={changeTheme} theme={theme} />
                        <UserAvatar />
                    </div>
                </div>
            )}
        </div>
    );
}
