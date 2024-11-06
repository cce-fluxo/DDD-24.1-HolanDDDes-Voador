'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, } from "next/navigation";
import NotificationIcon from "../../public/notification.svg";
import Modal from '../app/components/notification'; // Modal de notificação
import api from "./services/axios";

// Pegando o nome do usuário pro Olá, ...
interface UserData {
  nome: string; // só preciso do nome
}

// Pegando as informações do hotel para checar se o usuário tem ou não tem um hotel
interface HotelData {
  nome: string;
  postado: boolean; // adicionado para checar se o hotel foi postado
}

const LoggedHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // salvando nome do usuário  
  const [username, setUsernameData] = useState<UserData | null>(null)

  async function getUsername() {
    try {
      // recupera o nome do usuário
      const response = await api.get("usuario/idUsuario");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  // mudando o state
  useEffect(() => {
    getUsername().then((data) => {
      if (data) {
        setUsernameData(data as UserData);
      }
    }
  );
  }, []);

  // IF do hotel (JÁ TÁ NO BD? ESTÁ POSTADO? ONDE O USER INICIA?)
  const [hotelData, setHotelData] = useState<HotelData | null>(null);

  // GET Hotel
  async function getHotel() {
    try {	
      // Recupera os dados do hotel
      const response = await api.get("hotels/usuarioId");  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHotel().then((data) => {
      if (data) {
        setHotelData(data as HotelData);
      }
    }
  );
  }, []);

  const links = [
    { href: "/home", label: "Home" },
    { href: "/perfil", label: "Meu Perfil" }
  ];

  if (hotelData && hotelData.nome === null) {
    links.push({ href: "/hotel", label: "Meu Hotel" });
  } else if (hotelData && hotelData.postado === true) {
    links.push({ href: "/hotel/adicionarinfo/postar/confirmar/postado", label: "Meu Hotel" })
  } else {
    links.push({ href: "/hotel/adicionarinfo/postar", label: "Meu Hotel" });
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-branco flex fixed top-0 left-0 right-0 px-10 py-6 border-b border-cinza-2 font-poppins font-medium justify-between items-center text-preto z-50">
      <Link href={"/"} className="flex items-end gap-4">
        <Image src='/logo.png' height={38} width={38} alt="logo" />
        <h1 className="text-2xl">BonVoyage</h1>
      </Link>
      <nav className="flex items-center gap-6">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`text-xl hover:bg-branco-2 py-2 px-8 rounded-[20px] ${
              pathname === link.href ? `text-rosa-3` : ``
            }`}
            passHref
          >
            {link.label}
          </Link>
        ))}

        {/* Dropdown menu */}
        <div className="relative">
          <button onClick={toggleDropdown} className="text-xl hover:bg-branco-2 py-2 px-8 rounded-[20px]">
            Menu
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-branco rounded-md shadow-lg">
              <Link href="/menu/gerenciamento" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Gerenciamento de Ganhos
              </Link>
              <Link href="/menu/avaliacoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Avaliações e Visualizações
              </Link>
              <Link href="/menu/perguntas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Central de Ajuda
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => alert("Logout")}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="flex relative items-center justify-center gap-4">
        <button
          onClick={openModal}
          className="relative flex justify-center items-center rounded-full border border-cinza-2 w-[60px] h-[60px] hover:bg-laranja-1 text-preto hover:text-branco"
        >
          <NotificationIcon
            className="transition-colors"
          />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal} />

        <p className="text-xl">Olá, {username?.nome}</p>

        {/* Botão de imagem de perfil */}
        <div className="relative">
            <Image
              src='/google.png'
              width={60}
              height={60}
              className="rounded-full object-cover"
              alt="user profile picture"
            />
        </div>
      </div>
    </header>
  );
};

export default LoggedHeader;
