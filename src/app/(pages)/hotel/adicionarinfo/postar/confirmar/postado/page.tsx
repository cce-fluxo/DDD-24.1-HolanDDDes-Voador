// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Modal from '@/app/components/ModalExcluirAnuncio';
import api from "@/app/services/axios";

interface HotelData {
  hotel: {
    nome: string;
    descricao: string;
    endereco: string;
    telefone: string;
    sobre?: string;
    informacoes_extras?: string; 
    pet: boolean;
    proprietarioId: number;
    visualizacoes: number;
    postado: boolean;
  }
  foto_hotel: {
    url_foto: string;
  }[];
  acomodacoes: {
    Acomodacao: {
      titulo: string;
      valor_diaria: number;
    }[];
  }[];
}

const Hotel = () => {
  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  
  const [hotelData, setHotelData] = useState<HotelData | null>(null);

  // GET Hotel
  async function getHotel() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get("hotels/usuarioId");
      console.log(response.data);  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHotel().then((data) => {
      if (data) {
        setHotelData(data as HotelData);
      }
    }
  );
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => hotelData ? (prevIndex + 1) % hotelData.foto_hotel.length : prevIndex);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Lógica para excluir o anúncio
    console.log('Anúncio excluído');
    setIsModalOpen(false);
  };

  return (
    <>
      <LoggedHeader />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <div className="flex xl:flex-row flex-col">
      <div className="flex w-full ml-8 h-auto justify-around items-center flex-col">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
  
          <div className="w-[430px] h-[466px] flex mb-6 items-center justify-center relative">
              {/* Condição para mostrar o loading enquanto a imagem carrega */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg
                    className="animate-spin h-8 w-8 text-rosa-4 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>

                  </svg>
                  <h1 className="text-rosa-4 font-semibold">Aguarde...</h1>
                </div>
              )}

              {hotelData &&  // garantir que não é nulo
              <>
               <Image
                src={hotelData?.foto_hotel[currentImageIndex].url_foto}
                alt={`Imagem ${currentImageIndex + 1}`}
                fill
                className="cursor-pointer max-w-[430px] max-h-[466px]"
                onClick={handleClick}
                onLoadingComplete={() => setIsLoading(false)} // Define isLoading como false quando a imagem carrega
              />
              <div className="absolute bottom-0 right-0 mb-2 mr-2 text-white bg-[#574A4DB2] bg-opacity-70 rounded-[10px] gap-[10px] p-[10px] font-poppins font-bold text-[16px] leading-6">
                {currentImageIndex + 1}/{hotelData && hotelData.foto_hotel.length}
                </div>
                </>
              }
            </div>

            <button className="py-[15px] px-[20px] border-rosa-4 
            border-[2px] text-rosa-4 w-[340px] h-[57px] 
            text-center gap-[10px] font-poppins text-[24px] 
            font-normal leading-9 rounded-[10px] 
            hover:bg-[#F42C46] hover:text-white 
            -tracking-2 flex justify-center items-center
            " onClick={handleOpenModal}>
              Excluir anúncio
            </button>
          </div>

          <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
              
              <h1 className="w-[440px] h-[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px] whitespace-nowrap"> {hotelData?.hotel.nome} </h1>
              <h4 className="w-[255px] h-[48px] font-normal text-[24px] leading-9 text-[#2EC00A] whitespace-nowrap"> À partir de 920$ - diária </h4>

              <ul className="gap-[10px]">
                <li className="flex items-center gap-[10px] mb-[10px] w-[669px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Hotel Antigo
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[510px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    600+ hospedagens realizadas pelo aplicativo
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[544.11px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Seu Hotel está entre os mais populares da região
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[496px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Top 10 melhores destinos na categoria Praia
                  </h5>
                </li>
                <li className="flex flex-row items-center gap-[10px] mb-[10px] w-[429.36px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Você conquistou o título de
                  </h5>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-rosa-4 whitespace-nowrap">Superhost</h5>
                </li>
                <li className="flex flex-row items-center gap-[10px] w-[435px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block whitespace-nowrap" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Seu Hotel está na categoria
                  </h5>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-rosa-4 whitespace-nowrap">Diamante</h5>
                </li>
              </ul>

            <div className="flex flex-row items-top justify-center min-h-screen">
              <div className="mt-[64px] w-[816px] h-[150px] flex flex-row items-center justify-center">
                <div className="w-[675px] h-[110px] gap-[40px] flex items-center justify-center">
                  
                  <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                    <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
                    </div>
                  </div>
                  <div className="bg-branco-2 w-[348px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] items-center justify-center">
                    <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className="mt-[-500px] w-[188px] h-[498px] gap-[24px]">
                <div className="w-[144px] h-[51px] gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
                  Quartos
                </div>
                <div className="w-[854px] h-[423px]">
                    {hotelData && hotelData.acomodacoes.length > 0 ? (
                      <BoxQuarto
                        quartos={hotelData.acomodacoes.flatMap(ac => 
                          ac.Acomodacao.map(acomodacao => ({
                            nome: acomodacao.titulo,
                            preco: acomodacao.valor_diaria
                          }))
                        )}
                      />
                    ) : (
                      <p>Nenhum quarto disponível</p>
                    )}
                </div>
              </div>
              <div className="w-[816px] h-[56px] gap-[32px] mt-[40px]">
              <div className="w-[800px] h-[56px] gap-[26px]">
                <div className="w-[800px] h-[56px] gap-[40px] flex flex-column justify-center items-center">
                    <div className="w-[520px] h-[56px] rounded-[10px] border-[1px] border-cinza-1 p-[10px,32px, 10px, 32px] gap-[16px] bg-branco-2 flex items-center justify-center">
                      <Image src="/x.png" width={26} height={26} className="color-cinza-2" alt="x"/>
                      <h4 className="font-poppins font-medium text-[24px] text-cinza-3"> Nenhuma comodidade adicionada </h4>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                <Link href="/hotel/editar-comodidades" passHref>
                    <button className="mt-[32px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                    Editar Comodidades
                    </button>
                </Link>
                </div>
                <div className="mt-[60px] flex flex-col">
                <h3 className=" w-[245px] h-[80px] font-poppins text-preto text-[32px] font-bold leading-[66px]"> Meus dados:</h3>
                <div className="w-full ml-8">
                  <h4 className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">Descrição</h4>
                  <h5 className="font-poppins font-normal text-[20px] text-cinza-2 whitespace-pre-wrap break-words">{hotelData?.hotel.descricao} </h5>
                </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[56px] gap-[26px] flex items-center">
                <div className="mt-[80px] relative w-[400px] h-[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap">
                  <h4 className="text-preto inline-block">Nome: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-bloc">{hotelData?.hotel.nome}</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>
                </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[160px] gap-[26px] flex items-center">
                <div className="mt-[60px] relative w-[400px] h=[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap">
                  <h4 className="text-preto inline-block">Endereço: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-block whitespace-pre-wrap break-words">{hotelData?.hotel?.endereco}</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>           
                </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[180px] gap-[26px] flex items-center">
                <div className="mt-[40px] relative w-[400px] h=[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap mb-[80px]">
                  <h4 className="text-preto inline-block">Telefone: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-block">{hotelData?.hotel.telefone}</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>                 
                </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Link href="/hotel/adicionarinfo" passHref>
                    <button className="mb-[30px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center">
                    Editar Informações
                    </button>
                </Link>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
        />
    </>
  );
};

export default Hotel;