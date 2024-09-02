import Image from "next/image";
import Link from "next/link";
import React from "react";
const LoggedHeader = () => {

  return (
    <header className="bg-branco flex fixed top-0 left-0 right-0 px-10 py-6 border-b border-cinza-2 font-poppins font-medium justify-between items-center text-preto z-50">
      <Link href={"/"} className="flex items-end gap-4">
        <Image src='/logo.png' height={38} width={38} alt="logo" />
        <h1 className="text-2xl">BonVoyage</h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center rounded-full border border-cinza-2 w-[60px] h-[60px]">
          <Image
            src='/notifications.png'
            height={29}
            width={25}
            alt="notification"
          />
        </div>
        <p className="text-xl">Já é um parceiro?</p>
        <button className="w-[104px] h-[55px] rounded-[10px] gap-[10px] justify-center items-center">
          <h2 className="font-work_sans font-bold text-[20px] leading-[23.46px] ">Login</h2>
        </button>
      </div>
    </header>
  );
};

export default LoggedHeader;