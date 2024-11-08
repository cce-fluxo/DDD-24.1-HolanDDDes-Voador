"use client";
import Image from "next/image";
import Link from 'next/link';
import Comodidade from "@/app/components/Comodidade";
import LoggedHeader from "@/app/LoggedHeader";
import { useEffect, useState } from "react";
import api from "@/app/services/axios";

export default function Comodidades() {
  // Estado para armazenar as comodidades selecionadas
  const [selectedComodidades, setSelectedComodidades] = useState<number[]>([]);

  // Função para alternar seleção da comodidade
  const toggleComodidade = (id: number) => {
    setSelectedComodidades((prev) =>
      prev.includes(id) ? prev.filter((comodidade) => comodidade !== id) : [...prev, id]
    );
        console.log(selectedComodidades)
  };

  useEffect(() => {
    console.log(selectedComodidades);
  }, [selectedComodidades]);

  const handleConfirm = async () => {
    try {
      console.log('Comodidades selecionadas:', selectedComodidades);
  
      // Enviar cada ID selecionado em uma requisição separada
      for (const comodidadeId of selectedComodidades) {
        console.log('Enviando comodidade ID:', comodidadeId);
        const response = await api.post('acomodacoes/comodidade', {
          comodidadeId, // Enviando um único ID por vez
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };


  return (
    <>
      <LoggedHeader />

      <div className="w-screen flex relative justify-around mt-[110px]">
        <div className="flex flex-col items-center my-20 gap-[26px] bg-[#F6F4F4] px-[50px] py-[34px] rounded-[20px] ">
          <div className="w-[458px] flex flex-col items-center gap-[26px]">
            <Image src="/rafiki.svg" alt="imagem" height={341.15} width={372} className="justify-items-center relative" />
            <p className="h-[36px] font-[500] text-[24px] leading-[36px] text-[#372F30] font-sans text-center">Comodidades</p>

            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[15px]">
                <div className="bg-[url('/right.png')] h-[27px] w-[27px] bg-no-repeat bg-contain inline-block shrink-0"></div>
                <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">Selecione ao lado as principais comodidades do seu hotel. </p>
              </div>
              <div className="flex gap-[15px]">
                <div className="bg-[url('/right.png')] h-[27px] w-[27px] bg-no-repeat bg-contain inline-block shrink-0"></div>
                <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">
                  Você poderá detalhar as demais características do seu hotel na opção de <span className="text-red-600 font-[400] text-[16px] leading-[24px] font-sans">detalhar informações.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-[56px] flex flex-col items-center self-center">
          <div className="gap-[32px] flex flex-col items-center">
            <div className="flex gap-[26px]">
              <Comodidade id={1} nome="Wi-fi grátis" icon="/wifi.svg" onClick={() => toggleComodidade(1)} selected={selectedComodidades.includes(1)} />
              <Comodidade id={2} nome="Ar-condicionado" icon="/ice.svg" onClick={() => toggleComodidade(2)} selected={selectedComodidades.includes(2)} />
            </div>

            <div className="flex gap-[26px]">
              <Comodidade id={3} nome="Spa" icon="/spa.png" onClick={() => toggleComodidade(3)} selected={selectedComodidades.includes(3)} />
              <Comodidade id={4} nome="Café da manhã incluso" icon="/coffe.svg" onClick={() => toggleComodidade(4)} selected={selectedComodidades.includes(4)} />
            </div>

            <div className="flex gap-[26px]">
              <Comodidade id={5} nome="Cozinha Gourmet" icon="/chef.svg" onClick={() => toggleComodidade(5)} selected={selectedComodidades.includes(5)} />
              <Comodidade id={6} nome="Piscina" icon="/pool.svg" onClick={() => toggleComodidade(6)} selected={selectedComodidades.includes(6)} />
            </div>

            <button className="bg-[#FFEDF0] rounded-[10px] gap-[16px] p-[10px_32px_10px_32px] border border-[#CEC6C7] flex">
              <Image src="/red_add.svg" alt="AC icon" height={36} width={40} />
              <p className="font-sans font-[500] text-[24px] leading-[36px] text-[#FD765E]">Carregar Mais ...</p>
            </button>
          </div>

          <button onClick={handleConfirm} className="bg-[#DC143B] hover:bg-[#F42C46] w-[433px] h-[57px] p-[15px, 182px, 15px, 182px] rounded-[10px] text-[#FFFFFF] font-sans font-[400] text-[24px]">
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
}