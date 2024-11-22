"use client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/navigation";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
  } from "react";
  
  interface SingUpContextData {
    updateSignUp: (user: User) => void;
    user: User;
  }

  interface User {
    nome: string;
    sobrenome: string;
    nascimento: Date | string;
    email: string;
    senha: string;
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
      nascimento: "",
      email: "",
      senha: "",
      endereco: "",
      cidade: "",
      pais: "",
      celular: "",
    });

    const router = useRouter();
  
    const loadStoragedData = useCallback(async () => {
      const userSignUp = await localStorage.getItem("@BonVoyage:signUp")

      if (userSignUp) {
        setUser(JSON.parse(userSignUp));
      }
    }, []);
  
    const updateSignUp = useCallback(async (user: User) => { //armazena o token e user no localStorage e no useState
      setUser(user);
    }, []);
  
    useEffect(() => {
      loadStoragedData();
    }, []);
  
    return (
      <SingUpContext.Provider
        value={{
          updateSignUp,
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