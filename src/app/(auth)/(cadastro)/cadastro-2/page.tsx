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

const Cadastro2 = () => {
  const iconSize: number = 24;
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
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-2 w-full">
              <InputText
                label="E-mail"
                name="email"
                type="email"
                placeholder="Insira seu e-mail"
              />
              <InputText
                label="Senha"
                name="senha"
                type="password"
                placeholder="Crie uma senha forte"
              />
              <InputText
                label="Confirmar senha"
                name="senha"
                type="password"
                placeholder="Repita sua senha"
              />
            </Form>
          </Formik>

          <CustomButton
            text="Continuar"
            handleClick={() => router.push("/cadastro-3")}
            classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
            classnameText="text-branco text-2xl"
          ></CustomButton>
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
      </AuthPanelFrame>
    </main>
  );
};

export default Cadastro2;
