"use client";

import { useEffect, useState } from "react";

import LoggedHeader from "@/app/LoggedHeader";
import BoxCheckin from "../../components/BoxCheckin";
import BoxCheckout from "../../components/BoxCheckout";
import BoxHospede from "../../components/BoxHospede";
import BoxReserva from "../../components/BoxReserva";
import BoxQuarto from "../../components/BoxQuarto";
import api from "@/app/services/axios";

interface quartosReservadosMes {
  Reserva: {
    id: number;
    data_check_in: string;
    data_check_out: string;
    quantidade_pessoas: number;
    status: string;
    aceita_pet: boolean;
    clienteId: number;
    acomodacaoId: number;
    cupomId: number | null;
    cliente: { usuario: { nome: string; sobrenome: string } };
  }[];
  id: number;
  data_check_in: string;
  titulo: string;
  data_check_out: string;
  quantidade_pessoas: number;
  status: string;
  aceita_pet: boolean;
  clienteId: number;
  acomodacaoId: number;
  cupomId: number | null;
}

interface quartosLivres {
  FotoAcomodacao: {
    url_foto: string;
  };
  id: number;
  titulo: string;
  descricao: string;
  banheiros: number;
  quartos: number;
  camas: number;
  valor_diaria: number;
  valor_pet: number;
  complemento: string;
  tipo_acomodacaoId: number;
  hotelId: number;
  nota: number;
}

interface checkInHoje {
  id: number;
  titulo: string;
  descricao: string;
  banheiros: number;
  quartos: number;
  camas: number;
  valor_diaria: number;
  valor_pet: number;
  complemento: string;
  tipo_acomodacaoId: number;
  hotelId: number;
  nota: number;
  Reserva: {
    id: number;
    data_check_in: string;
    data_check_out: string;
    quantidade_pessoas: number;
    status: string;
    aceita_pet: boolean;
    clienteId: number;
    acomodacaoId: number;
    cupomId: number | null;
    cliente: {
      id: number;
      usuarioId: number;
      usuario: { 
        nome: string; 
        telefone: string | null 
        FotoUsuario: {
          url_foto: string | null 
        }[];
      };
    };
  }[];
}

interface checkOutHoje {
  id: number;
  titulo: string;
  descricao: string;
  banheiros: number;
  quartos: number;
  camas: number;
  valor_diaria: number;
  valor_pet: number;
  complemento: string;
  tipo_acomodacaoId: number;
  hotelId: number;
  nota: number;
  Reserva: {
    id: number;
    data_check_in: string;
    data_check_out: string;
    quantidade_pessoas: number;
    status: string;
    aceita_pet: boolean;
    clienteId: number;
    acomodacaoId: number;
    cupomId: number | null;
    cliente: {
      id: number;
      usuarioId: number;
      usuario: { 
        nome: string; 
        telefone: string | null 
        FotoUsuario: {
          url_foto: string | null 
        }[];
      };
    };
  }[];
}

interface clientesNoMomento {
  id: number;
  usuarioId: number;
  Reserva: {
    id: number;
    data_check_in: string;
    data_check_out: string;
    quantidade_pessoas: number;
    status: string;
    aceita_pet: boolean;
    clienteId: number;
    acomodacaoId: number;
    cupomId: number | null;
    acomodacao: {
      titulo: string;
      FotoAcomodacao: {
        url_foto: string;
      }[];
    }
  }[];
  usuario: {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    hash_senha: string;
    telefone: string | null;
    token_resetar_senha: string | null;
    data_nascimento: string | null;
    vip: boolean;
    role: string;
    FotoUsuario: {
      url_foto: string;
    }[]
  };
}

interface HotelData {
  checkInHoje: checkInHoje[];
  checkOutHoje: checkOutHoje[];
  quartosReservadosMes: quartosReservadosMes[];
  quartosLivres: quartosLivres[];
  clientesNoMomento: clientesNoMomento[];
}

