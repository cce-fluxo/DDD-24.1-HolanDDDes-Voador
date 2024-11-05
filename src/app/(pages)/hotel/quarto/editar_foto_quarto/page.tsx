// Perfil.tsx
"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import { useRouter } from 'next/router';
import api from '@/app/services/axios';

const Perfil = () => {
  const router = useRouter();

  // Exportação de imagem
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imagemQuarto, setImagemQuarto] = useState<File[]>([]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Função para lidar com o upload de arquivos (máx 5)
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const novosArquivos = Array.from(files).slice(0, 5 - imagemQuarto.length);
      
      setImagemQuarto([...imagemQuarto, ...novosArquivos]);
    }
  };

  // Remoção das fotos
  const handleRemove = (index: number) => {
    const novasImagens = imagemQuarto.filter((_, i) => i !== index);
    setImagemQuarto(novasImagens);
  };


  const salvarImagemQuarto = async (imagem: File) => {
    try {
      console.log("Imagem a ser enviada:", imagem);
      // Atualizar a imagem que será mostrada
      setImagemQuarto([imagem]);

      // Mandando para o back
      const formData = new FormData();
      formData.append('file', imagem, imagem.name);
      const response = await api.post('fotos-acomodacoes', formData);

      console.log(response.data);
      router.push('/quarto');
    } catch (error) {
      console.error(error);
    }
  };   

  return (
    <>
       < meta name = "viewport" content = "width=device-width, initial-scale=1.0" />
      <LoggedHeader />
      <main className="flex flex-col xl:flex-row justify-around mt-24 items-center">
          <div className="xl:max-w-xl xl:w-2/3 h-[520px] max-h-full md:max-w-sm mt-8 mb-6 flex flex-col items-center justify-center bg-cinza-0 rounded-[20px] ">
            <div className="md:shrink-0 flex flex-col items-center md:w-[570px] h-auto">
            <Image src="/upload-left.png" width={359.86} height={267.47} className="inline mb-4 md:h-full md:w-80" alt="Upload" />
            <h4 className="text-2xl font-medium leading-[36px] font-poppins text-preto mb-4">Fotos</h4>

                <h6 className="text-[16px] font-bold leading-[24px] font-poppins text-preto w-full h-[24px] mb-[15px]">
                  Selecione no mínimo 5 fotos para seus visitantes verem.
                </h6>

                <ul className="space-y-4 ml-4 mr-2">
                <li className="flex gap-2 mb-4 ">
                    <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-base font-normal leading-6 font-poppins text-preto">
                      Vamos começar com a foto principal! Escolha uma foto interessante!
                    </span>
                  </li>
                  <li className="flex gap-2 mb-4 ">
                    <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-base font-normal leading-6 font-poppins text-preto">
                      Adicione fotos que valorizem o seu espaço e deixem ele mais atrativo.
                    </span>
                  </li>
                </ul>
            </div>
          </div>

          <div className="xl:max-w-xl xl:w-2/3 h-[530px] max-h-full md:max-w-sm  flex flex-col items-center justify-center mt-8 px-4">
            {/* Se imagens estiver vazio, mostra o ícone svg do figma */}
            
            <div className="border-2 border-dashed border-cinza-2 w-full max-w-2xl h-[450px] rounded-[10px] flex items-center justify-center mb-5 p-8">
          {imagemQuarto.length === 0 ? (
              <Image src="/img.svg" alt="Botar fotos" width={340} height={57} onClick={handleImageClick} className="cursor-pointer hover:content-[url('/image_hover.png')]" />
          ) : (
            <div className="flex gap-4 w-full h-auto overflow-x-scroll">
              {imagemQuarto.map((imagemQuarto, index) => (
                <div key={index} className="relative flex flex-shrink-0 h-full items-center justify-center">
                  <Image
                    src={URL.createObjectURL(imagemQuarto)}
                    alt="Imagem"
                    width={128} // Define uma largura fixa (estava tendo problemas)
                    height={128} // Define uma altura fixa (estava tendo problemas)
                    objectFit="cover" // Faz a imagem se ajustar ao contêiner
                    className="rounded-lg"
                  />
                  <button onClick={() => handleRemove(index)} className="absolute top-0 right-0 p-2 bg-preto bg-opacity-50 text-white rounded-full">
                    X
                  </button>
                </div>
              ))}
              {/* Botão de adicionar mais fotos */}
                <button
                  onClick={handleImageClick}
                  className="w-32 h-32 border-2 border-dashed border-cinza-2 flex items-center justify-center text-2xl font-bold text-cinza-2 rounded-lg"
                >
                  +
                </button>
                  </div>
                )}
          </div>

          <input id="file-upload" type="file" multiple ref={fileInputRef} onChange={handleUpload} className="hidden" />

              <button 
                className="mt-5 mb-5 py-6 bg-rosa-4 text-white w-[340px] h-[57px] flex items-center justify-around font-poppins text-2xl font-normal rounded-[10px] leading-9  hover:bg-rosa-3 -tracking-2"
                onClick={async (event) => { // evitar ele passar de página sem o POST
                  event.preventDefault();
                  if (imagemQuarto[0]) {
                    await salvarImagemQuarto(imagemQuarto[0]);
                  }
                }}>
                Salvar Alterações
              </button>
          </div>
      </main>
    </>
  );
};

export default Perfil;