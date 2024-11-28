import Image from "next/image";
import React from "react";
import Pessoa from "../../../public/pessoa.png";

interface BoxCheckinProps {
  temAlgo: boolean;
  nomeQuarto?: string;
  nomePessoa?: string;
  data?: string;
  telefone?: string | null;
  fotoAcomodacao?: string;
}

const BoxCheckin: React.FC<BoxCheckinProps> = ({
  temAlgo,
  nomeQuarto,
  nomePessoa,
  data,
  telefone,
  fotoAcomodacao = "/google.png"
}) => {
  return (
    <>
      {temAlgo ? (
        <div className="flex min-w-[427px] mb-5 min-h-[195px] shadow-xl pl-[10px] pt-[20px] pb-[20px] pr-[40px]">
          <Image src={fotoAcomodacao} alt="Imagem da Acomodação" width={157} height={157} className="h-[157px] w-[157px] mr-[24px] rounded-[5px]"></Image>
          <div>
            <h1 className="text-[24px] mb-[24px] text-preto">{nomeQuarto}</h1>
            <p className="text-[20px] text-preto">{nomePessoa}</p>
            <p className="text-preto">Check in: {data}</p>
            <p className="text-preto">Telefone: {telefone}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center min-w-[420px] min-h-[140px] gap-[24px] px-[20px] bg-cinza-2 rounded-[20px]">
          <div className="w-[136px] h-[100px]">
            <Image src={Pessoa} alt="icone de uma pessoa"></Image>
          </div>
          <div>
            <p className="text-[24px] font-sans text-cinza-4 font-normal">
              Nenhum check in
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxCheckin;
