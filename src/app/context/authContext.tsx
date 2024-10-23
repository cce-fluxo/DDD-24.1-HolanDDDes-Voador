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
      const [token, user] = await localStorage.multiGet([
        "@BonVoyage:token",
        "@BonVoyage:user",
      ]);
      if (token[1] && user[1]) {
        setToken(token[1]);
        setUser(JSON.parse(user[1]));
      }
    }, []);
  
    const signIn = useCallback(async (token: string, user: object) => { //armazena o token e user no localStorage e no useState
      console.log("teste SignIn - armazenar token e user");
      await localStorage.setItem("@BonVoyage:token", token);
      console.log("Token armazenado no storage");
      await localStorage.setItem("@BonVoyage:user", JSON.stringify(user));
      console.log("Usuário armazenado no storage");
      

      setToken(token);
      setUser(user);
    }, []);
  
    const signOut = useCallback(async () => { //remove token e user do localStorage e remove token do useState
      await localStorage.multiRemove(["@BonVoyage:token", "@BonVoyage:user"]);
      setToken("");
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