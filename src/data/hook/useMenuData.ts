import { useContext } from "react";
import MenuContext from "../context/MenuContext";

const useAuth = () => useContext(MenuContext)


export default useAuth;