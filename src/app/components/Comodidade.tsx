"use client";

import React from "react";
import Image from "next/image";

interface ComodidadeProps {
    nome: string;
    icon: string;
}

const Comodidade: React.FC<ComodidadeProps> = ({
    nome,
    icon,
}) => {
    return (
        <button className="bg-[#F7F3F3] rounded-[10px] gap-[16px] p-[10px_32px_10px_32px] border border-[#CEC6C7] content-center flex">
            <Image src={icon} alt={nome} height={30} width={30} className="mx-[4px]"/>
            <p className="font-sans font-[500] text-[20px] leading-[30px] text-[#574A4D]">{nome}</p>
        </button>
    )
}

export default Comodidade