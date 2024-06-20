import useAppData from "@/data/hook/useAppData";
import { MenuIcon } from "@/icons";


interface MenuButtonProps {
}

export default function MenuButton(props: MenuButtonProps) {

    const { changeMenuState } = useAppData()

    const handleButtonClick = () => {
        changeMenuState()
    };

    return (
        <div className="flex items-center mx-2">
            <button onClick={handleButtonClick}>
                {MenuIcon}
            </button>
        </div>
    )
};
