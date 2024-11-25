"use client";

import React from "react";
import Image from "next/image";

interface AvaliacaoProps {
    imagem: string;
    nome: string;
    quarto: string;
    estrelas: number;
    descricao: string;
}


const Avaliacao: React.FC<AvaliacaoProps> = ({
    imagem,
    nome,
    quarto,
    estrelas,
    descricao,
}) => {
    return (
        <div className="w-full">
            <div className="w-full py-[26px] px-[68px] flex gap-[37px]">
                <Image src={imagem} alt={nome} height={131} width={131} className="min-w-[131px] min-h-[131px] rounded-full"/>
                <div className="w-full gap-[16px] flex flex-col">
                    <div className="gap=[5px]">
                        <p className="font-[500] text-[24px] leading-[36px] text-[#AB9C9F] font-sans">{nome}</p>
                        <p className="font-[500] text-[14px] leading-[21px] text-[#AB9C9F] font-sans">{quarto}</p>
                        <div className="flex gap-[5px] h-[21px] items-center">
                            {Array.from({ length: estrelas }).map((_, index) => (
                                <Image
                                    key={index}
                                    src="/star.svg"
                                    alt="star"
                                    height={18}
                                    width={16}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="font-[500] text-[16px] leading-[21px] text-[#333333] font-sans max-w-full">{descricao}</p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#AB9C9F]"/>
        </div>
    )
}

export default Avaliacao