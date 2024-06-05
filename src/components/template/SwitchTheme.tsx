import { MoonIcon, SunIcon } from "@/icons";
import { useState, useEffect } from "react";

interface SwitchThemeProps {
    theme: string;
    switchTheme: () => void;
}

export default function SwitchTheme(props: SwitchThemeProps) {
    const [isLightTheme, setIsLightTheme] = useState(props.theme === '');

    useEffect(() => {
        setIsLightTheme(props.theme === '');
    }, [props.theme]);

    return (
        <div
            onClick={props.switchTheme}
            className={`flex items-center
            p-1 rounded-full
            w-14 lg:w-24 h-8
            `}
            style={{
                background: isLightTheme
                    ? 'linear-gradient(to right, #FDE68A, #F59E0B)'
                    : 'linear-gradient(to right, #4B5563, #1E3A8A, #1E40AF)',
            }}
        >
            <div
                className={`absolute flex items-center justify-center
                bg-white ${isLightTheme ? 'text-yellow-600 text-lg' : 'text-gray-600'} text-lg
                rounded-full
                w-6 h-6
                transition-all duration-500 ${isLightTheme ? 'lg:translate-x-16 translate-x-6 rotate-180' : ' -rotate-0'}`}

            >
                {isLightTheme ? SunIcon : MoonIcon}
            </div>

            <div className={`text-white hidden lg:flex  `}>
                {isLightTheme ? (
                    <span className={`ml-3 ${isLightTheme ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>Ligth</span>
                ) : (
                    <span className={`ml-8 ${isLightTheme ? 'opacity-0' : 'opacity-100'} transition-all duration-500`}>Dark</span>
                )}
            </div>


        </div>
    );
}
