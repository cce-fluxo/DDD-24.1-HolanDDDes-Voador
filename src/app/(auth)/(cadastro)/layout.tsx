"use client";

import React from "react";
import HeaderLoginCadastro from "@/app/components/HeaderLoginCadastro";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderLoginCadastro />
      <section>{children}</section>
    </>
  );
};

export default AuthLayout;