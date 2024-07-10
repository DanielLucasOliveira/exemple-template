import useAuth from "@/data/hook/useAuth";
import Image from "next/image";

export default function CardProfile(params: any) {

    const { user } = useAuth();

    return (
        <div className="flex flex-row text-black dark:text-white mb-6">
            <div className="flex flex-col bg-gray-400 dark:bg-gray-900 rounded-md p-6 shadow-gray-600 dark:shadow-gray-950 shadow-inner">
                <h3 className="font-semibold text-center">Profile</h3>
                <div className="flex justify-center p-6">
                    <Image
                        src={user?.imageUrl ?? '/images/avatar.svg'}
                        width={200}
                        height={200}
                        alt="User Image"
                        className="w-36 h-36 rounded-full cursor-pointer border-2 border-gray-500"
                    //objectFit="cover"
                    />

                </div>
                <div className="mt-4 justify-start ">
                    <ul className="flex flex-col">
                        <li className="flex flex-col">
                            <label>Name:</label>
                            <span className="mb-2">{user?.name}</span>
                        </li>
                        <li className="flex flex-col">
                            <label>E-mail:</label>
                            <span className="mb-2">{user?.email}</span>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
};
