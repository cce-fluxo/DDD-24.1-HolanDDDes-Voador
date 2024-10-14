"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { icons, images } from "../../../constants";

const Header = () => {
  const pathname: string = usePathname();
  const username: string = "Samira";

  const links = [
    { href: "/home", label: "Home" },
    { href: "/perfil", label: "Meu Perfil" },
    { href: "/hotel", label: "Meu Hotel" },
    { href: "/menu", label: "Menu" },
  ];

  return (
    <header className="bg-branco flex items-center justify-between fixed top-0 left-0 right-0 px-16 font-poppins font-medium text-preto border-b border-cinza-2 h-24 z-50">
      <div className="flex items-end gap-4">
        <Image src={icons.logo} height={38} width={38} alt="logo" />
        <span className="text-2xl">BonVoyage</span>
      </div>
      <nav className="flex items-center gap-16">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xl hover:bg-branco-2 py-2 px-8 rounded-[20px] ${
              pathname === link.href ? "text-rosa-4" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center w-[60px] h-[60px] rounded-full border border-cinza-2">
          <Image
            src={icons.notification}
            width={25}
            height={29}
            alt="notification"
          />
        </div>
        <span className="text-xl">Olá, {username}</span>
        <Image
          src={images.stockpfp}
          width={60}
          height={60}
          alt="user profile picture"
        />
      </div>
    </header>
  );
};

export default Header;
