"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import Button from "@/app/components/Button";

const RedefinirSenha2 = () => {
  const router = useRouter();
  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">

      <div className="flex flex-col justify-center py-[48px] px-[41px] items-center w-2/5 rounded-t-3xl z-50 bg-[#FFFFFF] drop-shadow-2xl">
        <div className="flex flex-col items-center gap-[42px] w-full">
          <span className="text-2xl text-preto font-semibold">Digite o código</span>
          
          <Formik
            initialValues={{ code: "" }}
            validationSchema={Yup.object({
              code: Yup.string().required("Campo obrigatorio"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                router.push('/redefinir-3');
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-[40px] w-full items-center">
              <div className="w-full flex flex-col gap-[10px]">
                <p className="text-preto font-poppins font-normal text-lg leading-7 ">Verifique a caixa de entrada e insira o código de confirmação que enviamos no e-mail cadastrado.</p>
                <InputText
                  label="Insira o código"
                  name="code"
                  type="text"
                  placeholder="Código"
                  style=" border-2 h-14 rounded-xl p-4 border-black w-full text-black "
                />
              </div>

              <div className="w-4/5 flex flex-col gap-[16px]">
                <Button variant="primary" text="Continuar" type="submit"/>
                <Button variant="secundary" text="Voltar" onClick={ () => { router.back() }}/>
              </div>
            </Form>
          </Formik>
          <p className="w-4/5 text-preto text-center font-poppins font-light text-sm">Ao fazer login ou criar uma conta, você concorda com nossos <a href="" className="text-blue-500">Termos e Condições</a> e <a href="" className="text-blue-500">Declaração de Privacidade</a></p>
        </div>
      </div>

    </main>
  );
};

export default RedefinirSenha2;
