import { ReactNode } from "react";
import AuthModal from "@/app/components/authModal";
import HeaderLoginCadastro from "@/app/components/HeaderLoginCadastro";

export default function AuthLayout ({ children }: { children: ReactNode}){
    return(
        <div className="bg-zinc-900 w-screen h-screen flex justify-center">
            <AuthModal>
                {children}
            </AuthModal>
        </div>
    )
}
