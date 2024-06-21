

interface ButtonHeaderProps {
    text: string
    isSelected: boolean
    onClick: () => void;
}

export default function ButtonHeader(props: ButtonHeaderProps) {
    
    return (
        <div>
            <button 
                className={`
                    p-2 ${props.isSelected ? 'bg-green-500 dark:bg-green-600 shadow-inner shadow-gray-950' : 'dark:bg-gray-600 bg-gray-800'} 
                    rounded-sm w-[200px] me-4 text-white ${!props.isSelected ? 'hover:bg-gray-700 dark:hover:bg-gray-700' : ''}
                    
                `}
                onClick={props.onClick}
                disabled={props.isSelected}
            >
                {props.text}
            </button>
        </div>
    )
};
