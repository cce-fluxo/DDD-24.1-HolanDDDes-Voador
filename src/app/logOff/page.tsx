import Image from "next/image";
import Passaro from "../../../public/passaro.png"
import Seta from "../../../public/seta.png"
import LogOffHeader from "../HeaderLogOff";

export default function LogOff(){
    return(
        <>
        <LogOffHeader/>
    
        <div className=" w-screen justify-center gap-[13vw] items-center h-screen flex">
            <div className=" mt-10 w-[447px] h-[390px]">

                <div className=" mb-[72px] ">
                    <p className=" text-[48px] font-semibold">Anunciar seu hotel com a <span className=" text-red-600">BonVoyage</span></p>
                    <p className=" text-[48px] font-semibold">é <span className=" text-orange-500">Fácil</span></p>
                </div>

                <div className=" flex justify-center ">
                    <button className=" flex items-center justify-center gap-[16px] w-[340px] h-[80px] bg-red-700 rounded-2xl">
                        <p className=" text-white font-semibold text-[30px] ">Começe Agora!</p>
                        <Image src={Seta} alt=""></Image>
                    </button>
                </div>

            </div>
            <div className=" w-[447px] h-[390px]">
                <Image src={Passaro} alt=""></Image>
            </div>
        </div>
        </>
    )
}