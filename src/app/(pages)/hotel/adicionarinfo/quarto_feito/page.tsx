// Perfil.tsx
"use client";
import Image from "next/image";
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/app/services/axios";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

interface QuartoData {
  acomodacao: {
    
  };
  foto_quarto: {
    url_foto: string;
  }[];
  comodidades: {
    Comodidade: {
      id: number;
      nome: string;
    }[];
  };
}

const Quarto = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  const router = useRouter();
  const [ quartoData, setQuartoData ] = useState<QuartoData | null>(null);


  async function getQuarto() {
    try {
      const response = await api.get("acomodacoes");
      console.log("Quarto postado com sucesso!", response.data);      
      setIsLoading(false);
      router.push("/hotel/adicionarinfo/postar");
      return response.data;
    } catch (error) {
      console.error("Erro ao postar quarto", error);
      setIsLoading(false);
    } finally {
      console.log("Postagem finalizada");
    }
  }

  useEffect(() => {
    getQuarto().then((data) => {
      if (data) {
        setQuartoData(data as QuartoData);
      }
    }
  );
  }, []);
  
  // Mudança da imagem ao clicar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => quartoData ? (prevIndex + 1) % quartoData.foto_quarto.length : prevIndex);
  };

  return (
    <>
      <LoggedHeader />
      
      
      <div className="flex xl:flex-row flex-col">
        <div className="flex w-full ml-8 h-auto justify-around items-center flex-col">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
            
          <div className="w-[430px] h-[466px] flex mb-6 items-center justify-center relative">
               {quartoData &&  // garantir que não é nulo
              <>
               <Image
                src={quartoData?.foto_quarto[currentImageIndex].url_foto}
                alt={`Imagem ${currentImageIndex + 1}`}
                fill
                className="cursor-pointer max-w-[430px] max-h-[466px]"
                onClick={handleClick}
                loading="lazy" 
                onLoadingComplete={() => setIsLoading(false)} // Define isLoading como false quando a imagem carrega
              />
              <div className="absolute bottom-0 right-0 mb-2 mr-2 text-white bg-[#574A4DB2] bg-opacity-70 rounded-[10px] gap-[10px] p-[10px] font-poppins font-bold text-[16px] leading-6">
                {currentImageIndex + 1}/{quartoData && quartoData.foto_quarto.length}
                </div>
                </>
              }
          </div>

            <Link href="/hotel/editar_foto_quarto">
              <button className="py-4 px-8 bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center whitespace-nowrap">
                Editar Fotos
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
          <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px]">
            {" "}
            Sem Nome
          </h1>
          <h4 className="w-[31px] h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A]">
            0$
          </h4>

          <ul className="gap-2">
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Comece Renomeando seu Quarto.
              </h5>
            </li>
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Adicione fotos do quarto.
              </h5>
            </li>
            <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Selecione suas Comodidades.
              </h5>
            </li>

            <li className="flex items-center gap-[10px] w-[320px] h-[50px] p-[10px] relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Escreva sobre seu Quarto.
              </h5>
            </li>
          </ul>

          <div className="flex flex-row items-top justify-center">
            <div className="mt-[64px] w-[816px] h-[150px] flex flex-row items-center justify-center">
              <div className="w-[675px] h-[110px] gap-[40px] flex items-center justify-center">
                <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                  <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">
                      0
                    </h3>
                    <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">
                      avaliações
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[520px] h-[56px] gap-[32px] mt-[40px]">
            <div className="w-[800px] h-[56px] gap-[26px]">
              <div className="flex justify-center items-center">
                <Link href="/hotel/editar-comodidades" passHref>
                  <button className="mt-[32px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                    Editar Comodidades
                  </button>
                </Link>
              </div>
              <div className="w-full">
                
              <div className="flex flex-row">
                <div className="w-[520px] h-[160px] gap-[26px] flex items-center">
                <div className="mt-[60px] relative w-[400px] h=[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap">
                  <h4 className="text-preto inline-block">Endereço: </h4>
                  {quartoData ? (
                  <h5 className="text-cinza-2 ml-2 inline-block whitespace-pre-wrap break-words">{quartoData.}</h5>
                  ) : (
                    <p>Nenhum dado encontrado</p>
                  )}
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>           
                </div>
                </div>
              </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quarto;

function setSubmitting(arg0: boolean) {
  throw new Error("Function not implemented.");
}
