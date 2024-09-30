// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';

// Define o tipo para os dados do hotel
interface QuartoData {
  preco: string | number | readonly string[] | undefined;
  nome: string;
  descrição: string;
}

const Hotel = () => {
  const [quartoData, setQuartoData] = useState<QuartoData>({ nome: '', preco: '', descrição: ''});
  const MAX_WORDS = 500;

  // Exportação de imagem
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // Recupera os dados do localStorage
    const nome = localStorage.getItem('nome') || '';
    const preco = localStorage.getItem('preco') || '';
    const descrição = localStorage.getItem('descrição') || '';

    // Define os dados do hotel
    setQuartoData({ nome, preco, descrição });
  }, []); // O array de dependências está vazio, então useEffect será chamado apenas quando preencher
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'descrição') {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > MAX_WORDS) return;
    }

    setQuartoData((prev: any) => ({ ...prev, [name]: value }));
    localStorage.setItem(name, value);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append('files', file);
      });
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
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
            <Link href="/hotel/quarto/editar_foto_quarto" passHref>
              <button className="mt-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Editar Fotos
              </button>
            </Link>
          </div>
          <div className="ml-[25%] w-[500px] h-[200px] relative top-[50px] flex flex-col">
          <div className="w-[816px] h-[200px] gap-[64px]">
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
                    Comece Renomeando seu Quarto.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[427px] h-[50px] p-[10px] relative">
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
            </div>
            </div>
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
              <div className="mt-[60px] flex flex-col">
                <h3 className=" w-[245px] h-[60px] font-poppins text-preto text-[32px] font-bold leading-[66px]"> Meus dados:</h3>
                <div className="w-full ml-8">
                  <h4 className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">Descrição</h4>
                  <input
                      type="text"
                      id="descrição"
                      name="descrição"
                      placeholder="/Escreva aqui uma descrição rápida do seu quarto (máx. 500 palavras)"
                      className="w-full h-full ml-20 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[20px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0 overflow-hidden whitespace-pre-wrap break-words"
                      value={quartoData.descrição}
                      onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-row mt-[60px]">
                <div className="w-[520px] h-[56px] flex items-center">
                  <div className="relative w-full peer h-10 border border-cinza-3 rounded-[10px] px-4 placeholder-transparent flex items-center">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Escreva aqui seu nome"
                      className="w-full h-full ml-20 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                      value={quartoData.nome}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="nome"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-preto font-poppins font-medium text-[24px]"
                    >
                      Nome:
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row mt-[60px]">
                <div className="w-[520px] h-[56px] flex items-center">
                  <div className="relative w-full peer h-10 border border-cinza-3 rounded-[10px] px-4 placeholder-transparent flex items-center">
                    <input
                      type="text"
                      id="preco"
                      name="preco"
                      placeholder="Insira o valor mínimo de diária"
                      className="w-full h-full ml-20 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                      value={quartoData.preco}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="preco"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-preto font-poppins font-medium text-[24px]"
                    >
                      Preço:
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-[10px] justify-between mb-[80px]"> 
                  <Link href="/hotel/adicionarinfo" passHref>
                    <button className="mt-[32px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center">
                      Confirmar
                    </button>
                  </Link>
                  <Link href="/hotel/adicionarinfo" passHref>
                    <button className="mt-[32px] py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                      Cancelar
                    </button>
                  </Link>
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