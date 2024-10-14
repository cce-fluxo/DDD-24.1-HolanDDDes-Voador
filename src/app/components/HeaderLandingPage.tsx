"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { icons } from "../../../constants";
import Image from "next/image";

const HeaderLandingPage = () => {
  const router = useRouter();
  return (
    <header className="bg-branco flex items-center justify-between fixed top-0 left-0 right-0 px-16 font-poppins font-medium text-preto border-b border-cinza-2 h-24 z-50">
      <div className="flex items-end gap-4">
        <Image src={icons.logo} height={38} width={38} alt="logo" />
        <span className="text-2xl">BonVoyage</span>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-xl">Já é um parceiro?</span>
        <CustomButton
          text="Login"
          handleClick={() => router.push("/login")}
          classnameButton="w-[104px] h-[55px] bg-rosa-4 rounded-lg"
          classnameText="text-xl text-branco "
        />
      </div>
    </header>
  );
};

export default HeaderLandingPage;
