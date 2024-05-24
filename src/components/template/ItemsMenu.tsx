import Link from "next/link"

interface ItemsProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (e: any) => void
}

export default function ItemsMenu(props: ItemsProps) {

    function renderizar() {
        return (
            <div className="flex flex-col justify-center items-center h-20">
                <i className="text-lg">{props.icon}</i>
                <span className="text-sm font-light">
                    {props.text}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick} className={`hover:bg-gray-500 p-1 cursor-pointer ${props.className}`}>
            {props.url ? (
                <Link href={props.url} passHref >
                    {renderizar()}
                </Link>
            ) : renderizar()}
        </li>
    )
};
