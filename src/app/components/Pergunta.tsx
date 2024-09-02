"use client";

import React from "react";

interface PerguntaProps {
    pergunta: string;
    resposta: string;
}

const Pergunta: React.FC<PerguntaProps> = ({
    pergunta,
    resposta,
}) => {
    return (
        <>
            <div className="w-max-full flex flex-col gap-[16px] py-[30px]">
                <h2 className="font-[500] text-[16px] leading-[24px] text-[#AB9C9F] font-sans">{pergunta}</h2>
                <p className="font-[500] text-[16px] leading-[24px] text-[#333333] font-sans max-w-[80%]">{resposta}</p>
            </div>
            <div className="w-full h-[1px] bg-[#AB9C9F]"/>
        </>
        
    )
}

export default Pergunta