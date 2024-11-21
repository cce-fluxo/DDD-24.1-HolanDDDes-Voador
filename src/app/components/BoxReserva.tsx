import React from "react";
import Image from "next/image";
import Porta from "../../../public/image (1).png";

interface BoxReservaProps {
  temAlgo: boolean;
  nomeQuarto?: string;
  nomePessoa?: string;
  acao1?: string;
  acao2?: string;
  textoAusencia?: string;
}

const BoxReserva: React.FC<BoxReservaProps> = ({
  temAlgo,
  nomeQuarto,
  nomePessoa,
  acao1,
  acao2,
  textoAusencia,
}) => {
  return (
    <>
      {temAlgo ? (
        <div className="flex min-w-[427px] min-h-[195px] shadow-lg pl-[10px] pt-[20px] pb-[20px] pr-[40px]">
          <div className="bg-slate-500 h-[157px] w-[157px] mr-[24px] rounded-[5px]"></div>
          <div>
            <h1 className="text-[24px] mb-[24px] text-preto">{nomeQuarto}</h1>
            <p className="text-[20px] text-preto">{nomePessoa}</p>
            <p className="text-preto">{acao1}</p>
            <p className=" text-preto">{acao2}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center min-w-[420px] min-h-[140px] gap-[24px] px-[20px] bg-cinza-2 rounded-[20px]">
          <div className="w-[136px] h-[100px]">
            <Image src={Porta} alt="icone de uma porta"></Image>
          </div>
          <div>
            <p className="text-[24px] font-sans text-cinza-4 font-normal">
              {textoAusencia}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxReserva;
