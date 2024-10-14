"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import Link from "next/link";
import Image from "next/image";
import { icons } from "@/../../constants";
import LoginInput from "@/app/components/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";

const Login = () => {
  const iconSize = 55;
  return (
    <main className="flex justify-center items-end bg-gradient-to-b from-rosa-4 to-laranja-gradiente h-dvh font-poppins">
      <AuthPanelFrame>
        <div className="flex flex-col gap-7 w-full">
          <span className="text-preto text-[26px] font-semibold text-center">
            Faça o login ou crie uma conta
          </span>
          <div className="flex flex-col gap-3">
            <Formik
              initialValues={{ email: "", senha: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Email invalido")
                  .required("Campo obrigatorio"),
                senha: Yup.string().required("Campo obrigatorio"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="flex flex-col gap-2 w-full">
                <InputText name="email" type="email" placeholder="E-mail" />
                <InputText name="senha" type="password" placeholder="Senha" />
              </Form>
            </Formik>
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
            <Link
              href={"/home"}
              className="w-4/5 h-12 bg-rosa-4 rounded-[10px]"
            >
              <span className="text-branco text-2xl">Entrar</span>
            </Link>
            <Link
              href={"/cadastro-1"}
              className="w-4/5 h-12 bg-rosa-1 rounded-[10px]"
            >
              <span className="text-laranja-2 text-2xl">Cadastre-se</span>
            </Link>
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
