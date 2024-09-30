// Perfil.tsx
"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import LoggedHeader from "@/app/LoggedHeader";
import Modal from '@/app/components/popperfil';

const Perfil = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
      <main className="flex items-center justify-center px-4">
        <div className="relative mt-8 flex flex-col md:flex-row justify-around w-full h-full">
          <div className="md:w-1/3 lg:w-2/3 xl:w-1/3 mt-8 mb-6 flex flex-col items-center justify-center bg-cinza-0 rounded-[20px] ">
            <div className="md:shrink-0 flex flex-col items-center md:w-[570px] h-auto">
            <Image src="/upload-left.png" width={359.86} height={267.47} className="inline mb-4 md:h-full md:w-80" alt="Upload" />
            <h4 className="text-2xl font-medium leading-[36px] font-poppins text-preto mb-4">Fotos</h4>
            <div className="w-5/6 mb-4">
                <h6 className="text-lg font-bold leading-6 font-poppins text-preto mb-4 text-center">
                  Selecione três fotos para compor o seu perfil.
                </h6>
                <ul className="space-y-4">
                  <li className="flex gap-2 mb-4">
                    <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-base font-normal leading-6 font-poppins text-preto">
                      Vamos começar com a foto principal! Com postura formal e rosto bem aparente.
                    </span>
                  </li>
                  <li className="flex gap-2 mb-4">
                    <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-base font-normal leading-6 font-poppins text-preto">
                      Que tal uma foto mais descontraída? Experimente postar uma foto sua praticando algum hobby!
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                    <span className="text-base font-normal leading-6 font-poppins text-preto">
                      Por último, seria interessante uma foto sua com algum ente querido. Seja um amigo, familiar, ou com seu pet!
                    </span>
                  </li>
                </ul>
            </div>
          </div>
          </div>
          <div className="w-full md:max-w-2xl  flex flex-col items-center justify-center mt-8 px-4">
            <div className="border-2 border-dashed border-cinza-2 w-full max-w-2xl  h-[450px] rounded-[10px] flex items-center justify-center mb-5 p-8">
              <Image src="/img.png" alt="Botar fotos" width={340} height={57}  onClick={handleImageClick} className="hover:content-[url('/image_hover.png')]" />
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
            </div>
              <button onClick={openModal} className="mt-5 mb-5 py-6 px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] flex items-center justify-around gap-[10px] font-poppins text-2xl font-normal rounded-[10px] leading-9  hover:bg-rosa-3 -tracking-2">
                Salvar Alterações
              </button>
              <Modal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Perfil;