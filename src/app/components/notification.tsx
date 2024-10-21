import React, { useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationProps {
    title: string;
    details: string;
    isRead: boolean;
    onToggleRead: () => void;
  }
  
  const Notification: React.FC<NotificationProps> = ({ title, details, isRead, onToggleRead }) => {
    return (
      <div className={`flex items-center justify-between p-3 ${isRead ? "bg-white" : "bg-gray-100"}`} onClick={onToggleRead}>
        <div className="flex items-center gap-2">
          <Image src="/notification.svg" alt="notification" width={20} height={20} />
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-gray-500">{details}</p>
          </div>
        </div>
      </div>
    );
  };

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isRead, setIsRead] = useState(false);

  if (!isOpen) return null;

  const handleToggleReadStatus = () => {
    setIsRead(!isRead); // Inverte o estado das notificações
  };

  return (
    <div className="relative">
      <div className="absolute right-0 mt-16 w-[350px] bg-white shadow-lg rounded-lg z-50">
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <button onClick={onClose} className="text-rosa-4 text-3xl">
            &times;
          </button>
          <h3 className="text-xl font-bold font-poppins text-center w-full">
            Notificações
          </h3>
        </div>

        {/* Lista de Notificações */}

          {/* Notificação 3 */}
        <Notification
            title="Nova reserva: Eduardo Nodari"
            details="Detalhes: Quarto Deluxe, check in em 27/04/24 e check out 02/05/24"
            isRead={isRead}
            onToggleRead={handleToggleReadStatus}
        />

        {/* Botão Marcar como Lida/Não Lida */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-center">
          <button
            onClick={handleToggleReadStatus}
            className="bg-rosa-4 text-white font-medium px-6 py-2 rounded-lg"
          >
            {isRead ? "Marcar como não lida" : "Marcar como lida"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
