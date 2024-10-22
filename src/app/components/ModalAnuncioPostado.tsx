import React from "react";
import Image from "next/image";
import CloseButton from "@/app/components/CloseButton";

type ModalAnuncioPostadoProps = {
    setOpen: () => void;
}

const ModalAnuncioPostado = ({setOpen}: ModalAnuncioPostadoProps) => {
  return (
    <div className="flex flex-col items-center bg-black rounded-3xl font-poppins w-[880px] h-[688px] p-8">
        <div className="w-full flex justify-start">
            <CloseButton handleClick={ setOpen }/>
        </div>
        <div className="flex flex-col items-center gap-14">
            <Image src={"/popup_anuncio_postado.png"} alt="Imagem de brigado" height={449} width={444}/>
            <span className="text-preto text-2xl font-medium text-center">Seu anúncio foi postado com sucesso!</span>
        </div>
        
    </div>
  );
};

export default ModalAnuncioPostado;
