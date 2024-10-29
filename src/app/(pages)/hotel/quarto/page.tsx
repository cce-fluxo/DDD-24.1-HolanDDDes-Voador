// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import api from '@/app/services/axios';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const QuartoSchema = Yup.object().shape({
  titulo: Yup.string().required('Campo obrigatório'),
  valor_diaria: Yup.number().required('Campo obrigatório').min(0, 'Deve ser no mínimo 0'),
  descricao: Yup.string().max(500, 'Descrição não pode ter mais de 500 palavras'),
})

const Quarto = () => {
  const [ isPostBom, setIsPostBom ] = useState(false);
  const router = useRouter();

  const initialValues = {	
    titulo: '',
    valor_diaria: ' ',
    descricao: '',
    banheiros: 0,
    quartos: 0,
    camas: 0,
    valor_pet: 200, // preço qualquer
    complemento: "quarto bom",
    tipo_acomodacaoId: 1, // conectei a um tipo de acomodação já existente (são pré-setados pelo admin)
    hotelId: 4 // conectei a um hotel já existente
  };

  async function postQuarto(data: any) {
    try {
      const response = await api.post('acomodacoes', data);
      console.log('Quarto postado com sucesso!', response.data);
      setIsPostBom(true);
      router.push('/hotel/adicionarinfo');
      return response.data
    } catch (error) {
      console.error('Erro ao postar quarto', error);
      setIsPostBom(false);
    } finally {
      console.log('Postagem finalizada');
    }
  };

  const [quartoData, setQuartoData] = useState<any>(null);

  const handleSubmit = async (values: any) => {
    try {
      // Salvar no banco de dados
      const savedQuarto = await postQuarto(values);

      // Armazenar localmente no estado
      setQuartoData(savedQuarto);

      // Armazenar no local storage
      localStorage.setItem('quartoData', JSON.stringify(savedQuarto));

      console.log('Quarto salvo com sucesso:', savedQuarto);
    } catch (error) {
      console.error('Erro ao salvar o quarto:', error);
    }
  };

  return (
    <>
      <LoggedHeader />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <div className="flex flex-col xl:flex-row">
         
        <div className="w-full h-auto ml-8 flex flex-col items-center justify-around">
          <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
            <div className="bg-branco-3 w-[430px] h-[400px] rounded-[10px] flex items-center justify-center mb-6">
              <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5} />
            </div>
            <Link href='/hotel/editar_foto_quarto'>
            <button className="py-4 px-8 bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center whitespace-nowrap">
              Editar Fotos
            </button>
            </Link>
          </div>
        </div>



        <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
            <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px]"> Sem Nome</h1>
            <h4 className="w-[31px] h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A]">0$</h4>

              <ul className="gap-2">
                <li className="flex items-center gap-2 mb-2 p-2 relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Comece Renomeando seu Quarto.
                  </h5>
                </li>
                <li className="flex items-center gap-2 mb-2 p-2 relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Adicione fotos do quarto.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Selecione suas Comodidades.
                  </h5>
                </li>

                <li className="flex items-center gap-[10px] w-[320px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
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
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
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
                <div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={QuartoSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log('Dados do formulário:', values);
                      setSubmitting(true);      // bloqueia envios múltiplos
                      await postQuarto(values);  // fazendo o post do hotel no banco de dados
                      setSubmitting(false);     // finalizando o envio
                    }}
                  >
                    {({ isSubmitting, isValid }) => (
                      <Form>
                        {/* Campo de descrição */}
                        <div className="ml-8">
                          <label htmlFor='descrição' className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">
                            Descrição
                          </label>
                          <Field
                            type="textarea"
                            name="descricao"
                            className="w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                            placeholder="/Escreva aqui uma descrição sobre o seu quarto (máx. 500 palavras)"
                          />
                          <ErrorMessage name="descricao" component="div" className="text-rosa-4 text-xs ml-4 w-[30%]" />
                        </div>

                      {/* Campo de nome */}
                      <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                        <label htmlFor='nome'  className="font-poppins text-preto text-[24px] font-medium leading-[66px]"> Nome: </label>
                        <Field
                          as="textarea"
                          name="titulo"
                          className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                          placeholder="Escreva aqui o nome do quarto"
                        />
                      </div>
                     <ErrorMessage name="titulo" component="div" className="text-rosa-4 text-xs ml-4 w-[30%]" />

                      {/* Campo de preço */}

                      <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                        <label htmlFor='preco'  className="font-poppins text-preto text-[24px] font-medium leading-[66px]"> Preço: </label>
                        <Field
                          type="number"
                          name="valor_diaria"
                          className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                          placeholder="Escreva aqui o preço mínimo do quarto"
                        />
                      </div>
                      <ErrorMessage name="valor_diaria" component="div" className="text-rosa-4 text-xs ml-4 w-[30%]" />

                      {/* Botão de Confirmar */}
                      <div className='flex flex-row justify-between mb-8'>
                        <button
                            type="submit" 
                            disabled={isSubmitting || !isValid}
                            className={`mt-[32px] w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] -tracking-2 flex justify-center items-center ${
                              !isValid || isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-rosa-4 text-white hover:bg-[#F42C46]'
                            }`}>
                            Confirmar
                      </button>

                        {/* Botão de Cancelar */}
                        <Link href="/hotel" passHref>
                          <button className="mb-4 mt-[32px] py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                            Cancelar
                          </button>
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
                    
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
  throw new Error('Function not implemented.');
}
