interface TitleProps {
    titulo: string
    subtitulo: string
}

export default function Title(params : TitleProps) {
    return (
        <div>
            <h1 className="font-black text-3xl text-gray-900 dark:text-gray-200">{params.titulo}</h1>
            <h2 className="font-light text-sm text-gray-600 dark:text-gray-400 mt-1">{params.subtitulo}</h2>
        </div>
    )
};
