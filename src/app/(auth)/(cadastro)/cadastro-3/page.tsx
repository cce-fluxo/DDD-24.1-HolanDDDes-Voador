"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import arrowLeft from "../../../../../public/arrow_left.png";
import { useSignUp } from "@/app/context/signUpContext";

const Cadastro3 = () => {
  const iconSize: number = 24;
  const router = useRouter();
  const { user,  updateUser, signUp } = useSignUp();
  return (
    <main className="flex justify-evenly h-screen items-end font-poppins">
      <div className="h-full flex place-self-center text-center items-center w-2/5">
        <span className="text-rosa-4 font-semibold text-5xl">
          Ficou mais fácil de anunciar o seu lugar.
        </span>
      </div>

      <div className="flex flex-col justify-center pt-5 pb-3 pr-5 pl-5 z-50 items-center w-2/5 rounded-t-3xl bg-branco shadow-custom">
        <div className="flex flex-col p-5 gap-6 shadow-lg rounded-lg w-full">
          <div className="w-full">
            <div className="flex gap-4 justify-start">
              <button onClick={() => router.back()}>
                <Image
                  src={arrowLeft}
                  width={iconSize / 2}
                  height={iconSize / 2}
                  alt="seta para esquerda"
                />
              </button>
              <span className="text-2xl text-preto font-semibold">
                Onde fica sua acomodação?
              </span>
            </div>
          </div>

          <Formik
            className="flex flex-col gap-2"
            initialValues={{
              endereco: "",
              cidade: "",
              regiao: "",
              telefone: "",
            }}
            validationSchema={Yup.object({
              endereco: Yup.string().required("Campo obrigatorio"),
              cidade: Yup.string().required("Campo obrigatorio"),
              regiao: Yup.string().required("Campo obrigatorio"),
              telefone: Yup.string().required("Campo obrigatorio").matches(
                /^\d{2}\s\d{4,5}-\d{4}$/,
                "Telefone inválido. Use o formato XX XXXXX-XXXX ou XX XXXX-XXXX."
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                user.endereco = values.endereco;
                user.cidade = values.cidade;
                user.pais = values.regiao;
                user.celular = values.telefone;
                signUp(user);
                setSubmitting(false);
                router.push("/login");
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-2 w-full">
              <InputText
                label="Endereço"
                name="endereco"
                type="text"
                placeholder="Insira seu endereço"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Cidade"
                name="cidade"
                type="text"
                placeholder="Insira sua cidade"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="País/região"
                name="regiao"
                type="text"
                placeholder="Insira  sua região"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />
              <InputText
                label="Número de celular"
                name="telefone"
                type="tel"
                placeholder="Insira seu telefone de contato"
                style=" border-2 h-14 rounded-xl p-4 border-black "
              />

              <button className="w-4/5 h-12 mt-7 mb-5 bg-rosa-4 rounded-lg place-self-center">
                <h1 className="text-branco text-2xl"> Continuar</h1>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Cadastro3;
