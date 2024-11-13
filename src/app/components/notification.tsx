import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "../services/axios";
import { useAuth } from "../context/authContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationProps {
    title: string;
    details: string;
    isRead: boolean;
  }

interface NotificationData {
  titulo: string;
  mensagem?: string;
  usuarioId: number;
  leitura: boolean;
  data_criacao?: Date;
}
  

  const Notification: React.FC<NotificationProps> = ({ title, details, isRead }) => {
    return (
      <div className={`flex items-center justify-between p-3 ${isRead ? "bg-white" : "bg-gray-100"}`} onClick={() => isRead = !isRead}>
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
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [readAll, setReadAll] = useState(false);
  const {user} = useAuth();
  const userID = user.id;

  useEffect(() => { //quando o isOpen mudar, busca novas notificações
    const fetchNotifications = async () => {
      const data = await getNotifications(userID);
      if (data){
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, [isOpen]);

  async function getNotifications(userID?: string): Promise<NotificationData[]  | null> {
    if (userID){
      try{
        const response = await api.get<NotificationData[]>(`notificacao/${userID}`);
        return response.data;
      } catch (error){
        console.log("Erro ao buscar notificações: ", error);
        throw error;
      }
    } else {
      return null
    }
  }

  if (!isOpen) return null;

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

        {notifications.map((notification, index) => (
          <Notification
            key={index}
            title={notification.titulo}
            details={notification.mensagem || ''}
            isRead={readAll? readAll : notification.leitura}
          />
        ))}
        <Notification
            title="Nova reserva: Eduardo Nodari"
            details="Detalhes: Quarto Deluxe, check in em 27/04/24 e check out 02/05/24"
            isRead={readAll? readAll : false}
        />

        {/* Botão Marcar como Lida/Não Lida */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-center">
          <button
            onClick={(readAll) => setReadAll(!readAll)} //Marca todas as notificações como não lidas ou lidas.
            className="bg-rosa-4 text-white font-medium px-6 py-2 rounded-lg"
          >
            {readAll ? "Marcar como não lida" : "Marcar como lida"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
