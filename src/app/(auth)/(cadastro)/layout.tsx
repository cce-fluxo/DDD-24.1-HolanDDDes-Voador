"use client";

import SingUpContextProvider from "@/app/context/signUpContext";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SingUpContextProvider>
        {children}
    </SingUpContextProvider>
  );
};

export default AuthLayout;
