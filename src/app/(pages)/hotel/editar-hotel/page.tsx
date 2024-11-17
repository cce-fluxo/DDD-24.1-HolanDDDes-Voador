// Perfil.tsx
"use client";

import Image from "next/image";
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/app/services/axios";
import { useRouter } from "next/navigation";

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
    comodidades: {
      Comodidade: {
        id: number;
        nome: string;
      }[];
    };
    acomodacoes: {
      Acomodacao: {
        id: number;
        titulo: string;
        valor_diaria: number;
      }[];
    }[];
    foto_acomodacoes: {
      Acomodacao: {
        FotoAcomodacao: {
          id: number;
          url_foto: string;
          acomodacaoId: number;
        }[];
      }[];
    }[];
}

// Função para contar palavras
const wordCount = (text: string) => {
  return text.trim().split(/\s+/).length;
};

// Esquema de validação com Yup
const HotelSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  endereco: Yup.string().required("Campo obrigatório"),
  telefone: Yup.string()
    .required("Campo obrigatório")
    .matches(
      /^\d{2}\s\d{4,5}-\d{4}$/,
      "Telefone inválido. Use o formato XX XXXXX-XXXX ou XX XXXX-XXXX."
    ),
  sobre: Yup.string()
    .max(500, "Descrição não pode ter mais de 500 palavras.")
    .test(
      "word-count",
      "Descrição não pode ter mais de 500 palavras.",
      (value) => {
        return value ? wordCount(value) <= 500 : true;
      }
    ),
  pet: Yup.boolean(),
});

const Hotel = () => {
  const [hotelData, setHotelData] = useState<HotelData | null>(null); // Estado para armazenar os dados do hotel
  const router = useRouter();

  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading
    
  // Mudança da imagem ao clicar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => hotelData ? (prevIndex + 1) % hotelData.foto_hotel.length : prevIndex);
  };

  // GET Hotel
  async function getHotel() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get("hotels/hotelaria");
      console.log(response.data as HotelData);  
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  const rotaCerta = () => {
    router.back()
  }

  // Função para atualizar o hotel
  async function updateHotel(data: any) {
    console.log('dados', data)
    try {
      const response = await api.patch('hotels', {
        nome: data.nome,
        telefone: data.telefone,
        sobre: data.sobre,
        endereco: data.endereco,
        visualizacoes: data.visualizacoes,
        informacoes_extras: data.informacoes_extras,
        pet: data.pet,
        postado: data.postado,
      });
      console.log("Hotel atualizado com sucesso!", response.data);
      rotaCerta()
    } catch (error) {
      console.error("Erro ao atualizar o hotel:", error);
    }
  };

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

  return (
    <>
      <LoggedHeader />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <div className="flex xl:flex-row flex-col">
        <div className="flex w-full ml-8 h-auto justify-around items-center flex-col">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
            
          <div className="w-[430px] h-[466px] flex mb-6 items-center justify-center relative">
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

          <button onClick={rotaCerta} className=" bg-rosa-4 text-white mb-6 w-[340px] h-[57px] text-center font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center whitespace-nowrap">
            Postar Anúncio
          </button>

          </div>
        </div>

        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">

            <h3 className="w-[440px] h-[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px] whitespace-nowrap">Editar Hotel</h3>
            
            {hotelData ? (
                <Formik
                    initialValues={hotelData.hotel}
                    validationSchema={HotelSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await updateHotel(values);
                        setSubmitting(false);
                    }}
                >
                {({ isSubmitting, isValid }) => (

                <Form>
                    {/* Campo de descrição */}
                    <div className="ml-8">
                        <label
                        htmlFor="sobre"
                        className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]"
                        >
                        Descrição
                        </label>
                        <Field
                        as="textarea"
                        name="sobre"
                        placeholder="/Escreva aqui uma descrição sobre o seu hotel (máx. 500 palavras)"
                        className="w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                        />
                    </div>
                        <ErrorMessage
                            name="sobre"
                            component="div"
                            className="text-red-500"
                        />

                    {/* Botão de Detalhar Informações */}
                    <Link href="/hotel/detalhar_informacao" passHref>
                        <button className=" bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                        Detalhar Informações
                        </button>
                    </Link>

                    <div>
                        {/*Campo de nome */}
                        <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                            <label
                                htmlFor="nome"
                                className="font-poppins text-preto text-[24px] font-medium leading-[66px]"
                            >
                                Nome
                            </label>
                            <Field
                                as="textarea"
                                name="nome"
                                className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                                placeholder="Escreva aqui o nome do hotel"
                            />
                        </div>
                        <ErrorMessage
                            name="nome"
                            component="div"
                            className="text-red-500"
                        />

                        {/*Campo de endereço */}
                        <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                            <label
                                htmlFor="endereco"
                                className="font-poppins text-preto text-[24px] font-medium leading-[66px]"
                            >
                                Endereço
                            </label>
                            <Field
                                as="textarea"
                                name="endereco"
                                className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                                placeholder="Escreva aqui o endereço do hotel"
                            />
                        </div>
                        <ErrorMessage
                            name="endereco"
                            component="div"
                            className="text-red-500"
                        />

                        {/*Campo de telefone */}
                        <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                            <label
                                htmlFor="telefone"
                                className="font-poppins text-preto text-[24px] font-medium leading-[66px]"
                            >
                                Telefone
                            </label>
                            <Field
                                type="text"
                                name="telefone"
                                className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                                placeholder="Escreva o telefone no formato (XX) XXXXX-XXXX"
                            />
                            </div>
                        <ErrorMessage
                            name="telefone"
                            component="div"
                            className="text-red-500"
                        />

                    </div>

                    <div className="flex flex-row justify-around items-center mb-4 mt-4">
                        <button
                            type="submit"
                            className={`w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] -tracking-2 flex justify-center items-center ${
                                isSubmitting || !isValid
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-rosa-4 text-white hover:bg-[#F42C46]"
                            }`}
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? "Atualizando..." : "Salvar Alterações"}
                        </button>

                        <button onClick={rotaCerta} className="py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                            Cancelar
                        </button>
                    </div>

                    </Form>
                )}
                </Formik>
                ) : (
                    <div> Carregando... </div>
                )}
      </div>
      </div>
    </>
  );
};

export default Hotel;
