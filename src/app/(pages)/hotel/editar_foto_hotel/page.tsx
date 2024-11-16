"use client";
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import LoggedHeader from "@/app/LoggedHeader";
import api from '@/app/services/axios';
import { useRouter } from 'next/navigation';

// Pegando as informações do hotel para checar se o usuário tem ou não tem um hotel
interface HotelData {
  hotel: {
    nome: string | null; // nome do hotel
    postado: boolean; // adicionado para checar se o hotel foi postado
  };  
  foto_hotel: {
    id: number;
    url_foto: string;
  }[];
}

const Perfil = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagemHotel, setImagemHotel] = useState<File[]>([]);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const router = useRouter();

  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  // GET Hotel
  async function getHotel() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get("hotels/usuarioId");  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHotel().then((data) => {
      if (data) {
        setHotelData(data as HotelData);
      }
      setIsLoading(false);
    }
  );
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // state para mudar o botão e ficar inativo quando está fazendo upload
  const [isUploading, setIsUploading] = useState(false);

  // Função para lidar com o upload de arquivos
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const novosArquivos = Array.from(files).slice(0, 5 - imagemHotel.length); // limitada a 5 fotos
      setImagemHotel((prevImagens) => [...prevImagens, ...novosArquivos]);
    }
  };
  

  // Remoção das fotos
  const handleRemove = (index: number) => {
    const novasImagens = imagemHotel.filter((_, i) => i !== index);
    setImagemHotel(novasImagens);
  };


  const paginaHotel = () => {
    if (hotelData && hotelData.hotel.nome === null) {
      router.push("/hotel");
    } else if (hotelData && hotelData.hotel.postado === true) {
      router.push("/hotel/adicionarinfo/postar/confirmar/postado");
    } else {
      router.push("/hotel/adicionarinfo/postar");
    }
  };  
  
  const salvarImagemHotel = async () => {
    try {
      setIsUploading(true); // inicia o estado de upload
      // Envia uma imagem por vez
      for (let i = 0; i < imagemHotel.length; i++) {
        const imagem = imagemHotel[i];
        console.log("Imagem a ser enviada:", imagem);
  
        // Mandando para o back
        const formData = new FormData();
        formData.append('file', imagem, imagem.name);
  
        const response = await api.post('fotos-hoteis', formData);
        console.log("Imagem enviada com sucesso:", response.data);
      }
  
      // Após enviar todas as imagens, redireciona
      paginaHotel();
    } catch (error) {
      console.error('Erro ao enviar imagens:', error);
    } finally {
      setIsUploading(false);  // Finaliza o estado de upload
    }
  };
  
  // Função para excluir uma imagem
  const handleDeleteImage = async (imageId: number) => {
    try {
      const response = await api.delete(`fotos-hoteis/${imageId}`);
      console.log("Imagem deletada com sucesso:", response.data);
      // Atualizar o estado para remover a imagem deletada
      setHotelData(prevData => ({
        ...prevData!,
        foto_hotel: prevData!.foto_hotel.filter(img => img.id !== imageId)
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <LoggedHeader />
      <main className="flex flex-col xl:flex-row justify-around mt-24 items-center">
        <div className="xl:max-w-xl xl:w-2/3 h-[520px] max-h-full md:max-w-3xl mt-8 mb-6 flex flex-col items-center justify-center bg-cinza-0 rounded-[20px]">
          <div className="md:shrink-0 flex flex-col items-center md:w-[570px] h-auto">
            <Image src="/upload-left.png" width={359.86} height={267.47} className="inline mb-4 md:h-full md:w-80" alt="Upload" />
            <h4 className="text-2xl font-medium leading-[36px] font-poppins text-preto mb-4">Fotos</h4>
            <h6 className="text-[16px] font-bold leading-[24px] font-poppins text-preto w-full h-[24px] mb-[15px] ml-4">
              Selecione no máximo 5 fotos para o perfil do seu Hotel.
            </h6>
            <ul className="space-y-4 ml-4 mr-2">
              <li className="flex gap-2 mb-4">
                <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                <span className="text-base font-normal leading-6 font-poppins text-preto">
                  Explore suas comodidades!
                </span>
              </li>
              <li className="flex gap-2 mb-4">
                <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                <span className="text-base font-normal leading-6 font-poppins text-preto">
                  Que tal explorar a paisagem do seu estabeçecimento?
                </span>
              </li>
              <li className="flex gap-2 mb-4">
                <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
                <span className="text-base font-normal leading-6 font-poppins text-preto">
                  As fotos são muito importantes para o primeiro contato do hóspede com o seu Hotel, escolha sempre as fotos mais nítidas e atraentes!
                </span>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="xl:max-w-xl xl:w-2/3 h-[520px] max-h-full md:max-w-sm flex flex-col items-center justify-center mt-8 px-4">
          <div className="border-2 border-dashed border-cinza-2 w-full max-w-2xl h-[450px] rounded-[10px] flex items-center justify-center mb-5 p-8">
            {hotelData?.foto_hotel.length === 0 && hotelData?.foto_hotel.length === 0 ? (
              <Image src="/img.svg" alt="Botar fotos" width={340} height={57} onClick={handleImageClick} className="cursor-pointer hover:content-[url('/image_hover.png')]" />
            ) : (
              <div className="flex gap-4 w-full h-auto overflow-x-scroll">
                {/* Exibir fotos do hotel do backend */}
                {hotelData?.foto_hotel.map((imagem) => (
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
                {imagemHotel.map((imagem, index) => (
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
              if (imagemHotel.length > 0) {
                await salvarImagemHotel();
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
