"use client";

import Button from "@/app/components/button";
import InputField from "@/app/components/InputField";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

export default function SignIn(){
    const router = useRouter();

  const validationSchema = Yup.object({
    code: Yup.string().required('Insira o código'),
  });

  const sendForm = (values: { code: string }) => {
    console.log('Dados enviados:', values);
    router.push("/redefinir-3"); // Redireciona após validação bem-sucedida
  };

    return(
        <div className="flex flex-col items-center gap-[42px]">

            <span className="text-[30px] font-semibold leading-[37.5px] font-poppins text-preto">Digite o código</span>

            <Formik 
                initialValues={{ code: ''}}
                validationSchema={validationSchema}
                onSubmit={(values) => sendForm(values)}>
                    {({ handleSubmit }) => (
                        <Form className="flex flex-col items-center gap-[42px]">
                            <div className=" w-full flex flex-col gap-[16px]">
                                <p className="text-[18px] font-normal leading-[27px] font-poppins text-[#333333]">
                                    Verifique a caixa de entrada e insira o código de confirmação que enviamos no e-mail cadastrado.
                                </p>
                                <div>
                                    <Field name="code" placeholder="Código" tittle="Insira o código" component={InputField} />
                                    <ErrorMessage name="code" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="flex flex-col w-[80%] gap-[16px]">
                                <Button text="Continuar" variant="primary" type="submit"/>
                                <Button href="./redefinir-2" text="Reenviar Código" variant="secundary"/>
                            </div>

                        </Form>
                    )}
            </Formik>
        </div>
        

        
    )
}