

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
                    p-2 ${props.isSelected ? 'bg-gray-700 shadow-inner shadow-gray-950' : 'bg-gray-600'} 
                    rounded-sm w-[200px] me-4 text-white hover:bg-gray-700
                    
                `}
                onClick={props.onClick}
            >
                {props.text}
            </button>
        </div>
    )
};
