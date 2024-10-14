"use client";

import React from "react";
import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { icons } from "@/../../constants";
import LoginInput from "@/app/components/LoginInput";

const Login = () => {
  const router = useRouter();
  const iconSize = 55;
  return (
    <main className="flex justify-center items-end bg-gradient-to-b from-rosa-4 to-laranja-gradiente h-dvh font-poppins">
      <AuthPanelFrame>
        <div className="flex flex-col gap-7 w-full">
          <span className="text-preto text-[26px] font-semibold text-center">
            Faça o login ou crie uma conta
          </span>
          <div className="flex flex-col gap-3">
            <form className="flex flex-col gap-2 w-full">
              <LoginInput
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
              />
              <LoginInput
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
              />
            </form>
            <div className="flex justify-between">
              <span className="">Lembrar-me</span>
              <Link
                href={"/redefinir-1"}
                className="underline hover:text-link-ativo"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <CustomButton
              text="Entrar"
              handleClick={() => router.push("/home")}
              classnameButton="w-4/5 h-12 bg-rosa-4 rounded-[10px]"
              classnameText="text-branco text-2xl"
            />
            <CustomButton
              text="Cadastre-se"
              handleClick={() => router.push("/cadastro-1")}
              classnameButton="w-4/5 h-12 bg-rosa-1 rounded-[10px]"
              classnameText="text-laranja-2 text-2xl"
            />
            <span className="text-xl font-medium text-laranja-1 ">ou</span>
            <div className="flex gap-14">
              <Link href={"/google"}>
                <Image
                  src={icons.google}
                  width={iconSize}
                  height={iconSize}
                  alt="google logo"
                />
              </Link>
              <Link href={"/facebook"}>
                <Image
                  src={icons.facebook}
                  width={iconSize}
                  height={iconSize}
                  alt="facebook logo"
                />
              </Link>
              <Link href={"/x"}>
                <Image
                  src={icons.x}
                  width={iconSize}
                  height={iconSize}
                  alt="x logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </AuthPanelFrame>
    </main>
  );
};

export default Login;
