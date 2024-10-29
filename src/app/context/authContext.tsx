"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
  } from "react";
  
  interface AuthContextData {
    signIn: any;
    signOut: any;
    token: string;
    user: object;
  }
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  export default function AuthContextProvider({ children }: {children: ReactNode}) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
  
    const loadStoragedData = useCallback(async () => {

      const token = await localStorage.getItem("@BonVoyage:token")
      const user = await localStorage.getItem("@BonVoyage:user")

      if (token && user) {
        setToken(token[1]);
        setUser(JSON.parse(user[1]));
      }
    }, []);
  
    const signIn = useCallback(async (token: string) => { //armazena o token e user no localStorage e no useState
      console.log("teste SignIn - armazenar token");
      await localStorage.setItem("@BonVoyage:token", token);
      console.log("Token armazenado no storage");

      setToken(token);
    }, []);
  
    const signOut = useCallback(async () => { //remove token e user do localStorage e remove token do useState
      await localStorage.multiRemove(["@BonVoyage:token", "@BonVoyage:user"]);
      setToken("");
      setUser({});
    }, []);
  
    useEffect(() => {
      loadStoragedData();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          signIn,
          signOut,
          token,
          user,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }