"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import Button from "@/app/components/Button";

const RedefinirSenha3 = () => {
  const router = useRouter();
  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">

      <div className="flex flex-col justify-center py-[48px] px-[41px] items-center w-2/5 rounded-t-3xl z-50 bg-[#FFFFFF] drop-shadow-2xl">
        <div className="flex flex-col items-center gap-[28px] w-full">
          <span className="text-2xl text-preto font-semibold">Nova senha</span>
          
          <Formik
            initialValues={{ senha: "", confirmarSenha: "" }}
            validationSchema={Yup.object({
              senha: Yup.string().required("Campo obrigatorio"),
              confirmarSenha: Yup.string().oneOf([Yup.ref('senha'), undefined], 'As senhas precisam ser iguais').required('Campo obrigatório'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                router.push('/home');
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-[20px] w-full items-center">
              <div className="w-full flex flex-col gap-[10px]">
                <p className="text-preto font-poppins font-normal text-lg leading-7 ">Crie uma nova senha para a sua conta.</p>
                <InputText
                  label="Nova senha"
                  name="senha"
                  type="text"
                  placeholder="Crie uma senha forte"
                  style=" border-2 h-14 rounded-xl p-4 border-black w-full text-black "
                />
                <InputText
                  label="Confirmar senha"
                  name="confirmarSenha"
                  type="text"
                  placeholder="Crie uma senha forte"
                  style=" border-2 h-14 rounded-xl p-4 border-black w-full text-black "
                />
              </div>

              <div className="w-full flex flex-col items-start">
                <p className="text-preto font-poppins font-medium text-base">A senha deve ter, pelo menos:</p>
                <div className="flex gap-4">
                  <Image src={"/right-arrow.svg"} alt={"icone"} width={5} height={10}/>
                  <p className="text-preto font-poppins font-light text-base">10 caracteres</p>
                </div>
                <div className="flex gap-4">
                  <Image src={"/right-arrow.svg"} alt={"icone"} width={5} height={10}/>
                  <p className="text-preto font-poppins font-light text-base"> 1 letra maiúscula</p>
                </div>
              </div>

              <div className="w-4/5 flex flex-col gap-[16px]">
                <Button variant="primary" text="Continuar" type="submit"/>
              </div>
            </Form>
          </Formik>
          <p className="w-4/5 text-preto text-center font-poppins font-light text-sm">Ao fazer login ou criar uma conta, você concorda com nossos <a href="" className="text-blue-500">Termos e Condições</a> e <a href="" className="text-blue-500">Declaração de Privacidade</a></p>
        </div>
      </div>

    </main>
  );
};

export default RedefinirSenha3;
