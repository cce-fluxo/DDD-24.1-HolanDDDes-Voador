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
  id: number;
  titulo: string;
  mensagem?: string;
  usuarioId: number;
  leitura: boolean;
  data_criacao?: Date;
}

const Notification: React.FC<NotificationProps> = ({ title, details, isRead }) => {
  return (
    <div className={`flex items-center justify-between p-3 ${isRead ? "bg-white" : "bg-gray-100"}`}>
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
  const { user } = useAuth();
  const userID = user.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications(userID);

      if (Array.isArray(data)) {
        setNotifications(data);
      } else if (data && typeof data === 'object') {
        setNotifications([data]);
      } else {
        console.error("A resposta da API não é válida:", data);
        setNotifications([]);
      }
    };

    if (isOpen) fetchNotifications();
  }, [isOpen, userID]);

  async function getNotifications(userID?: string): Promise<NotificationData[] | null> {
    if (userID) {
      try {
        const response = await api.get<NotificationData[]>(`notificacao/${userID}`);
        console.log("resposta do request:", response.data)
        return response.data;
      } catch (error) {
        console.log("Erro ao buscar notificações: ", error);
        throw error;
      }
    } else {
      return null;
    }
  }

  async function patchNotification(notification: NotificationData){
    if (userID) {
      try {
        const response = await api.patch(`notificacao/${notification.id}`, {
          titulo: notification.titulo,
          mensagem: notification.mensagem,
          usuarioId: notification.usuarioId,
          leitura: notification.leitura,
          data_criacao: notification.data_criacao,
        })
      } catch (error) {
        console.log("Erro ao modificar notificações: ", error);
        throw error;
      }
    } else {
      return null;
    }
  }

  useEffect(() => {
    function closeModal(){
      notifications.map(notification => patchNotification(notification))
    };
    if (!isOpen) closeModal();
  }, [isOpen]);


  const handleMarkAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        leitura: !notification.leitura,
      }))
    );
  };

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
            isRead={notification.leitura}
          />
        ))}

        {/* Botão Marcar como Lida/Não Lida */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-center">
          <button
            onClick={handleMarkAsRead}
            className="bg-rosa-4 text-white font-medium px-6 py-2 rounded-lg"
          >
            Marcar como {notifications.every((notif) => notif.leitura) ? "não lida" : "lida"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
