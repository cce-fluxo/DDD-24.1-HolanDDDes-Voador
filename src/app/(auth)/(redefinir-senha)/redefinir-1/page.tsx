"use client";

import Button from "@/app/components/button";
import InputField from '@/app/components/InputField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

export default function SignIn(){
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      });

    const sendForm = (values: { email: string}) => {
    console.log('Dados enviados:', values);
    router.push('/redefinir-2'); // Redireciona após validação bem-sucedida
    };
    
    return(
        <div className="flex flex-col items-center gap-[42px]">
            <div className="flex flex-col items-center">
                <span className="text-[30px] font-semibold leading-[37.5px] font-poppins text-[#3ea59f]">Esqueceu a sua senha?</span>
                <span className="text-[30px] font-semibold leading-[37.5px] font-poppins text-[#3ea59f]">Sem problemas!</span>
            </div>

            <Formik 
            initialValues={{ email: ''}}
            validationSchema={validationSchema}
            onSubmit={(values) => sendForm(values)}>
                {({ handleSubmit }) => (
                    <Form className="flex flex-col items-center gap-[42px]">
                        <div className="w-full flex flex-col gap-[16px]">
                            <p className="text-[18px] font-normal leading-[27px] font-poppins text-[#333333]">
                                Insira o seu endereço de e-mail para receber um código para redefinir sua senha.
                            </p>
                            <div>
                                <Field name="email" placeholder="E-mail" tittle="Seu endereço de e-mail" component={InputField} />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            
                        </div>

                        <div className="flex flex-col w-[80%] gap-[16px]">
                            <Button text="Enviar Código" variant="primary" type="submit"/>
                            <Button href="./" text="Voltar" variant="secundary"/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        

        
    )
}