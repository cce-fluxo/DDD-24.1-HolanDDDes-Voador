"use client";

import React from "react";
import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { icons } from "@/../../constants";
import LoginInput from "@/app/components/LoginInput";

const Cadastro3 = () => {
  const iconSize: number = 24;
  const router = useRouter();
  return (
    <main className="flex justify-evenly items-end h-dvh font-poppins">
      <div className="h-full flex justify-center items-center w-2/5">
        <span className="text-rosa-4 font-semibold text-5xl">
          Ficou mais fácil de anunciar o seu lugar.
        </span>
      </div>

      <AuthPanelFrame>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full">
            <div className="flex gap-4 justify-start">
              <button onClick={() => router.back()}>
                <Image
                  src={icons.arrowLeft}
                  width={iconSize / 2}
                  height={iconSize / 2}
                  alt="seta para esquerda"
                />
              </button>
              <span className="text-2xl text-preto font-semibold">
                Onde fica sua acomodação?
              </span>
            </div>
          </div>

          <form className="flex flex-col gap-2 w-full">
            <LoginInput
              label="Endereço"
              type="text"
              id="endereco"
              name="email"
              placeholder="Insira seu endereço"
            />
            <LoginInput
              label="Cidade"
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Insira sua cidade"
            />
            <LoginInput
              label="País/região"
              type="text"
              id="pais/regiao"
              name="pais/regiao"
              placeholder="Insira  sua região"
            />
            <LoginInput
              label="Número de celular"
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="Insira seu telefone de contato"
            />
          </form>

          <CustomButton
            text="Concluir"
            handleClick={() => router.push("/home")}
            classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
            classnameText="text-branco text-2xl"
          ></CustomButton>
        </div>
      </AuthPanelFrame>
    </main>
  );
};

export default Cadastro3;
