// Perfil.tsx
"use client";
import Image from "next/image";
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/app/services/axios";
import { useParams } from "next/navigation";
import Comodidade from '@/app/components/Comodidade';
import wifiIcon from "../../../../../../public/wifi.png";
import arIcon from '../../../../../../public/ar.png';
import spaIcon from '../../../../../../public/spa.png';
import cafeIcon from '../../../../../../public/coffee.png';
import cozinhaIcon from '../../../../../../public/chef.png';
import piscinaIcon from '../../../../../../public/pool.png';

interface QuartoData {
  acomodacao: {
    id: number;
    titulo: string;
    camas: number;
    descricao: string; 
    banheiro: number;
    valor_diaria: number; 
  };
  fotoAcomodacao: {
    url_foto: string;
  }[];
  comodidades: {
    ComodidadeAcomodacao: {
      id: number;
      nome: string;
    }[];
  };
  avaliacoes: {
    Avaliacao_acomodacao: {
      custo_beneficio: number;
      atendimento: number;
      comida: number;
      limpeza: number;
      conforto: number;
      localizacao: number;
      comentario: string;
      cliente: {
        usuario: {
          nome: string;
          sobrenome: string;
          FotoUsuario: {
            url_foto: string;
            id: number;
          }[]
        }
      }
    }[]
  }
}

interface HotelData {
  hotel: {
    pet: boolean;
  }
}

