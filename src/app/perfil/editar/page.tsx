'use client'
import Image from "next/image";
import Diamante from "../../../../public/diamante.png"
import Ranking from "../../../../public/ranking.png"
import Coracao from "../../../../public/coracao.png"
import Medalha from "../../../../public/medalha.png"
import Estrela from "../../../../public/estrela.png"
import Mala from "../../../../public/mala.png"
import Foto1 from "../../../../public/Rectangle 160.png"
import Foto2 from "../../../../public/Rectangle 161.png"
import Foto3 from "../../../../public/Rectangle 162.png"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "@/app/components/InputText";
import LoggedHeader from "@/app/LoggedHeader";
import Interesse from "../../components/interesse";
import api from "../../services/axios";
import React, { useEffect, useState } from "react";

// Pegando o nome do usuário pro Olá, ...
interface UserData {
    user: {
      nome: string; // só preciso do nome
      email: string
      telefone: string
      hash_senha: string;
    };
    fotoUser: {
      url_foto: string;
    }[];
}

export default function Editar(){
    const [username, setUsernameData] = useState<UserData | null>(null)

    async function getUsername() {
        try {
          // recupera o usuário
          const response = await api.get("usuario/idFoto");
          return response.data;
        } catch (error) {
          console.log(error);
        }
      }
    
    //async function getProprietario(){
       // try{
        // recupera o proprietário
        //const response =  await api.get("proprietario/")
        //}
    //}

    function foto(a:number){
        if(username?.fotoUser[a]?.url_foto){
            return(
                <Image src={username?.fotoUser[a]?.url_foto} width={60}height={60} className="h-full w-full" alt=""></Image>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

        // mudando o state
    useEffect(() => {
        getUsername().then((data) => {
        if (data) {
            setUsernameData(data as UserData);
            }
            setIsLoading(false);
        }
         );
    }, []);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (isLoading) {
        return (
          <header className="bg-branco flex fixed top-0 left-0 right-0 px-10 py-6 border-b border-cinza-2 font-poppins font-medium justify-center items-center text-preto z-50">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-rosa-4 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <h1 className="text-rosa-4 font-semibold">Carregando...</h1>
            </div>
          </header>
        );
    }

    return(
        <div>
            <LoggedHeader />
            <div className="mt-10 flex w-screen gap-24 h-screen overflow-x-hidden pr-10">
                <div className=" w-[342px] h-full mt-20 ml-[10vw]">
                    <div className=" overflow-clip w-[342px] h-[342px] mb-[14px]">
                        {foto(0)}
                    </div>
                    <div className=" flex w-full gap-[22px] justify-between">
                        <div className=" w-full">
                            {foto(1)}
                        </div>
                        <div className=" w-full">
                            {foto(2)}
                        </div>

                    </div>

                    <button className=" flex align-middle mt-5 items-center gap-5 justify-center w-full h-[56px] bg-rosa-3 rounded-lg hover:bg-red-400">
                        <p className="font-readex-pro text-branco font-normal leading-10 text-[24px]">Editar fotos</p>
                    </button>
                </div>

                <div className=" w-full h-full mt-20 overflow-y-auto pb-20">
                    <div className="">
                        <p className=" text-[44px] font-bold text-preto">Nome</p>
                        <div className=" mt-[16px] ">
                            <div className=" flex items-center gap-[10px]">
                                <Image src={Estrela} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">Membro antigo</p>
                            </div>

                            <div className=" flex items-center gap-[10px]">
                                <Image src={Mala} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">600+ hospedagens realizadas pelo aplicativo</p>
                            </div>

                            <div className=" flex items-center gap-[10px]">
                                <Image src={Coracao} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">Seu hotel está entre os mais populares da região</p>
                            </div>

                            <div className=" flex items-center gap-[10px]">
                                <Image src={Ranking} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">Top 10 melhores destinos na categoria praia</p>
                            </div>

                            <div className=" flex items-center gap-[10px]">
                                <Image src={Medalha} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">Você conquistou o título de Superhost</p>
                            </div>

                            <div className=" flex items-center gap-[10px]">
                                <Image src={Diamante} className="h-[20px] w-[20px]" alt=""></Image>
                                <p className=" text-[20px] text-preto">Seu hotel está na categoria Diamante</p>
                            </div>
                        </div>
                    </div>

                    <div className=" w-full mb-[64px] mt-[64px]">
                        <div className=" w-full h-[110px] flex justify-around">
                            <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                                <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                                    <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
                                </div>
                            </div>
                            <div className="bg-branco-2 w-[348px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] items-center justify-center">
                                <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                                    <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                                    <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" mb-[64px]">

                        <div className="grid grid-cols-3 gap-5">
                            <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                                <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                                <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                            </div>
                        </div>

                        <div className=" flex w-full justify-center mt-5">
                            <button className=" flex align-middle mt-5 items-center gap-5 justify-center w-[239px] h-[56px] bg-rosa-3 rounded-lg hover:bg-red-400">
                                <p className="font-readex-pro text-branco font-normal leading-10 text-[24px]">Editar interesses</p>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h1 className=" text-preto font-bold text-[35px] mb-5 ">Meus dados:</h1>
                        <p className="font-readex-pro text-cinza-4 font-normal text-[20px] mb-3 ">Sobre</p>
                        <p className="font-readex-pro text-cinza-3 font-normal mb-10"> bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
                    </div>
                    <Formik
                        className=""
                        initialValues={{ nome: "", email: "", telefone: "" }}
                        validationSchema={Yup.object({
                        nome: Yup.string(),
                        email: Yup.string(),
                        telefone: Yup.string()
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                        }}
                        

                    >
                        <Form className=" flex-row pb-10 ">
                            <InputText
                                label="nome"
                                name="nome"
                                type="text"
                                placeholder="Nome: escreva aqui o seu nome"
                                style=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl "
                            />
                            <InputText
                                label="email"
                                name="email"
                                type="email"
                                placeholder="Email: escreva aqui o seu email"
                                style=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl "
                            />
                            <InputText
                                label="telefone"
                                name="telefone"
                                type="text"
                                placeholder="Telefone: escreva aqui o seu telefone"
                                style=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl "
                            />

                            <div className=" w-full flex justify-center">
                                <button className="w-4/5 h-12 mt-3 bg-rosa-4 rounded-lg place-self-center">
                                    <h1 className="text-branco text-2xl"> Continuar</h1>
                                </button>
                            </div>
                            
                        </Form>

                    </Formik>

                    <div className=" w-full h-10 flex border-cinza-1 justify-around border-b-2 mb-10">
                        <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Senha: </p>
                        <button >
                            <p className=" text-[20px] text-rosa-4">Editar senha</p>
                        </button>
                    </div>

                    <div>
                        <h1 className=" text-preto font-bold text-[35px] mb-5 ">Pagamento:</h1>
                    </div>

                    <input type="text" className=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl" placeholder="Código do banco"/>

                    <input type="text" className=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl" placeholder="Agência bancária"/>

                    <input type="text" className=" pl-3 h-10 mb-10 border-preto border-2 w-full rounded-2xl" placeholder="Conta para débito"/>

                    <div className="flex gap-5 mb-10 w-full justify-around">
                        <button className=" flex align-middle items-center gap-5 justify-center w-[300px] h-[56px] bg-rosa-3 rounded-lg hover:bg-red-400">
                            <p className="font-readex-pro text-branco font-normal leading-10 text-[24px]">Confirmar</p>
                        </button>

                        <button  className=" flex align-middle items-center gap-5 justify-center w-[300px] h-[56px] border-rosa-3 border-2 rounded-lg text-rosa-3 hover:bg-laranja hover:border-0 hover:text-branco">
                            <p className="font-readex-pro font-normal leading-10 text-[24px]">Cancelar</p>
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
        
    )
}