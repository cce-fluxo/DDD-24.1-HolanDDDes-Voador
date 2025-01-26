"use client";

import React from "react";
import { images } from "@/../../constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import twitter from "../../../../../public/twitter.png";
import google from "../../../../../public/google.png";
import facebook from "../../../../../public/facebook.png";
import arrowLeft from "../../../../../public/arrow_left.png";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import { useSignUp } from "@/app/context/signUpContext";

const Cadastro1 = () => {
  const iconSize: number = 24;
  const iconSizeLoginOptions: number = 55;
  const router = useRouter();

  const { user,  updateUser } = useSignUp();

  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">
      <div className="h-full flex justify-center place-self-center items-center w-2/5">
        <div className="flex flex-col justify-center bg-fundo-imagem-cadastro h-3/4 rounded-3xl p-10 gap-4">
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
            <span
              className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0"
              aria-hidden="true"
            ></span>
            <span className="text-preto text-base">
              Anuncie seus lugares de forma mais rápida e sem tarifa.
            </span>
          </div>
          <div className="flex gap-4">
            <span
              className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0"
              aria-hidden="true"
            ></span>
            <span className="text-preto text-base">
              Você poderá gerenciar seu próprio hotel, adicionado fotos e
              verificando suas reservas.
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center pt-5 pb-3 pr-5 pl-5 items-center w-2/5 rounded-t-3xl z-60 bg-branco shadow-custom">
        <div className="flex flex-col p-5 gap-3 shadow-lg rounded-lg w-full">
          <div className="w-full">
            <div className="flex gap-4 justify-start">
              <button onClick={() => router.back()}>
                <Image
                  src={arrowLeft}
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
                user.nome = values.nome;
                user.sobrenome = values.sobrenome;
                user.dataNascimento = new Date(values.dataNascimento);
                updateUser(user);
                setSubmitting(false);
                router.push("/cadastro-2");
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-2 w-full">
              <InputText
                label="Nome"
                name="nome"
                type="text"
                placeholder="Insira seu nome"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Sobrenome"
                name="sobrenome"
                type="text"
                placeholder="Insira seu sobrenome"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Data de nascimento"
                name="dataNascimento"
                type="date"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />

              <button className="w-4/5 h-12 mt-3 bg-rosa-4 rounded-lg place-self-center">
                <h1 className="text-branco text-2xl"> Continuar</h1>
              </button>
            </Form>
          </Formik>

          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <span className="text-xl font-medium text-laranja-1">ou</span>
            <div className="flex gap-14">
              <Link href={"/google"}>
                <Image
                  src={google}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
                  alt="google logo"
                />
              </Link>
              <Link href={"/facebook"}>
                <Image
                  src={facebook}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
                  alt="facebook logo"
                />
              </Link>
              <Link href={"/x"}>
                <Image
                  src={twitter}
                  width={iconSizeLoginOptions}
                  height={iconSizeLoginOptions}
                  alt="x logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro1;
