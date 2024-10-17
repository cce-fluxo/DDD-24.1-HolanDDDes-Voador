import { ReactNode } from "react";

type AuthModalProps = {
    children: ReactNode;
}
export default function AuthModal({children}: AuthModalProps){
    
    return(
        <div className="bg-white w-[40%] h-auto rounded-t-[30px] pt-[48px] px-[40px] pb-[8%] fixed bottom-0">
            {children}
        </div>
    )
}