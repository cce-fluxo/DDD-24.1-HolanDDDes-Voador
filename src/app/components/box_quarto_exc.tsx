import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import api from "@/app/services/axios";

interface Quarto {
  id: number;
  nome: string;
  preco: number;
  foto: string;
}

interface BoxQuartoProps {
  quartos: Quarto[];
}

export default function BoxQuartoExcluir({ quartos: initialQuartos }: BoxQuartoProps) {
  const [quartos, setQuartos] = useState(initialQuartos);

  const deleteQuarto = async (id: number) => {
    try {
      const response = await api.delete(`acomodacoes/${id}`);

      if (response.status === 200) {
        setQuartos(quartos.filter((quarto) => quarto.id !== id));
      } else {
        console.error('Erro ao excluir o quarto:', response.statusText);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        console.error("Erro interno no servidor ao tentar excluir o quarto:", error.response.data.message);
      } else {
        console.error('Erro na requisição de exclusão:', error);
      }
    }
  };

  return (
    <div className="flex overflow-x-auto gap-[16px] py-4">
      {quartos.map((quarto) => (
        <div
          key={quarto.id}
          className="relative w-[320px] h-auto rounded-[10px] p-[32px] bg-branco-2 flex flex-col justify-center cursor-pointer"
        >
          <Link href={`/hotel/quarto/${quarto.id}`}>
            <div className="relative w-full h-auto gap-[16px]">
              {/* Botão de deletar como X no canto superior direito */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteQuarto(quarto.id)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              >
                &times;
              </button>
              <div className="w-full h-[235px] rounded-[10px] bg-branco-3 flex justify-center items-center overflow-hidden">
                <Image
                  src={quarto.foto}
                  width={243}
                  height={235}
                  alt="Quarto"
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">
                {quarto.nome}
              </h4>
              <div className="w-full flex flex-col justify-end items-center">
                <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                  por noite:
                </p>
                <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">
                  R$ {quarto.preco.toFixed(2)}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
