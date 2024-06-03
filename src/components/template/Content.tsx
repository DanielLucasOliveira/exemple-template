import ForceAuthentication from "../auth/ForceAuthentication"

interface ContentProps {
    children?: any
}

export default function Content(params: ContentProps) {
    return (
        <ForceAuthentication>
            <div className="flex flex-col mt-7 dark:text-gray-300">
                {params.children}
            </div>
        </ForceAuthentication>
    )
};
