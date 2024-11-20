"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import Button from "@/app/components/Button";
import api from "@/app/services/axios";

const RedefinirSenha1 = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Insira um endereço de email válido").required("Campo obrigatorio"),
  });

  const [isPostBom, setIsPostBom] = useState(false);

  async function patchEsqueciSenha(data: any) {
    try {
      const response = await api.patch("auth/recuperar-senha", data);
      console.log("Email de recuperação enviado com sucesso!", response.data);
      setIsPostBom(true);
      router.push("/redefinir-2"); // Redireciona para a próxima etapa após sucesso
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar email de recuperação", error);
      setIsPostBom(false);
    } finally {
      console.log("Envio de email finalizado");
    }
  }

  const sendForm = async (values: { email: string }) => {
    localStorage.setItem("email", values.email); // Salva no localStorage
    await patchEsqueciSenha(values);
  };


  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">

      <div className="flex flex-col justify-center py-[48px] px-[41px] items-center w-2/5 rounded-t-3xl z-50 bg-[#FFFFFF] drop-shadow-2xl">
        <div className="flex flex-col items-center gap-[42px] w-full">
          <div className="flex flex-col items-center">
            <span className="text-2xl text-[#F95F5B] font-semibold">Esqueceu a senha?</span>
            <span className="text-2xl text-[#F95F5B] font-semibold">Sem problemas!</span>
          </div>
          
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => sendForm(values)}>
            <Form className="flex flex-col gap-[40px] w-full items-center">
              <div className="w-full flex flex-col gap-[10px]">
                <p className="text-preto font-poppins font-normal text-lg leading-7 ">Insira o seu endereço de e-mail para receber um código para redefinir sua senha.</p>
                <InputText
                  label="Seu endereço de e-mail"
                  name="email"
                  type="text"
                  placeholder="Email"
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

export default RedefinirSenha1;
