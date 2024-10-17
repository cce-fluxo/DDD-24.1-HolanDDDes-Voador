"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import CustomButton from "@/app/components/CustomButton";
import React from "react";
import { icons, images } from "@/../../constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputField";

const Cadastro1 = () => {
  const iconSize: number = 24;
  const iconSizeLoginOptions: number = 55;
  const router = useRouter();
  return (
    <main className="flex justify-evenly items-end h-dvh font-poppins">
      <div className="h-full flex justify-center items-center w-2/5">
        <div className="flex flex-col bg-fundo-imagem-cadastro h-3/4 rounded-3xl p-10 gap-4">
          <div className="flex justify-center">
            <Image
              src={images.pictureCadastro}
              width={300}
              height={300}
              alt="imagem cadastro"
            />
          </div>
          <span className="text-preto text-xl font-medium">Aproveite:</span>
          <div className="flex gap-4">
            <Image
              src={icons.checkmark}
              height={iconSize}
              width={iconSize}
              alt="checkmark icon"
            />
            <span className="text-preto text-base">
              Anuncie seus lugares de forma mais rápida e sem tarifa.
            </span>
          </div>
          <div className="flex gap-4">
            <Image
              src={icons.checkmark}
              height={iconSize}
              width={iconSize}
              alt="checkmark icon"
            />
            <span className="text-preto text-base">
              Você poderá gerenciar seu próprio hotel, adicionado fotos e
              verificando suas reservas.
            </span>
          </div>
        </div>
      </div>

      <AuthPanelFrame>
        <div className="flex flex-col gap-6 w-full">
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
                Crie a sua conta
              </span>
            </div>
          </div>

          <Formik
            className="flex flex-col gap-2"
            initialValues={{ nome: "", sobrenome: "", dataNascimento: "" }}
            validationSchema={Yup.object({
              nome: Yup.string().required("Campo obrigatorio"),
              sobrenome: Yup.string().required("Campo obrigatorio"),
              dataNascimento: Yup.date()
                .required("Campo obrigatorio")
                .min(
                  new Date(1900, 0, 1),
                  "Nao é permitido datas anteriores a 1900"
                )
                .max(new Date(), "Nao é permitido data futura"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-2 w-full">
              <InputText
                label="Nome"
                name="nome"
                type="text"
                placeholder="Insira seu nome"
              />
              <InputText
                label="Sobrenome"
                name="sobrenome"
                type="text"
                placeholder="Insira seu sobrenome"
              />
              <InputText label="Data de nascimento" name="senha" type="date" />
            </Form>
          </Formik>

          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <CustomButton
              text="Continuar"
              handleClick={() => router.push("/cadastro-2")}
              classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
              classnameText="text-branco text-2xl"
            ></CustomButton>
            <span className="text-xl font-medium text-laranja-1">ou</span>
            <div className="flex gap-14">
              <Link href={"/google"}>
                <Image
                  src={icons.google}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
                  alt="google logo"
                />
              </Link>
              <Link href={"/facebook"}>
                <Image
                  src={icons.facebook}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
                  alt="facebook logo"
                />
              </Link>
              <Link href={"/x"}>
                <Image
                  src={icons.x}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
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

export default Cadastro1;
