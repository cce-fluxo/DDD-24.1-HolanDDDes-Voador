"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { images } from "@/constants";

const ModalExcluirConta = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 items-center bg-branco rounded-3xl font-poppins px-6 py-7 w-[740px]">
      <Image
        src={images.modalExcluirContaImage}
        height={330}
        width={344}
        alt="grafismo"
      />
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-5 items-center">
          <span className="text-preto text-2xl font-medium text-center">
            Tem certeza?
          </span>
          <span className="text-preto text-xl font-medium text-center">
            Ao confirmar você estará excluindo sua conta permanentemente, tem
            certeza que deseja continuar?
          </span>
        </div>
        <div className="flex gap-8">
          <CustomButton
            text="Não"
            handleClick={() => router.back()}
            classnameButton="h-12 w-full bg-transparent border-2 border-rosa-4 rounded-lg text-rosa-4 hover:bg-rosa-4 hover:text-branco"
            classnameText="text-2xl"
          />
          <CustomButton
            text="Sim"
            handleClick={() => {}}
            classnameButton="h-12 w-full bg-rosa-4 rounded-lg hover:bg-rosa-3"
            classnameText="text-branco text-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirConta;
