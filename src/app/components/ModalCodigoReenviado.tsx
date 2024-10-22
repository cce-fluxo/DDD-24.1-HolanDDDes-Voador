import React from "react";
import Image from "next/image";

const ModalCodigoReenviado = () => {
  return (
    <div className="flex flex-col items-center bg-branco rounded-3xl font-poppins w-[537px] h-[571px] p-8 gap-14">
            <Image src={"/popup_codigo_reenviado.png"} alt="Imagem de brigado" height={326} width={332}/>
            <span className="text-preto text-2xl font-medium text-center">Código reenviado com sucesso</span>    
    </div>
  );
};

export default ModalCodigoReenviado;
