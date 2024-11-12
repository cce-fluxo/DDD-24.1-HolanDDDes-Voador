"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

interface ComodidadeProps {
    nome: string;
    icon: string | StaticImageData;
    selected: boolean; // Estado de seleção
    id: number; // ID da comodidade
    onClick: () => void; // Função chamada ao clicar, recebendo o id
}

const Comodidade: React.FC<ComodidadeProps> = ({
    id,
    nome,
    icon,
    selected,
    onClick
}) => {
    return (
        <button
        onClick={() => onClick()} // Passa o id da comodidade ao clicar
            className={`${
                selected ? 'bg-[#D1CFCF]' : 'bg-[#F7F3F3]'
            } rounded-[10px] gap-[16px] p-[10px_32px_10px_32px] border border-[#CEC6C7] content-center flex`}
        >
            <Image src={icon} alt={nome} height={30} width={30} className="mx-[4px]" />
            <p className="font-sans font-[500] text-[20px] leading-[30px] text-[#574A4D]">{nome}</p>
        </button>
    );
};


export default Comodidade