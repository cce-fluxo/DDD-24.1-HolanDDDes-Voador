import Image from "next/image";
import Pessoa from "../../public/pessoa.png"


export default function Box0hospede() {
    return(
        <div className=" flex items-center min-w-[420px] min-h-[140px] gap-[24px] px-[20px] bg-cinza1 rounded-[20px]">
            <div className=" w-[136px] h-[100px]">
                <Image src={Pessoa} alt=""></Image>
            </div>
            <div>
                <p className=" text-[24px] font-sans text-cinza3">Nenhum hóspede</p>
            </div>
        </div>
    )
}
