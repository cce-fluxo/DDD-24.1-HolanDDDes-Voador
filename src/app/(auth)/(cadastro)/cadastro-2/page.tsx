"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { icons, images } from "@/../../constants";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import arrowLeft from "../../../../../public/arrow_left.png";

const Cadastro2 = () => {
  const iconSize: number = 24;
  const router = useRouter();
  return (
    <main className="flex justify-evenly h-full font-poppins">
      <div className="h-full flex place-self-center justify-center items-center w-2/5">
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
            <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
            <span className="text-preto text-base">
              Anuncie seus lugares de forma mais rápida e sem tarifa.
            </span>
          </div>
          <div className="flex gap-4">
            <span className="w-7 h-7 bg-[url('/right.png')] bg-no-repeat bg-contain inline-block shrink-0" aria-hidden="true"></span>
            <span className="text-preto text-base">
              Você poderá gerenciar seu próprio hotel, adicionado fotos e
              verificando suas reservas.
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-5 pb-3 pr-5 pl-5 items-center w-2/5 rounded-t-3xl bg-branco shadow-custom">
        <div className="flex flex-col p-5 gap-6 shadow-lg rounded-lg w-full">
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
            initialValues={{ email: "", senha: "", confirmarSenha: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Email invalido")
                .required("Campo obrigatorio"),
              senha: Yup.string().required("Campo obrigatorio"),
              confirmarSenha: Yup.string()
                .required("Campo obrigatorio")
                .oneOf([Yup.ref("senha")], "As senhas devem ser iguais"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                router.push('/cadastro-3');
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-2 w-full">
              <InputText
                label="E-mail"
                name="email"
                type="email"
                placeholder="Insira seu e-mail"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Senha"
                name="senha"
                type="password"
                placeholder="Crie uma senha forte"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
                placeholder="Repita sua senha"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />

              <button className="w-4/5 h-12 mt-3 bg-rosa-4 rounded-lg place-self-center">
                <h1 className="text-branco text-2xl"> Continuar</h1>
              </button>
            </Form>
          </Formik>

          <span className="text-center font-light text-xs">
            Ao fazer login ou criar uma conta, você concorda com nossos{" "}
            <Link href={""} className="text-link-ativo">
              Termos e Condições
            </Link>{" "}
            e
            <Link href={""} className="text-link-ativo">
              {" "}
              Declaração de Privacidade
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Cadastro2;
