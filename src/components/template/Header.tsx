import Title from "./Title"

interface HeaderProps {
    titulo: string
    subtitulo: string
}

export default function Header(params : HeaderProps) {
    return (
        <div>
            <Title titulo={params.titulo} subtitulo={params.subtitulo}/>
        </div>
    )
};
