import { AppProvider } from "@/data/context/AppContext";
import { AuthProvider } from "@/data/context/AuthContext";
import { MenuProvider } from "@/data/context/MenuContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <MenuProvider>
          <Component {...pageProps} />
        </MenuProvider>
      </AppProvider>
    </AuthProvider>
  )
}
