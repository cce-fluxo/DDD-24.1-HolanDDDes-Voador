"use client";

import AuthPanelFrame from "@/app/components/AuthPanelFrame";
import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { icons } from "@/../../constants";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputField";

const Cadastro3 = () => {
  const iconSize: number = 24;
  const router = useRouter();
  return (
    <main className="flex justify-evenly items-end h-dvh font-poppins">
      <div className="h-full flex justify-center items-center w-2/5">
        <span className="text-rosa-4 font-semibold text-5xl">
          Ficou mais fácil de anunciar o seu lugar.
        </span>
      </div>

      <AuthPanelFrame>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full">
            <div className="flex gap-4 justify-start">
              <button onClick={() => router.back()}>
                <Image
                  src={icons.arrowLeft}
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
              telefone: Yup.string().required("Campo obrigatorio"),
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
                label="Endereço"
                name="endereco"
                type="text"
                placeholder="Insira seu endereço"
              />
              <InputText
                label="Cidade"
                name="cidade"
                type="text"
                placeholder="Insira sua cidade"
              />
              <InputText
                label="País/região"
                name="pais/regiao"
                type="text"
                placeholder="Insira  sua região"
              />
              <InputText
                label="Número de celular"
                name="telefone"
                type="tel"
                placeholder="Insira seu telefone de contato"
              />
            </Form>
          </Formik>

          <CustomButton
            text="Concluir"
            handleClick={() => router.push("/home")}
            classnameButton="w-4/5 h-12 bg-rosa-4 rounded-lg"
            classnameText="text-branco text-2xl"
          ></CustomButton>
        </div>
      </AuthPanelFrame>
    </main>
  );
};

export default Cadastro3;
