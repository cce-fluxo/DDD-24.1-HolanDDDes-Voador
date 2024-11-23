"use client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/navigation";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
  } from "react";
import api from "../services/axios";
  
  interface SingUpContextData {
    updateUser: (user: User) => void;
    signUp: (user: User) => void;
    user: User;
  }

  interface User {
    nome: string;
    sobrenome: string;
    dataNascimento: Date | string;
    email: string;
    hash_senha: string;
    endereco: string;
    cidade: string;
    pais: string;
    celular: string;
  }
  
  const SingUpContext = createContext<SingUpContextData>({} as SingUpContextData);
  export default function SingUpContextProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User>({
      nome: "",
      sobrenome: "",
      dataNascimento: "",
      email: "",
      hash_senha: "",
      endereco: "",
      cidade: "",
      pais: "",
      celular: "",
    });

    const router = useRouter();
  
    const updateUser = useCallback(async (user: User) => { //armazena o token e user no localStorage e no useState
      setUser(user);
    }, []);

    async function signUp(user: User){
      try{
        const response = await api.post(
          'usuario', //fazendo a requisição para essa rota
          {
            nome: user.nome,
            sobrenome: user.sobrenome,
            hash_senha: user.hash_senha,
            email: user.email,
            telefone: user.celular,
            data_nascimento: user.dataNascimento,
            role: "proprietario"


          }, //enviando esses dados no corpo da requisição
        );
        alert("Usuário cadastrado com sucesso! Realize o login.");
        setUser({
          nome: "",
          sobrenome: "",
          dataNascimento: "",
          email: "",
          hash_senha: "",
          endereco: "",
          cidade: "",
          pais: "",
          celular: "",
        })
        router.push('/login'); // redirecionando o usuario para a home
      } catch (error){
        alert("Erro ao realizar cadastro. Tente novamente.")

      }
    }
  
    return (
      <SingUpContext.Provider
        value={{
          updateUser,
          signUp,
          user,
        }}
      >
        {children}
      </SingUpContext.Provider>
    );
  }

  export function useSignUp() {
    const context = useContext(SingUpContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }                     