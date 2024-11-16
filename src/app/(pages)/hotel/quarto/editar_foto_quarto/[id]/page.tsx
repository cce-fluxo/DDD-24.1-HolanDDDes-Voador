// Perfil.tsx
"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import LoggedHeader from "@/app/LoggedHeader";
import { useRouter, useParams } from 'next/navigation';
import api from '@/app/services/axios';

interface QuartoData {
  acomodacao: {
    id: number;
    titulo: string;
    valor_diaria: number; 
  };
  fotoAcomodacao: {
    url_foto: string;
    id: number;
  }[];
}

const Perfil = () => {
  const { id } = useParams(); // Captura o id da URL

  const [imagemQuarto, setImagemQuarto] = useState<File[]>([]);
  const [quartoData, setQuartoData] = useState<QuartoData | null>(null);

  const router = useRouter();

  // Exportação de imagem
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  // state para mudar o botão e ficar inativo quando está fazendo upload
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Função para lidar com o upload de arquivos (máx 5)
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const novosArquivos = Array.from(files).slice(0, 5 - imagemQuarto.length);
      
      setImagemQuarto((prevImagens) => [...prevImagens, ...novosArquivos]);
    }
  };

  // Remoção das fotos
  const handleRemove = (index: number) => {
    const novasImagens = imagemQuarto.filter((_, i) => i !== index);
    setImagemQuarto(novasImagens);
  };

  // GET Hotel
  async function getQuarto() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get(`acomodacoes/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuarto().then((data) => {
      if (data) {
        setQuartoData(data as QuartoData);
      }
      setIsLoading(false);
    }
  );
  }, []);

  const salvarImagemQuarto = async () => {
    try {
      setIsUploading(true); // inicia o estado de upload

      // Envia uma imagem por vez
      for (let i = 0; i < imagemQuarto.length; i++) {
        const imagem = imagemQuarto[i];
        console.log("Imagem a ser enviada:", imagem);
  
        // Mandando para o back
        const formData = new FormData();
        formData.append('file', imagem, imagem.name);
        const response = await api.post(`fotos-acomodacoes/${id}`, formData);
        
        console.log("Imagem enviada com sucesso:", response.data);

      }
      
      router.replace(`/hotel/quarto/${id}`);
    } catch (error) {
      console.error('Erro ao enviar imagens:', error);
    } finally {
      setIsUploading(false);  // Finaliza o estado de upload
    }
  };  

  // Função para excluir uma imagem
  const handleDeleteImage = async (imageId: number) => {
    try {
      const response = await api.delete(`fotos-acomodacoes/${imageId}`);
      console.log("Imagem deletada com sucesso:", response.data);
      // Atualizar o estado para remover a imagem deletada
      setQuartoData(prevData => ({
        ...prevData!,
        foto_hotel: prevData!.fotoAcomodacao.filter(img => img.id !== imageId)
      }));
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
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
       < meta name = "viewport" content = "width=device-width, initial-scale=1.0" />
      <LoggedHeader />
      <main className="flex flex-col xl:flex-row justify-around mt-24 items-center">
          <div className="xl:max-w-xl xl:w-2/3 h-[520px] max-h-full md:max-w-3xl mt-8 mb-6 flex flex-col items-center justify-center bg-cinza-0 rounded-[20px] ">
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
          <div className="border-2 border-dashed border-cinza-2 w-full max-w-2xl h-[450px] rounded-[10px] flex items-center justify-center mb-5 p-8">
            {quartoData?.fotoAcomodacao.length === 0 && quartoData?.fotoAcomodacao.length === 0 ? (
              <Image src="/img.svg" alt="Botar fotos" width={340} height={57} onClick={handleImageClick} className="cursor-pointer hover:content-[url('/image_hover.png')]" />
            ) : (
              <div className="flex gap-4 w-full h-auto overflow-x-scroll">
                {/* Exibir fotos do hotel do backend */}
                {quartoData?.fotoAcomodacao.map((imagem) => (
                  <div key={imagem.id} className="relative flex flex-shrink-0 h-full items-center justify-center">
                    <Image
                      src={imagem.url_foto} // Usando a URL da imagem
                      alt={`Imagem do Hotel ${imagem.id + 1}`}
                      width={128}
                      height={128}
                      objectFit="cover"
                      className="rounded-lg"
                      />
                      {/* Botão de excluir */}
                      <button
                        onClick={() => handleDeleteImage(imagem.id)}
                        className="absolute top-0 right-0 p-2 bg-preto bg-opacity-50 text-white rounded-full"
                      >
                        X
                      </button>
                    </div>
                ))}
                {/* Exibir fotos carregadas localmente */}
                {imagemQuarto.map((imagem, index) => (
                  <div key={index} className="relative flex flex-shrink-0 h-full items-center justify-center">
                    <Image
                      src={URL.createObjectURL(imagem)}
                      alt="Imagem"
                      width={128}
                      height={128}
                      objectFit="cover"
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
            className={`mt-5 mb-5 py-6 w-[340px] h-[57px] flex items-center justify-around font-poppins text-2xl font-normal rounded-[10px] leading-9  ${isUploading ? 'bg-cinza-1' : 'bg-rosa-4'} text-white`}
            onClick={async (event) => {
              event.preventDefault();
              if (imagemQuarto.length > 0) {
                await salvarImagemQuarto();
              }
            }}
            disabled={isUploading} // Desabilita o botão enquanto estiver carregando
            >
            {isUploading ? 'Aguarde...' : 'Salvar Alterações'}
          </button>
        </div>
      </main>
    </>
  );
};

export default Perfil;