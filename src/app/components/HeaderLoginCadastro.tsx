import Image from "next/image";
import React from "react";
import Link from "next/link";

const HeaderLoginCadastro = () => {
  return (
    <header className="bg-branco flex fixed w-screen items-center justify-between px-16 font-poppins font-medium text-preto border-b border-cinza-2 h-24 z-30">
      <div>
        <Link href={"./"}>
          <div className="flex items-end gap-4">
            <Image src="/logo.png" height={38} width={38} alt="logo" />

            <span className="text-2xl">BonVoyage</span>
          </div>
        </Link>
      </div>
      <span className="text-xl">Anuncie seu espaço com a gente</span>
    </header>
  );
};

export default HeaderLoginCadastro;
