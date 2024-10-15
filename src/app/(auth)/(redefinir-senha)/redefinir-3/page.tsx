"use client";

import Image from "next/image";
import { icons } from "@/../../constants";
import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/CustomButton";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";

const RedefinirSenha3 = () => {
  const router = useRouter();
  const arrowSize: number = 24;
  return (
    <main className="flex justify-center items-end h-dvh font-poppins text-preto">
      <AuthPanelFrame>
        <span className="text-[26px] font-semibold">Nova senha</span>
        <span className="text-lg">Crie uma senha para a sua nova conta</span>

        <Formik
          className="flex flex-col gap-2"
          initialValues={{ senha: "", confirmarSenha: "" }}
          validationSchema={Yup.object({
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
              label="Senha"
              name="senha"
              type="password"
              placeholder="Crie uma senha forte"
            />
            <InputText
              label="Confirmar senha"
              name="senha"
              type="password"
              placeholder="Confirmar senha"
            />
          </Form>
        </Formik>

        <div className="flex flex-col items-start w-full">
          <span className="font-medium text-base">
            A senha deve ter, pelo menos:
          </span>
          <div className="flex">
            <Image
              src={icons.arrowRight}
              width={arrowSize}
              height={arrowSize}
              alt="arrow right"
            />
            <span className="text-preto opacity-70 font-light text-base">
              10 caracteres
            </span>
          </div>
          <div className="flex">
            <Image
              src={icons.arrowRight}
              width={arrowSize}
              height={arrowSize}
              alt="arrow right"
            />
            <span className="text-preto opacity-70 font-light text-base">
              1 letra maiúscula
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <CustomButton
            text="Continuar"
            handleClick={() => router.push("/login")}
            classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
            classnameText="text-branco text-2xl"
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

export default RedefinirSenha3;
