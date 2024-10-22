"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import Link from "next/link";
import Image from "next/image";
import { icons } from "@/../../constants";
import twitter from "../../../../public/twitter.png";
import google from '../../../../public/google.png';
import facebook from '../../../../public/facebook.png';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import { useRouter } from "next/navigation";

const Login = () => {
  const iconSize = 55;
  const router = useRouter();
  return (
    <main>
      <div className=" w-screen z-0 flex justify-center items-end bg-gradient-to-b from-rosa-4 to-laranja-gradiente h-screen font-poppins">
        <div className="flex flex-col z-50 justify-center items-center p-11 w-2/5 rounded-t-3xl bg-branco shadow-custom">
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
                    router.push("/home");
                  }, 400);
                }}
              >
                {({ handleSubmit }) => (
                  <Form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                    <InputText name="email" type="email" placeholder="E-mail" style="border-2 h-14 rounded-xl p-4 border-black" />
                    <InputText name="senha" type="password" placeholder="Senha" style="border-2 h-14 rounded-xl p-4 border-black" />
                    <div className="flex justify-between">
                      <span>Lembrar-me</span>
                      <Link href={"/redefinir-1"} className="underline hover:text-link-ativo">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <div className="flex flex-col gap-4 items-center w-full">

                      <button
                        type="submit"
                        className="flex items-center justify-center text-center w-4/5 h-12 bg-rosa-4 rounded-[10px]"
                      >
                        <span className="flex text-branco text-2xl">Entrar</span>

                      </button>

                      <Link href={"/cadastro-1"} className="w-4/5 h-12 bg-rosa-1 rounded-[10px]">

                        <span className="text-laranja-2 text-2xl">Cadastre-se</span>

                      </Link>

                      <span className="text-xl font-medium text-laranja-1">ou</span>
                      <div className="flex gap-14">
                        <Link href={"/google"}>
                          <Image src={google} className="rounded-[30px]" width={iconSize} height={iconSize} alt="google logo" />
                        </Link>
                        <Link href={"/facebook"}>
                          <Image src={facebook} width={iconSize} height={iconSize} alt="facebook logo" />
                        </Link>
                        <Link href={"/x"}>
                          <Image src={twitter} width={iconSize} height={iconSize} alt="x logo" />
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      

    </main>
  );
};

export default Login;
