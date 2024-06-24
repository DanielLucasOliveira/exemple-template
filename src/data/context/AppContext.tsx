import { createContext, useEffect, useState } from "react";

interface ContextProps {
    theme: string;
    menuState: boolean;
    changeTheme: () => void;
    changeMenuState: () => void;
}

const AppContext = createContext<ContextProps>({
    theme: '',
    menuState: false,
    changeTheme: () => { },
    changeMenuState: () => { },
});

export function AppProvider(props: any) {
    const [theme, setTheme] = useState<string>('');
    const [menuState, setMenuState] = useState<boolean>(false);

    const changeTheme = () => {
        const newTheme = theme === 'dark' ? '' : 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const changeMenuState = () => {
        const newState = menuState === false ? true : false;
        setMenuState(newState);
        localStorage.setItem('menuState', JSON.stringify(newState)); // Convertendo para string
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const savedState = localStorage.getItem('menuState');
        if (savedTheme) {
            setTheme(savedTheme);
        }
        if (savedState) {
            setMenuState(JSON.parse(savedState)); // Convertendo de volta para booleano
        }
    }, []);

    return (
        <AppContext.Provider value={{ theme, changeTheme, menuState, changeMenuState }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;
