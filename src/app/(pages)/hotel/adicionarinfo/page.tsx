"use client";

import Image from "next/image";
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/app/services/axios";
import { useRouter } from "next/navigation";

// Função para contar as palavras (descrição tem limite)
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
  pet: Yup.boolean()
});

const Hotel = () => {
  const [isPostBom, setIsPostBom] = useState(false);
  const router = useRouter();

  const initialValues = {
    nome: "",
    endereco: "",
    telefone: "",
    sobre: "",
    visualizacoes: 0,
    informacoes_extras: "",
    pet: false,
    postado: false,
    // tirei a conexão com o proprietário
  };

  // Função para postar o hotel
  async function postHotel(data: any) {
    try {
      console.log("Postando hotel:", data);
      const response = await api.post("hotels", data);
      console.log("Hotel postado com sucesso!", response.data);
      setIsPostBom(true);
      router.push("/hotel/adicionarinfo/postar");
      return response.data;
    } catch (error) {
      console.error("Erro ao postar o hotel:", error);
      setIsPostBom(false);
    } finally {
      console.log("Postagem finalizada");
    }
  }

  return (
    <>
      <LoggedHeader />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex flex-col xl:flex-row">
        <div className="w-full h-auto ml-8 flex flex-col items-center justify-around">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
            <div className="bg-branco-3 w-[430px] h-[400px] rounded-[10px] flex items-center justify-center mb-6">
              <Image
                src="/hotel_image.png"
                alt="Botar fotos"
                width={123.5}
                height={104.5}
              />
            </div>
              <button className="py-4 px-8 bg-cinza-2 w-[340px] h-[57px] flex items-center justify-center gap-[10px] text-white whitespace-nowrap font-poppins text-[24px] font-normal rounded-[10px] -tracking-2 leading-9">
                Editar Fotos
              </button>
          </div>
        </div>

        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
          <h1 className="mb-2 font-poppins text-preto text-[44px] font-bold leading-[66px]">
            {" "}
            Sem Nome
          </h1>
          <h4 className="font-normal text-[24px] leading-9 text-[#2EC00A]">
            0$
          </h4>

          <ul className="gap-2">
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-8 font-poppins text-cinza-3">
                Comece Renomeando seu Hotel; atribua endereço e telefone.
              </h5>
            </li>
            <li className="flex items-center gap-2 mb-2 p-2 relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Adicione fotos do Hotel e dos quartos.
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
            <li className="flex items-center gap-[10px] w-[290px] h-[50px] p-[10px] relative">
              <span
                className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block"
                aria-hidden="true"
              ></span>
              <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                Escreva sobre seu Hotel.
              </h5>
            </li>
          </ul>

          <div className="flex flex-row items-top justify-around mt-20 mb-16">
                <div className="bg-branco-2 w-[280px] rounded-[100px] py-[16px] px-[80px] flex items-center justify-center">
                  <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">
                      0
                    </h3>
                    <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">
                      avaliações
                    </h4>
                  </div>
                </div>
                <div className="bg-branco-2 w-[348px] h-[110px] rounded-[100px] py-[16px] px-[80px] items-center justify-center">
                  <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">
                      0 dias
                    </h3>
                    <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">
                      de hospedagem
                    </h4>
                </div>
              </div>
          </div>

              <div className="flex flex-col">
                <h3 className="font-poppins text-preto text-[32px] font-bold leading-[66px]">
                  Meus dados:
                </h3>

                <div className="w-full">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={HotelSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log("Dados do formulário:", values);
                      setSubmitting(true); // bloqueia envios múltiplos
                      await postHotel(values); // fazendo o post do hotel no banco de dados
                      setSubmitting(false); // finalizando o envio
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

                        <div className="flex items-center mt-6">
                          <Field
                            type="checkbox"
                            name="pet"
                            className="w-5 h-5 mr-2 accent-rosa-4"
                          />
                          <label
                            htmlFor="pet"
                            className="font-poppins text-preto text-[18px] font-medium leading-[30px]"
                          >
                            Aceita pets
                          </label>
                        </div>

                          <div className="flex flex-row justify-around items-center mb-4 mt-4">
                            <button
                              type="submit"
                              disabled={isSubmitting || !isValid}
                              className={` w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] -tracking-2 flex justify-center items-center ${
                                !isValid || isSubmitting
                                  ? "bg-gray-300 cursor-not-allowed"
                                  : "bg-rosa-4 text-white hover:bg-[#F42C46]"
                              }`}
                            >
                              Confirmar
                            </button>

                            {/* Botão de Cancelar */}
                            <Link href="/hotel" passHref>
                              <button className="py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                                Cancelar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
      </div>
    </>
  );
};

export default Hotel;
