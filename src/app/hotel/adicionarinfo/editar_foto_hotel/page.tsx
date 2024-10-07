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
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fotos-hoteis`, {
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
      <main className="flex items-center justify-center">
        <div className="relative top-[30px] flex justify-around w-11/12 h-full">
          <div className="w-[517px] h-[607px] mt-[40px] mb-[26px] flex flex-col items-center justify-center bg-[#F6F4F4] rounded-[20px] p-[34px_50px_64px_37px]">
            <div className="flex flex-col items-center w-[575.47px] h-[454px] mt-[-90px]">
            <Image src="/upload-left.png" width={359.86} height={267.47} className="inline mb-[16px]" alt="Upload" />
            <h4 className="text-[24px] font-medium leading-[36px] font-poppins text-preto mb-[16px]">Fotos</h4>
              <div className="w-[454px] h-[240px] mb-[16px]">
                <h6 className="text-[16px] font-bold leading-[24px] font-poppins text-preto w-full h-[24px] mb-[15px]">
                  Selecione no mínimo 5 fotos para o perfil do seu Hotel.
                </h6>
                <ul>
                  <li className="flex gap-2 mb-[15px]">
                    <span className="w-[27px] h-[27px] bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-[16px] font-normal leading-[24px] font-poppins text-preto">
                      Explore suas comodidades!
                    </span>
                  </li>
                  <li className="flex gap-2 mb-[15px]">
                    <span className="w-[27px] h-[27px] bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-[16px] font-normal leading-[24px] font-poppins text-preto">
                      Que tal explorar a paisagem do seu estabeçecimento?
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-[27px] h-[27px] bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-[16px] font-normal leading-[24px] font-poppins text-preto">
                      As fotos são muito importantes para o primeiro contato do hóspede com o seu Hotel, escolha sempre as fotos mais nítidas e atraentes!
                    </span>
                  </li>
                </ul>
            </div>
          </div>
          </div>
          <div className="top-[284px] w-[639px] h-[611px] flex flex-col items-center mt-[40px] left-[772px]">
            <div className="border-2 border-dashed border-[#AB9C9F] w-[639px] h-[514px] rounded-[10px] flex items-center mb-[20px] p-[176px_128px_176px_128px]">
              <Image src="/img.svg" alt="Botar fotos" width={340} height={57}  onClick={handleImageClick} className="hover:content-[url('/image_hover.png')]" />
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
            </div>
            <Link href="/hotel/adicionarinfo">
              <button className="mt-[20px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] flex items-center justify-around gap-[10px] font-poppins text-[24px] font-normal rounded-[10px] leading-9  hover:bg-[#F42C46] -tracking-2">
                Salvar Alterações
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Perfil;