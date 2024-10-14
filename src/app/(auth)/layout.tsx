import React from "react";
import HeaderLoginCadastro from "../components/HeaderLoginCadastro";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderLoginCadastro />
      <section>{children}</section>
    </>
  );
};

export default AuthLayout;
