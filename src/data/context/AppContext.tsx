import { createContext, useEffect, useState } from "react";

//type Theme = 'dark' | ''

interface ContextProps {
    theme: string;
    changeTheme: () => void;
}

const AppContext = createContext<ContextProps>({
    theme: '',
    changeTheme: () => {}
});

export function AppProvider(props: any) {
    const [theme, setTheme] = useState<string>('');

    const changeTheme = () => {
        const newTheme = theme === 'dark' ? '' : 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    
    return (
        <AppContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;
