// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import Quarto from '../quarto/page';
import BoxQuarto from '@/app/components/box_quarto';


// Função para contar as palavras (descrição tem limite)
const wordCount = (text: string) => {
  return text.trim().split(/\s+/).length;
};

const validate = (values: { nome: any; endereço: any; telefone: string; descrição: string; pet: string; enderecoId: number; proprietarioId: number; }) => {
  const errors: { [key: string]: string } = {};
  if (!values.nome) {
    errors.nome = 'Campo obrigatório';
  }
  if (!values.endereço) {
    errors.endereço = 'Campo obrigatório';
  }
  if (!values.telefone) {
    errors.telefone = 'Campo obrigatório';
  } else {
    // Regex para telefone brasileiro no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(values.telefone)) {
      errors.telefone = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.';
    }
  }
      // descrição é opcional
    // Validação da descrição com limite de 500 palavras
    if (values.descrição) {
      const descriptionWordCount = wordCount(values.descrição);
      if (descriptionWordCount > 500) {
        errors.descrição = `Descrição não pode ter mais de 500 palavras. Atual: ${descriptionWordCount} palavras.`;
      }
    }
    return errors;
};

const Hotel = () => {
    
  const hotelData = useFormik({
    initialValues:{
      nome: '', 
      endereço: '', 
      telefone: '', 
      descrição: '', 
      pet: 'true', 
      enderecoId: 3, 
      proprietarioId: 6
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }
  });

  // UseEffect para armazenar dados no localStorage
  useEffect(() => {
    // Armazenar os dados do formulário no localStorage sempre que houver mudanças
    const formData = hotelData.values;
    console.log("Dados do formulário:", formData); // Verifique os dados que estão sendo armazenados
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [hotelData.values]);
  

  // Exportação de imagem
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append('files', file);
      });
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fotos-hoteis`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          /*'Authorization': `Bearer ${token}`*/
         },
        body: formData,
      });

      const result = await response.json();
      console.log('Resultado da resposta:', result);
  
      if (response.ok) {
        console.log('Upload bem-sucedido');
      } else {
        console.log('Erro ao fazer upload');
      }
    }
  };

  return (
    <>
      <LoggedHeader />
      <main className="flex pt-[80px]">
      <div className="flex w-11/12 h-full justify-around">
      <div className="w-1/4 h-screen fixed left-[88px] top-[30px] flex flex-col items-center justify-center gap-[32px]">
            <div className="bg-[#D9D9D9]  p-[176px_128px] w-[430px] h-[466px] rounded-[10px] flex items-center justify-center">
              <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5} onClick={handleImageClick}/>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" title="Upload hotel images" />
            </div>
            <Link href="/hotel/adicionarinfo/editar_foto_hotel" passHref>
              <button className="mt-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Editar Fotos
              </button>
            </Link>
          </div>
          <div className="ml-[25%] w-[669px] h-[447px] relative top-[50px] flex flex-col">
          <div className="w-[816px] h-[723px] gap-[64px]">
          <div className="w-[669px] h-[358px] gap-[16px]">
            <div className="w-[245px] h-[118px] gap-[16px]">
              <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px]"> Sem Nome</h1>
              <h4 className="w-[31px] h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A]">0$</h4>
            </div>
            <div className="w-[669px] h-[224px] gap-2">
              <ul className="gap-[10px]">
                <li className="flex items-center gap-[10px] mb-[10px] w-[669px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Comece Renomeando seu Hotel; atribua endereço e telefone.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[427px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Adicione fotos do Hotel e dos quartos.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Selecione suas Comodidades.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] w-[290px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Escreva sobre seu Hotel.
                  </h5>
                </li>
              </ul>
            </div>
            </div>
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
                <BoxQuarto/>
                <div className="w-[854px] h-[423px]">
                  <div className="w-[400px] h-[432px] top-[2px] rounded-[10px] p-[32px] gap-[56px] bg-branco-2 flex flex-col justify-center items-end">
                    <div className="w-[336px] h-[359px] gap-[16px]">
                      <div className="w-[336px] h-[287px] gap-[16px]">
                        <div className="w-[336px] h-[235px] rounded-[10px] bg-[#D9D9D9] flex justify-center items-center">
                          <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                            <Image src="/hotel_image.png" width={123.5} height={104.5} alt="Hotel" />
                          </div>
                        </div>
                        <Link href="/hotel/quarto"> 
                          <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">Adicione um Quarto</h4>
                        </Link>
                        <div className="mt-[-40px] w-[600px] h-[100px] gap-[4px] flex flex-col justify-end items-center">
                        <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                          por noite:
                        </p>
                        <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">R$ 0</h3>
                      </div>
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
              <div className="mt-[60px] flex flex-col">
                <h3 className=" w-[245px] h-[60px] font-poppins text-preto text-[32px] font-bold leading-[66px]"> Meus dados:</h3>
                <div className="w-full">
                <div>
                  <form onSubmit={hotelData.handleSubmit}>
                      <div className="ml-8">
                        <label htmlFor='descrição' className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">
                          Descrição
                        </label>
                        <input
                          type="text"
                          id="descrição"
                          className="w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                          placeholder="/Escreva aqui uma descrição sobre o seu hotel (máx. 500 palavras)"
                          {...hotelData.getFieldProps('descrição')}
                        />
                        {typeof hotelData.errors.descrição === 'string' && <div className="text-red-500">{hotelData.errors.descrição}</div>}
                        </div>
                      
                      {/* Contagem de palavras na descrição */}
                      <div className="text-right text-cinza-2 text-[12px]">
                        {wordCount(hotelData.values.descrição)} / 500 palavras
                      </div>

                      <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                        <label htmlFor='nome'  className="font-poppins text-preto text-[24px] font-medium leading-[66px]"> Nome: </label>
                        <input
                          type="text"
                          id="nome"
                          className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                          placeholder="Escreva aqui o nome do hotel"
                          {...hotelData.getFieldProps('nome')}
                        />
                      </div>
                      {typeof hotelData.errors.nome === 'string' && <div className="text-rosa-4 text-xs ml-4 w-[30%]">{hotelData.errors.nome}</div>}

                      <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                        <label htmlFor='endereço'  className="font-poppins text-preto text-[24px] font-medium leading-[66px]"> Endereço: </label>
                        <input
                          type="text"
                          id="endereço"
                          className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                          placeholder="Escreva aqui o endereço do hotel"
                          {...hotelData.getFieldProps('endereço')}
                        />
                      </div>
                      {typeof hotelData.errors.endereço === 'string' && <div className="text-rosa-4 text-xs ml-4 w-[30%]">{hotelData.errors.endereço}</div>}              

                    {/*Campo de telefone */}
                      <div className="relative w-full peer h-10 border border-cinza-3 rounded-[18px] px-4 placeholder-transparent flex items-center mt-10">
                        <label htmlFor='telefone'  className="font-poppins text-preto text-[24px] font-medium leading-[66px]"> Telefone: </label>
                        <input
                          type="text"
                          id="telefone"
                          className="ml-2 w-full h-full border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none focus:text-preto"
                          placeholder="Escreva o telefone no formato (XX) XXXXX-XXXX"
                          {...hotelData.getFieldProps('telefone')}
                        />
                      </div>
                      {typeof hotelData.errors.telefone === 'string' && <div className="text-rosa-4 text-xs ml-4 w-[30%]">{hotelData.errors.telefone}</div>}

                      {/* Botão de Confirmar */}
                      <div className='flex flex-row justify-between mb-8'>
                        <Link href="/hotel/adicionarinfo/postar" passHref>
                          <button
                            type="submit"
                            className={`mt-[32px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 ${!(hotelData.isValid && hotelData.dirty) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!(hotelData.isValid && hotelData.dirty)}
                          >
                            Confirmar
                          </button>
                        </Link>

                        {/* Botão de Cancelar */}
                        <Link href="/hotel" passHref>
                          <button className="mt-[32px] py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                            Cancelar
                          </button>
                        </Link>
                      </div>
                    </form>
                </div>

                    
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default Hotel;