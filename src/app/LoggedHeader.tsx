import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const LoggedHeader = () => {
  const pathname = usePathname();
  const username = "Samira";

  const links = [
    { href: "/", label: "Home" },
    { href: "/perfil", label: "Meu Perfil" },
    { href: "/hotel", label: "Meu Hotel" },
    { href: "/menu", label: "Menu" },
  ];

  return (
    <header className="bg-branco flex fixed top-0 left-0 right-0 px-10 py-6 border-b border-cinza-2 font-poppins font-medium justify-between items-center text-preto z-50">
      <Link href={"/"} className="flex items-end gap-4">
        <Image src='/logo.png' height={38} width={38} alt="logo" />
        <h1 className="text-2xl">BonVoyage</h1>
      </Link>
      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xl hover:bg-branco-2 py-2 px-8 rounded-[20px] ${
              pathname === link.href ? `text-rosa-3` : ``
            }`}
            passHref
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center rounded-full border border-cinza-2 w-[60px] h-[60px]">
          <Image
            src='/notifications.png'
            height={29}
            width={25}
            alt="notification"
          />
        </div>
        <p className="text-xl">Olá, {username}</p>
        <Image
          src='/google.png'
          width={60}
          className="rounded-full object-cover" 
          height={60}
          alt="user profile picture"
        />
      </div>
    </header>
  );
};

export default LoggedHeader;