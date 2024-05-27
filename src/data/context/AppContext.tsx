import { createContext, useState } from "react";

type Theme = 'dark' | ''

interface ContextProps {
    theme: Theme
    changeTheme: () => void
}

const AppContext = createContext<ContextProps>({
    theme: '',
    changeTheme: () => {}
})

export function AppProvider(props: any) {

    const [theme, setTheme] = useState<Theme>('');

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? '' : 'dark'));
    };
    
    return (
        <AppContext.Provider value={{theme, changeTheme}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext