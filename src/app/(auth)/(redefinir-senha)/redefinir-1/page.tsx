"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";

const RedefinirSenha1 = () => {
  const router = useRouter();
  return (
    <main className="flex justify-center items-end h-dvh font-poppins">
      <AuthPanelFrame>
        <div className="flex flex-col gap-10">
          <span className="text-laranja-2 text-3xl text-center font-semibold">
            Esqueceu a senha? Sem problemas!
          </span>
          <span className="text-lg">
            Insira o seu endereço de e-mail para receber um código para
            redefinir sua senha.
          </span>
        </div>
        <div className="flex flex-col gap-10 items-center">
          <Formik
            className="flex flex-col gap-2"
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Email invalido")
                .required("Campo obrigatorio"),
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
                label="Seu endereço de e-mail"
                name="email"
                type="email"
                placeholder="E-mail"
              />
            </Form>
          </Formik>

          <div className="flex flex-col gap-4 w-full items-center">
            <CustomButton
              text="Enviar código"
              handleClick={() => router.push("/redefinir-2")}
              classnameButton="w-4/5 h-12 bg-rosa-4 rounded-[10px]"
              classnameText="text-branco text-2xl"
            />
            <CustomButton
              text="Voltar"
              handleClick={() => router.back()}
              classnameButton="w-4/5 h-12 bg-rosa-1 rounded-[10px]"
              classnameText="text-laranja-2 text-2xl"
            />
          </div>
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

export default RedefinirSenha1;
