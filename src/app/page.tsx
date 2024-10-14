import Image from "next/image";
import Passaro from "../../public/passaro.png";
import Seta from "../../public/seta.png";
import HeaderLogOff from "@/app/HeaderLogOff";
import CustomButton from "./components/CustomButton";
import Link from "next/link";

export default function LogOff() {
  return (
    <>
      <HeaderLogOff />
      <div className=" w-screen justify-center gap-[13vw] items-center h-screen flex">
        <div className=" mt-10 w-[447px] h-[390px]">
          <div className=" mb-[72px] ">
            <p className=" text-[48px] font-semibold font-poppins text-preto">
              Anunciar seu hotel com a{" "}
              <span className=" text-red-600">BonVoyage</span>
            </p>
            <p className=" text-[48px] font-semibold font-poppins text-preto">
              é <span className=" text-orange-500">Fácil</span>
            </p>
          </div>

          <div className=" flex justify-center ">
            <Link
              href={"/cadastro-1"}
              className="flex items-center justify-center gap-[16px] w-[340px] h-[80px] bg-red-700 rounded-2xl"
            >
              <span className=" text-white font-semibold text-[30px]">
                Começe Agora!
              </span>
              <Image src={Seta} alt=""></Image>
            </Link>
          </div>
        </div>
        <div className="w-[447px] h-[390px]">
          <Image src={Passaro} alt=""></Image>
        </div>
      </div>
    </>
  );
}
