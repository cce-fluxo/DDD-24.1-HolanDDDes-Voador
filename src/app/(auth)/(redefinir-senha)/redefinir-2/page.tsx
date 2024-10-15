"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/CustomButton";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";

const RedefinirSenha2 = () => {
  const router = useRouter();
  return (
    <main className="flex justify-center items-end h-dvh font-poppins">
      <AuthPanelFrame>
        <span className="text-[26px] font-semibold">Digite o código</span>
        <span className="text-lg">
          Verifique a caixa de entrada e insira o código de confirmação que
          enviamos no e-mail cadastrado.
        </span>

        <Formik
          className="flex flex-col gap-2"
          initialValues={{
            codigo: "",
          }}
          validationSchema={Yup.object({
            codigo: Yup.string().required("Campo obrigatorio"),
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
              label="Insira o código"
              name="codigo"
              type="text"
              placeholder="Código"
            />
          </Form>
        </Formik>

        <div className="flex flex-col gap-4 w-full items-center">
          <CustomButton
            text="Continuar"
            handleClick={() => router.push("/redefinir-3")}
            classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
            classnameText="text-branco text-2xl"
          />
          <CustomButton
            text="Reenviar código"
            handleClick={() => {}}
            classnameButton="w-4/5 h-12 bg-rosa-1 rounded-lg"
            classnameText="text-laranja-2 text-2xl"
          />
        </div>
        <span className="text-center font-light text-[13px]">
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
      </AuthPanelFrame>
    </main>
  );
};

export default RedefinirSenha2;
