interface TitleProps {
    titulo: string
    subtitulo: string
}

export default function Title(params : TitleProps) {
    return (
        <div>
            <h1 className="font-black text-3xl text-gray-900">{params.titulo}</h1>
            <h2 className="font-light text-sm text-gray-600">{params.subtitulo}</h2>
        </div>
    )
};
