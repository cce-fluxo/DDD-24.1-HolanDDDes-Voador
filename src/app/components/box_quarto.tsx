import Image from "next/image";
import React from 'react';

export default function BoxQuarto() {
    // Recuperar dados do localStorage e convertê-los para um array de objetos
    const storedQuartos = localStorage.getItem('quartos');
    const quartos = storedQuartos ? JSON.parse(storedQuartos) : [];

    return (
        <div className="flex flex-wrap gap-[16px]"> {/* Flex wrap para empilhar as boxes */}
            {quartos.map((quarto: any, index: number) => (
                <div key={index} className="w-[400px] h-[432px] rounded-[10px] p-[32px] bg-branco-2 flex flex-col justify-center">            
                    <div className="w-[336px] h-[359px] gap-[16px]">
                        <div className="w-[336px] h-[235px] rounded-[10px] bg-branco-3 flex justify-center items-center">
                            <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                                <Image src="/hotel_image.png" width={123.5} height={104.5} alt="Hotel" />
                            </div>
                        </div>

                        <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">{quarto.nome}</h4>
                        <div className="w-[600px] flex flex-col justify-end items-center">
                            <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3 justify-end items-center">
                                por noite:
                            </p>
                            <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2 justify-end items-center">R$ {quarto.preco.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
