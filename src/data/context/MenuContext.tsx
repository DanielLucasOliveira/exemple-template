import { createContext, useState, ReactNode } from "react";

interface MenuContextProps {
    selectedButton: string;
    setSelectedButton: (button: string) => void;
}

const MenuContext = createContext<MenuContextProps>({
    selectedButton: 'finans',
    setSelectedButton: () => {},
});

interface MenuProviderProps {
    children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
    const [selectedButton, setSelectedButton] = useState<string>('Finans');

    return (
        <MenuContext.Provider value={{ selectedButton, setSelectedButton }}>
            {children}
        </MenuContext.Provider>
    );
}

export default MenuContext;
