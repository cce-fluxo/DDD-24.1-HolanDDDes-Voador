// Perfil.tsx
"use client";
import Image from 'next/image';
import React, { useRef } from 'react';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";

const Perfil = () => {
  const links = [
    { href: "/salvar alterações", label: "Salvar Alterações" },
  ];

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

          <div className="xl:max-w-xl xl:w-2/3 h-[520px] max-h-full md:max-w-sm flex flex-col items-center justify-center mt-8 px-4">
          <div className="border-2 border-dashed border-cinza-2 w-full max-w-2xl  h-[450px] rounded-[10px] flex items-center justify-center mb-5 p-8">
          <Image src="/img.svg" alt="Botar fotos" width={340} height={57}  onClick={handleImageClick} className="hover:content-[url('/image_hover.png')]" />
              <label htmlFor="file-upload" className="sr-only">Upload File</label>
              <input id="file-upload" type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
            </div>
            <Link href="/quarto">
              <button className="mt-[20px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] flex items-center justify-around gap-[10px] font-poppins text-[24px] font-normal rounded-[10px] leading-9  hover:bg-[#F42C46] -tracking-2">
                Salvar Alterações
              </button>
            </Link>
          </div>
      </main>
    </>
  );
};

export default Perfil;