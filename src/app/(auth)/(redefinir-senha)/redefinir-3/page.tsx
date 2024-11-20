"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import Button from "@/app/components/Button";
import api from "@/app/services/axios";

const RedefinirSenha3 = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    novaSenha: Yup.string().required("Campo obrigatório"),
    confirmarSenha: Yup.string()
      .oneOf([Yup.ref("novaSenha"), undefined], "As senhas precisam ser iguais")
      .required("Campo obrigatório"),
  });

  const [token, setToken] = useState<string | null>(null);

  const [isPostBom, setIsPostBom] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Recupera o token salvo no localStorage
    } else {
      console.error("Token não encontrado. Redirecionando...");
      router.push("/"); // Redireciona para a página inicial ou de login se o token não estiver disponível
    }
  }, [router]);

  const alterarSenha = async (values: {
    novaSenha: string;
    confirmarSenha: string;
  }) => {
    try {
      const response = await api.patch(`auth/recuperar-senha/validar-token/${token}`, {
        hash_senha: values.novaSenha,
      });

      console.log("Senha alterada com sucesso.", response.data);
      setIsPostBom(true);
      router.push("/login");
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
    }
  };

  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">
      <div className="flex flex-col justify-center py-[48px] px-[41px] items-center w-2/5 rounded-t-3xl z-50 bg-[#FFFFFF] drop-shadow-2xl">
        <div className="flex flex-col items-center gap-[28px] w-full">
          <span className="text-2xl text-preto font-semibold">Nova senha</span>

          <Formik
            initialValues={{ novaSenha: "", confirmarSenha: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => alterarSenha(values)}
          >
            <Form className="flex flex-col gap-[20px] w-full items-center">
              <div className="w-full flex flex-col gap-[10px]">
                <p className="text-preto font-poppins font-normal text-lg leading-7 ">
                  Crie uma nova senha para a sua conta.
                </p>
                <InputText
                  label="Nova senha"
                  name="novaSenha"
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
                <p className="text-preto font-poppins font-medium text-base">
                  A senha deve ter, pelo menos:
                </p>
                <div className="flex gap-4">
                  <Image
                    src={"/right-arrow.svg"}
                    alt={"icone"}
                    width={5}
                    height={10}
                  />
                  <p className="text-preto font-poppins font-light text-base">
                    10 caracteres
                  </p>
                </div>
                <div className="flex gap-4">
                  <Image
                    src={"/right-arrow.svg"}
                    alt={"icone"}
                    width={5}
                    height={10}
                  />
                  <p className="text-preto font-poppins font-light text-base">
                    {" "}
                    1 letra maiúscula
                  </p>
                </div>
              </div>

              <div className="w-4/5 flex flex-col gap-[16px]">
                <Button variant="primary" text="Continuar" type="submit" />
              </div>
            </Form>
          </Formik>
          <p className="w-4/5 text-preto text-center font-poppins font-light text-sm">
            Ao fazer login ou criar uma conta, você concorda com nossos{" "}
            <a href="" className="text-blue-500">
              Termos e Condições
            </a>{" "}
            e{" "}
            <a href="" className="text-blue-500">
              Declaração de Privacidade
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RedefinirSenha3;
