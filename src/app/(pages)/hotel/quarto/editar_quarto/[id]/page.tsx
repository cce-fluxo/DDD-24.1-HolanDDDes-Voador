// Perfil.tsx
"use client";
import Image from "next/image";
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import api from "@/app/services/axios";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";

interface QuartoData {
  acomodacao: {
    id: number;
    titulo: string;
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
}

const QuartoSchema = Yup.object().shape({
  titulo: Yup.string().required("Campo obrigatório"),
  valor_diaria: Yup.number()
    .required("Campo obrigatório")
    .min(0, "Deve ser no mínimo 0"),
  descricao: Yup.string().max(
    500,
    "Descrição não pode ter mais de 500 palavras"
  ),
});

const Quarto = () => {
  const { id } = useParams(); // Captura o id da URL
  const [isPostBom, setIsPostBom] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  const [ quartoData, setQuartoData ] = useState<QuartoData | null>(null);

  // Mudança da imagem ao clicar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => quartoData ? (prevIndex + 1) % quartoData.fotoAcomodacao.length : prevIndex);
  };

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
  }, []);  

  async function patchQuarto(data: any) {
    try {
      const response = await api.patch(`acomodacoes/${id}`, {
        titulo: data.titulo,
        valor_diaria: data.valor_diaria,
        descricao: data.descricao,
        banheiros: data.banheiros,
        quartos: data.quartos,
        camas: data.camas,
        valor_pet: data.valor_pet,
        complemento: data.complemento,
        tipo_acomodacaoId: data.tipo_acomodacaoId
      }
      );
      console.log("Quarto mudado com sucesso!", response.data);
      setIsPostBom(true);
      router.push(`/hotel/quarto/${id}`)
      return response.data;
    } catch (error) {
      console.error("Erro ao postar quarto", error);
      setIsPostBom(false);
    } finally {
      console.log("Postagem finalizada");
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
              }
          </div>

            <Link href={`/hotel/quarto/editar_foto_quarto/${id}`}>
              <button className="py-4 px-8 bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center whitespace-nowrap">
                Editar Fotos
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
          <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px] whitespace-nowrap">
            Alterar Dados:
          </h1>
 
              <div className="w-full">
                {quartoData ? (
                  <Formik
                    initialValues={quartoData?.acomodacao}
                    validationSchema={QuartoSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log("Dados do formulário:", values);
                      setSubmitting(true); // bloqueia envios múltiplos
                      await patchQuarto(values); // fazendo o post do quarto no banco de dados
                      setSubmitting(false); // finalizando o envio
                    }}
                  >
                    {({ isSubmitting, isValid }) => (
                      <Form>
                        {/* Campo de descrição */}
                        <div className="ml-8">
                          <label
                            htmlFor="descrição"
                            className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]"
                          >
                            Descrição
                          </label>
                          <Field
                            type="textarea"
                            name="descricao"
                            className="w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                            placeholder="/Escreva aqui uma descrição sobre o seu quarto (máx. 500 palavras)"
                          />
                          <ErrorMessage
                            name="descricao"
                            component="div"
                            className="text-rosa-4 text-xs ml-4 w-[30%]"
                          />
                        </div>

                        {/* Campo de nome */}
                        <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                          <label
                            htmlFor="nome"
                            className="font-poppins text-preto text-[24px] font-medium leading-[66px]"
                          >
                            Nome:
                          </label>
                          <Field
                            as="textarea"
                            name="titulo"
                            className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                            placeholder="Escreva aqui o nome do quarto"
                          />
                        </div>
                        <ErrorMessage
                          name="titulo"
                          component="div"
                          className="text-rosa-4 text-xs ml-4 w-[30%]"
                        />

                        {/* Campo de preço */}

                        <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                          <label
                            htmlFor="preco"
                            className="font-poppins text-preto text-[24px] font-medium leading-[66px]"
                          >
                            Preço:
                          </label>
                          <Field
                            type="number"
                            name="valor_diaria"
                            className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                            placeholder="Escreva aqui o preço mínimo do quarto"
                          />
                        </div>
                        <ErrorMessage
                          name="valor_diaria"
                          component="div"
                          className="text-rosa-4 text-xs ml-4 w-[30%]"
                        />

                        {/* Botão de Confirmar */}
                        <div className="flex flex-row justify-between mb-8">
                          <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={`mt-[32px] w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] -tracking-2 flex justify-center items-center ${
                              !isValid || isSubmitting
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-rosa-4 text-white hover:bg-[#F42C46]"
                            }`}
                          >
                            Confirmar
                          </button>

                          {/* Botão de Cancelar */}
                          <Link href="/hotel/adicionarinfo/postar" passHref>
                            <button className="mb-4 mt-[32px] py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                              Cancelar
                            </button>
                          </Link>
                        </div>
                      </Form>
                    )}
                    </Formik>
                    ) : (
                        <div> Carregando... </div>
                    )}
                </div>
            </div>
      </div>
    </>
  );
};

export default Quarto;