export default function Quarto() {
  const { id } = useParams(); // Captura o id da URL

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading
  const [ quartoData, setQuartoData ] = useState<QuartoData | null>(null);

  async function getQuarto() {
    try {
      if (id) {
        const response = await api.get(`acomodacoes/${id}`);
        console.log(response.data);      
        setIsLoading(false);
        return response.data;
      }
      console.error('ID não encontrada na URL');
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar quarto", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getQuarto().then((data) => {
      if (data) {
        setQuartoData(data as QuartoData);
      }
    }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  
  
  // Ícones da comodidade
  const icons = [
    { name: 'Wi-fi grátis', icon: wifiIcon },
    { name: 'Ar-condicionado', icon: arIcon },
    { name: 'Spa', icon: spaIcon },
    { name: 'Café da manhã incluso', icon: cafeIcon },
    { name: 'Cozinha Gourmet', icon: cozinhaIcon },
    { name: 'Piscina', icon: piscinaIcon }
  ]
  
  // Mudança da imagem ao clicar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => quartoData ? (prevIndex + 1) % quartoData.fotoAcomodacao.length : prevIndex);
  };

  // HOTEL e permissão de pets
  const [hotelData, setHotelData] = useState<HotelData | null>(null);

  // GET Hotel
  async function getHotel() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get("hotels/usuarioId");  
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
      setIsLoading(false);
    }
  );
  }, []);

  const permissaoPet = () => {
    if (hotelData && hotelData.hotel.pet === false) {
      return "Não é permitido animais";
    } else {
      return "Permitido animais";
    }
  };
  
  // Função para contar o número de avaliações
  function contarAvaliacoes(quarto: QuartoData | null): number {
    if (!quarto || !quarto.avaliacoes?.Avaliacao_acomodacao) {
      return 0;
    }
    return quarto.avaliacoes.Avaliacao_acomodacao.length;
  }

  function calcularNotaMedia(quarto: QuartoData | null): number {
    if (!quarto || !quarto.avaliacoes?.Avaliacao_acomodacao.length) {
      return 0; // Retorna 0 se não houver avaliações ou se o quarto for nulo
    }
  
    const avaliacoes = quarto.avaliacoes.Avaliacao_acomodacao;
  
    // Soma a média de cada avaliação
    const somaDasMedias = avaliacoes.reduce((total, avaliacao) => {
      const mediaAvaliacao =
        (avaliacao.custo_beneficio +
          avaliacao.atendimento +
          avaliacao.comida +
          avaliacao.limpeza +
          avaliacao.conforto +
          avaliacao.localizacao) / 6; // Média de uma única avaliação
  
      return total + mediaAvaliacao;
    }, 0);
  
    // Retorna a média geral das avaliações
    return somaDasMedias / avaliacoes.length;
  } 

  const notaMedia = calcularNotaMedia(quartoData);

  // Recomendação da nota (texto ao lado da nota)
  function classificarNotaMedia(nota: number): string {
    if (nota > 4) {
      return "Muito bom";
    } else if (nota >= 3 && nota <= 4) {
      return "Razoável";
    } else {
      return "Quarto não recomendado";
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
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
          <h1 className="text-rosa-4 font-semibold">Carregando...</h1>
        </div>
      </div>
    );
  }

  // Mostrando as avaliações na tela
  const renderAvaliacoes = (quarto: QuartoData | null) => {
    if (!quarto || !quarto.avaliacoes?.Avaliacao_acomodacao.length) {
      return <p className="text-cinza-4">0 avaliações</p>; // Retorna mensagem se não houver avaliações
    }
  
    return (
      <div className="space-y-6">
      {quarto.avaliacoes.Avaliacao_acomodacao.map((avaliacao, index) => {
        // Verificar se Cliente e usuario existem
        const cliente = avaliacao.cliente;
        const usuario = cliente?.usuario;
          // Capturar a foto ou usar a imagem padrão do google caso usuário não tenha foto
          const fotoCliente =
            usuario?.FotoUsuario?.length > 0
              ? usuario.FotoUsuario[0].url_foto
              : "/google.png";
  
          return (
            <div key={index} className="flex flex-col">
              <div className="flex items-start space-x-4">
                {/* Foto do cliente */}
                <Image
                  src={fotoCliente}
                  alt="Foto do cliente"
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
    
                {/* Dados do cliente e avaliação */}
                <div>
                  <h3 className="font-bold text-cinza-4">
                    {usuario?.nome || "Usuário Anônimo"}{" "}
                    {usuario?.sobrenome || ""}
                  </h3>
                  <div className="flex items-center text-rosa-4 space-x-1">
                    {/* Estrelas */}
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                </div>
              </div>
              
            </div>
            {/* Comentário do cliente */}
              <p className="text-cinza-4 mt-2 ml-0">{avaliacao.comentario}</p>
          </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <>
      <LoggedHeader />
      
      
      <div className="flex xl:flex-row flex-col">
        <div className="flex w-full ml-8 h-auto justify-around items-center flex-col">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
            
          <div className="w-[430px] h-[466px] flex mb-6 items-center justify-center relative">
               {quartoData && quartoData.fotoAcomodacao && quartoData.fotoAcomodacao.length > 0 ? (  // garantir que não é nulo
              <>
               <Image
                src={quartoData?.fotoAcomodacao[currentImageIndex]?.url_foto || '/hotel_image.png'}
                alt={`Imagem ${currentImageIndex + 1}`}
                fill
                className="cursor-pointer max-w-[430px] max-h-[466px]"
                onClick={handleClick}
                loading="lazy" 
                onLoadingComplete={() => setIsLoading(false)} // Define isLoading como false quando a imagem carrega
              />
              <div className="absolute bottom-0 right-0 mb-2 mr-2 text-white bg-[#574A4DB2] bg-opacity-70 rounded-[10px] gap-[10px] p-[10px] font-poppins font-bold text-[16px] leading-6">
                {currentImageIndex + 1}/{quartoData && quartoData.fotoAcomodacao.length}
                </div>
                </>
              ) : (
                <div className="bg-branco-3 w-[430px] h-[400px] rounded-[10px] flex items-center justify-center mb-6">
                    <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5} />
                </div>
              )}
          </div>

            <Link href={`/hotel/quarto/editar_foto_quarto/${id}`}>
              <button className="py-4 px-8 bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center whitespace-nowrap">
                Editar Fotos
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
        <h1 className="w-[440px] h-[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px] whitespace-nowrap"> 
          {quartoData?.acomodacao.titulo} 
          </h1>
          <h4 className="w-[100px] flex flex-row h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A] whitespace-nowrap">
            À partir de R$ {quartoData?.acomodacao.valor_diaria} a diária
          </h4>

          <ul className="gap-2">
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/cama.png')] w-[30px] h-[21px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                {quartoData?.acomodacao?.camas ? quartoData.acomodacao.camas + ' camas de casal' : 'Informação indisponível'}
              </h5>
            </li>
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/x.png')] w-[30px] h-[21px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                {quartoData?.acomodacao.descricao}
              </h5>
            </li>
            <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
              <span
                className="bg-[url('/pessoa.png')] w-[29px] h-[21px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                {quartoData?.acomodacao?.camas ? quartoData.acomodacao.camas * 2 + ' pessoas' : 'Informação indisponível'}
              </h5>
            </li>

            <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
              <span
                className="bg-[url('/pet.png')] w-[29px] h-[21px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                {permissaoPet()}
              </h5>
            </li>
          </ul>

          <Link href={`/hotel/quarto/editar_quarto/${id}` } passHref>
                <button className="mt-[32px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Edite seu quarto!
                </button>
          </Link>

          <div className="flex flex-row items-top justify-center">
            <div className="mt-[32px] w-[816px] h-[150px] flex flex-row items-center justify-center">
              <div className="w-[675px] h-[110px] gap-[40px] flex items-center justify-center">
                <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                  <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">
                      { contarAvaliacoes(quartoData) }
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

               {/* Se houver comodidades, exibe elas; caso contrário, exibe a mensagem "Nenhuma comodidade adicionada" */}
               <div className="w-full max-w-[700px] justify-center items-center h-auto flex flex-wrap gap-4">
                      {/* Mapeia as comodidades e exibe cada uma delas */}
                      {quartoData && (
                        quartoData.comodidades.ComodidadeAcomodacao && 
                        quartoData.comodidades.ComodidadeAcomodacao.length > 0 ? (
                          quartoData.comodidades.ComodidadeAcomodacao.map((comod, index) => {
                            const iconData = icons.find(
                              (icon) => icon.name === comod.nome
                            );
                            return iconData ? (
                              <Comodidade 
                                key={index}
                                id={comod.id} 
                                nome={comod.nome} 
                                icon={iconData.icon} 
                                selected={false} 
                                onClick={() => {}} 
                              />
                            ) : null;
                          })
                        ) : (
                          <p>Nenhuma comodidade adicionada</p>
                        )
                      )}
                    </div>

              <div className="flex justify-center items-center">
                <Link href={`/hotel/quarto/editar_comodidades/${quartoData?.acomodacao.id}`} passHref>
                  <button className="mt-[32px] mb-8 bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                    Editar Comodidades
                  </button>
                </Link>
              </div>

              <div className="w-[144px] h-[51px] gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
                  Avaliações:
              </div>
              <div className="mt-8 flex flex-row"> 
                <div className="w-14 h-14 bg-[#2EC00A] font-poppins font-bold text-xl rounded-full flex items-center justify-center">
                  {notaMedia}
                </div>
                <div className="ml-4 font-poppins font-semibold text-xl leading-[51px] -tracking-2 text-preto"> 
                  {classificarNotaMedia(notaMedia)}
                </div>
              </div>

              <div className="mt-8 w-[144px] h-[51px] gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
                  Comentários:
              </div>
              
              {/* Avaliações */}
              <div className="mt-8">{renderAvaliacoes(quartoData)}</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};