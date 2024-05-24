interface ContentProps {
    children? : any
}

export default function Content(params : ContentProps) {
    return ( 
        <div className="flex flex-col mt-7">
            {params.children}
        </div>
    )
};
