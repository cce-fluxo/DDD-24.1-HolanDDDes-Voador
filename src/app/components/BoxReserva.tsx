import React from "react";
import Image from "next/image";
import Porta from "../../../public/image (1).png";

interface BoxReservaProps {
  temAlgo: boolean;
  nomeQuarto?: string;
  nomePessoa?: string;
  dataCheckin?: string;
  dataCheckout?: string;
  imagem?: string;
}

const BoxReserva: React.FC<BoxReservaProps> = ({
  temAlgo,
  nomeQuarto,
  nomePessoa,
  dataCheckin,
  dataCheckout,
  imagem = "/google.png"
}) => {
  return (
    <>
      {temAlgo ? (
        <div className="flex min-w-[427px] min-h-[195px] shadow-lg pl-[10px] pt-[20px] pb-[20px] pr-[40px]">
          <Image src={imagem} height={157} width={157} alt="" className="h-[157px] w-[157px] mr-[24px] rounded-[5px]"></Image>
          <div>
            <h1 className="text-[24px] mb-[24px] text-preto">{nomeQuarto}</h1>
            <p className="text-[20px] text-preto">{nomePessoa}</p>
            <p className="text-preto">Check in: {dataCheckin}</p>
            <p className="text-preto">Check out: {dataCheckout}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center min-w-[420px] min-h-[140px] gap-[24px] px-[20px] bg-cinza-2 rounded-[20px]">
          <div className="w-[136px] h-[100px]">
            <Image src={Porta} alt="icone de uma porta"></Image>
          </div>
          <div>
            <p className="text-[24px] font-sans text-cinza-4 font-normal">
              Nenhuma reserva
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxReserva;