export default function Home({}) {
  const [dados, setDados] = useState<HotelData | null>(null);

  useEffect(() => {
    const getHotelInfo = async () => {
      try {
        const response = await api.get<HotelData>("reservas/hotelaria/");
        console.log(response.data);
        console.log(response.data.clientesNoMomento)
        console.log(response.data.checkInHoje)
        console.log(response.data.quartosLivres)
        console.log(response.data.checkOutHoje)
        console.log(response.data.quartosReservadosMes)
        setDados(response.data);
        setIsLoading(false);
        return response.data
      } catch (error) {
        console.error("Erro ao buscar informações do hotel:", error);
        setIsLoading(false);
      }
    };

    getHotelInfo();
  }, []);

  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-rosa-4 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <h1 className="text-rosa-4 font-semibold">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <LoggedHeader />
        <div className="mt-16">
          <div className="flex justify-center pt-[64px] text-rosa-4 text-[30px]">
            Bem vindo ao seu hotel
          </div>
          <div className="flex justify-center pb-[64px] text-cinza-1 text-[30px] ">
            Controle totalmente o seu negócio!
          </div>
        </div>

        <div className="ml-[42.5px]">
          <div className="mb-[64px] overflow-x-auto">
            <div className="mb-[24px]">
              <p className="text-[22px] text-preto font-poppins">
                Fazendo check-in (
                {dados 
                  ? dados?.checkInHoje.reduce(
                      (total, item) => total + (item.Reserva?.length || 0),
                      0
                    )
                  : 0}
                )
              </p>
            </div>
            <div className="flex gap-[24px] overflow-x-auto">
              {dados?.checkInHoje && dados?.checkInHoje?.length > 0 ? (
                dados.checkInHoje.map((item) =>
                  item.Reserva.map((checkin) => (
                    <BoxCheckin
                      key={checkin.id}
                      temAlgo={true}
                      nomeQuarto={item.titulo}
                      nomePessoa={checkin.cliente.usuario.nome}
                      data={checkin.data_check_in}
                      telefone={checkin.cliente.usuario.telefone}
                    />
                  ))
                )
              ) : (
                <BoxCheckin temAlgo={false} />
              )}
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Fazendo check out (
                {dados
                  ? dados.checkOutHoje.reduce(
                      (total, item) => total + (item.Reserva?.length || 0),
                      0
                    )
                  : 0}
                )
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxCheckout temAlgo={false} />
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Quartos reservados nos próximos dias (
                {dados ? dados.quartosReservadosMes.length : 0})
              </p>
            </div>
            <div className="flex gap-[24px] overflow-x-auto">
              {dados?.quartosReservadosMes && dados?.quartosReservadosMes.length > 0 ? (
                dados?.quartosReservadosMes?.map((item) => {
                  if (!item || typeof item !== "object") return null; // Ignorar dados inválidos
                  return (
                    <BoxCheckin
                      key={item.id}
                      temAlgo={true}
                      nomeQuarto={item.titulo}
                      data={item.data_check_in}
                    />
                  )}
                )
              ) : (
                <BoxCheckin temAlgo={false} />
              )}
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Quartos livres ({dados ? dados.quartosLivres.length : 0})
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              {dados?.quartosLivres.map((quarto) => (
                <BoxQuarto
                  key={quarto.id}
                  imagem={quarto.FotoAcomodacao.url_foto}
                  temAlgo={dados.quartosLivres.length > 0}
                  nomePropriedade={quarto.titulo}
                  nomeQuarto={quarto.titulo}
                  dataCheckin={quarto.descricao}
                  dataCheckout={quarto.descricao}
                />
              ))}
            </div>
          </div>

          <div className="mb-[64px] overflow-x-auto">
          <div className="mb-[24px]">
            <p className="text-[22px] text-preto font-poppins">
              Hóspedes no momento (
              {dados
                ? dados.clientesNoMomento?.reduce(
                    (total, cliente) => total + (cliente.Reserva?.length || 0),
                    0
                  )
                : 0}
              )
            </p>
          </div>
          <div className="flex gap-[24px] overflow-x-auto">
            {dados && dados.clientesNoMomento.length > 0 ? (
              dados.clientesNoMomento.map((cliente) => (
                <BoxHospede
                  key={cliente.usuario.id}
                  imagem={cliente.usuario.FotoUsuario?.[0]?.url_foto || "/google.png"}
                  temAlgo={cliente.Reserva && cliente.Reserva.length > 0}
                  nomeQuarto={
                    cliente.Reserva?.[0]?.acomodacao?.titulo
                      ? `Quarto com ${cliente.Reserva[0].acomodacao.titulo}`
                      : "Quarto não especificado"
                  }
                  nomePessoa={cliente.usuario.nome}
                  data={
                    cliente.Reserva?.[0]?.data_check_in || "Data não disponível"
                  }
                  telefone={cliente.usuario.telefone || "Telefone não disponível"}
                />
              ))
            ) : (
              <p className="text-[16px] text-gray-500">
                Nenhum hóspede no momento.
              </p>
            )}
          </div>
        </div>

        </div>
      </div>
    </>
  );
}
