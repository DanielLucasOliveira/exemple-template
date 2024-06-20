import { BsHouse } from "react-icons/bs"
import { CgMenu } from "react-icons/cg"
import { CiLogin, CiMenuBurger } from "react-icons/ci"
import { FaRegMoon , FaRegBell } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { GoSun } from "react-icons/go"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineLogout } from "react-icons/md"

export const HomeIcon = (
    <BsHouse />
)

export const ConfigIcon = (
    <IoSettingsOutline />
)

export const BellIcon = (
    <FaRegBell />
)

export const LoginIcon = (
    <CiLogin /> 
)

export const LogoutIcon = (
    <MdOutlineLogout />
)

export const SunIcon = (
    <GoSun size={20} />
)

export const MoonIcon = (
    <FaRegMoon  />
)

export const GoogleIcon = (
    <FcGoogle size={24}/>
)

export const OpenMenuIcon = (
    <IoIosArrowForward className="dark:text-gray-400 text-gray-800" />
)

export const CloseMenuIcon = (
    <IoIosArrowBack className="dark:text-gray-400 text-gray-800" />
)

export const MenuIcon = (
    <CgMenu  className="dark:text-gray-600 text-gray-600 hover:text-gray-900 dark:hover:text-gray-700" size={28}/>
)
