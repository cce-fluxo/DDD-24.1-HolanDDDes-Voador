import React from "react";
import Image from "next/image";
import CloseButton from "@/app/components/CloseButton";
import Link from "next/link";

type ModalAnuncioPostadoProps = {
    setOpen: () => void;
}

const ModalAnuncioPostado = ({setOpen}: ModalAnuncioPostadoProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center bg-branco rounded-3xl font-poppins w-[880px] h-[688px] p-8">
        <div className="w-full flex justify-start">
            <Link href='/hotel/adicionarinfo/postar/confirmar/postado'>
                <CloseButton handleClick={ setOpen } />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-14">
              <Image src={"/popup_anuncio_postado.png"} alt="Imagem de brigado" height={449} width={444}/>
              <span className="text-preto text-2xl font-medium text-center">Seu anúncio foi postado com sucesso!</span>
          </div>
          
      </div>
    </div>
  );
};

export default ModalAnuncioPostado;
