"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import Link from "next/link";
import api from "@/app/services/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  // DELETE hotel
  async function deleteHotel() {
    try {
      const response = await api.delete('hotels');
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    deleteHotel()
    onConfirm()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="flex flex-col gap-8 items-center bg-branco rounded-3xl font-poppins px-6 py-7 w-[740px]">
      <Image
        src={"/popup_excluir_anuncio.png"}
        height={344}
        width={339}
        alt="imagem alerta"
      />
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-5 items-center">
          <span className="text-preto text-2xl font-medium text-center">
            Tem certeza?
          </span>
          <span className="text-preto text-xl font-medium text-center">
          Ao confirmar você estará exlcuindo seu anúncio permanentemente, e deverá refazer todos os passos anteriores antes de criar um novo, tem certeza que deseja continuar?
          </span>
        </div>
        <div className="flex gap-8 w-full">
            <div className="w-1/2">
              <CustomButton
                text="Não"
                handleClick={handleConfirm} 
                classnameButton="h-12 w-full bg-transparent border-2 border-rosa-4 rounded-lg text-rosa-4 hover:bg-rosa-4 hover:text-branco"
                classnameText="text-2xl"
              />
            </div>
            <div className="w-1/2">
              <Link href='/hotel'>
                <div className="w-full">
                  <CustomButton
                    text="Sim"
                    handleClick={onConfirm}
                    classnameButton="h-12 w-full bg-rosa-4 rounded-lg hover:bg-rosa-3"
                    classnameText="text-branco text-2xl"
                  />
                </div>
              </Link>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Modal;
