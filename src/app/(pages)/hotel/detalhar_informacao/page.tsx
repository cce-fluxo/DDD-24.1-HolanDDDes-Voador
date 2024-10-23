"use client";

import Image from "next/image";
import Link from 'next/link';
import LoggedHeader from "@/app/components/LoggedHeader";
import { useRouter } from "next/router";

export default function Detalhar() {
  const router = useRouter()

  const saveInfo = () => {
    // colocar aqui requisição para mandar os dados pro back
    router.back()
  }

  return (
    <div> 
      <LoggedHeader/>

      <div className="flex justify-around mt-[110px]">
        <div className="w-[517px] flex flex-col items-center mt-3 gap-[26px] bg-[#F6F4F4] py-[34px] rounded-[20px] ">
          <Image src={"/amico.svg"} height={341.15} width={372} alt="Imagem" className="justify-items-center relative"/>
          <p className="w-full h-[36px] font-[500] text-[24px] leading-[36px] text-[#372F30] font-sans text-center">Detalhar Informações</p>

          <div className="w-[454px] gap-[16px] flex flex-col">
            <div className="flex gap-[15px] w-[454px]">
              <Image src={"/right.svg"} height={27} width={27} alt="Imagem"/>
              <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">Escreva ao lado as informações complementares do seu Hotel. </p>
            </div>
            <div className="flex gap-[15px] w-[454px] h-[72px]">
              <Image src={"/right.svg"} height={27} width={27} alt="Imagem"/>
              <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">Quanto mais detalhes seu Hotel informar, maior as chances de conseguir conquistar seu hóspede! São apenas <span className="text-red-600 font-[400] text-[16px] leading-[24px] w-[421px] h-[72px] font-sans">3 passos.</span> </p>
            </div>

            <div className="self-center">
              <Link href="/hotel/adicionarinfo" passHref>
                <button className="bg-[#DC143B] hover:bg-[#F42C46] w-[433px] h-[57px] p-[15px, 182px, 15px, 182px] rounded-[10px] text-[#FFFFFF] font-sans font-[400] text-[24px]">Confirmar Alterações</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[20px_20px_0px_0px] p-[56px_32px_80px_32px] bg-[#FFFFFF] drop-shadow-lg">
          <div className="gap-[48px] flex flex-col">
            <div className="gap-[16px] flex justify-between items-center self-center">
                <button className="bg-[url('/vector_left.svg')] min-w-[40px] h-[40px]"/>
                <div className=" bg-[#F7F3F3] rounded-[10px] p-[10px_32px_10px_32px] gap-[16px] flex items-center content-center">
                    <Image src={"/Vector_write.svg"} height={36} width={36} alt="Icone"/>
                    <p className="w-[213px] h-[30px] font-sans font-[500] text-[20px] leading-[30px] text-[#372F30]">Descrição Detalhada</p>
                </div>
                <button className="bg-[url('/vector_right.svg')] min-w-[40px] h-[40px]"/>
            </div>

            <div className="gap-[24px] grid content-between">
                <p className="font-sans font-[500] text[20px] leading-[30px] text-[#372F30]">Sobre</p>
                <input type="text" placeholder="/ Escreva aqui. (máximo 12 linhas)." className="font-sans font-[400] text[16px] leading-[24px] text-[#AB9C9F]"/>
            </div>

            <div className="gap-[16px] grid content-between">
                <div className="flex items-end gap-[16px]">
                    <Image src={"/banheira.svg"} height={42} width={42} alt="Icone"/>
                    <p className="font-sans font-[500] text[16px] leading-[24px] text-[#574A4D]">Título</p> 
                </div>
                <input type="text" placeholder="/ Escreva aqui. (máximo 12 linhas)." className="font-sans font-[400] text[16px] leading-[24px] text-[#AB9C9F]"/>
            </div>

            <div className="gap-[16px] grid content-between">
                <div className="flex items-end gap-[16px]">
                  <Image src={"/porta.svg"} height={38} width={38} alt="Icone"/>
                  <p className="font-sans font-[500] text[16px] leading-[24px] text-[#574A4D]">Título</p> 
                </div>
                <input type="text" placeholder="/ Escreva aqui. (máximo 12 linhas)." className="font-sans font-[400] text[16px] leading-[24px] text-[#AB9C9F]"/>
            </div>

            <div className="gap-[16px] grid content-between">
                <div className="flex items-end gap-[16px]">
                  <Image src={"/fluent_building-32-filled.svg"} height={48} width={48} alt="Icone"/>
                  <p className="font-sans font-[500] text[16px] leading-[24px] text-[#574A4D]">Título</p> 
                </div>
                <input type="text" placeholder="/ Escreva aqui. (máximo 12 linhas)." className="font-sans font-[400] text[16px] leading-[24px] text-[#AB9C9F]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
