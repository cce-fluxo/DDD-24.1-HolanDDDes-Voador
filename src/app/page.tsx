"use client"

import Image from "next/image";
import Passaro from "../../public/passaro.png";
import Seta from "../../public/seta.png";
import HeaderLogOff from "@/app/HeaderLogOff";
import Link from "next/link";
import LetreiroAnimado from "../app/components/LetreiroAnimado"

export default function LogOff() {
  return (
    <>
      <HeaderLogOff />
      <div className=" w-screen justify-center gap-[13vw] items-center h-screen flex">
        <div className=" flex flex-col justify-around mt-10 w-[447px] h-[390px]">
          
          <LetreiroAnimado></LetreiroAnimado>

          <div className=" flex justify-center ">
            <Link
              href={"/cadastro-1"}
              className="flex items-center text-white font-semibold text-[30px] justify-center gap-[16px] w-[340px] h-[80px] bg-red-700 rounded-2xl hover:bg-laranja-1"
            >
              <span className="">
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
