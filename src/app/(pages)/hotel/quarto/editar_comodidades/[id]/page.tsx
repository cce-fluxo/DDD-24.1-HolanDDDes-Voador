"use client";
import Image from "next/image";
import Link from 'next/link';
import Comodidade from "@/app/components/Comodidade";
import LoggedHeader from "@/app/LoggedHeader";
import { useEffect, useState, useCallback } from "react";
import api from "@/app/services/axios";
import { useParams, useRouter } from "next/navigation";

interface ComodidadeData {
  ComodidadeAcomodacao: {
    id: number;
    nome: string;
  }[]
}

export default function Comodidades() {
  // Estado para armazenar as comodidades selecionadas
  const [selectedComodidades, setSelectedComodidades] = useState<number[]>([]);

  // Estado para armazenar as comodidades INICIAIS
  const [initialComodidades, setInitialComodidades] = useState<number[]>([])

  // Função para alternar seleção da comodidade
  const toggleComodidade = (id: number) => {
    setSelectedComodidades((prev) =>
      prev.includes(id) ? prev.filter((comodidade) => comodidade !== id) : [...prev, id]
    );
  };

  //página carregando  
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  const { id } = useParams(); // Captura o id da URL

  // Carregar comodidades selecionadas do banco de dados
  const fetchComodidades = useCallback(async (): Promise<number[]> => {
    try {
      const response = await api.get<ComodidadeData>(`acomodacoes/${id}/comodidades`);
      setIsLoading(false);
      const data = response.data;

      if (data.ComodidadeAcomodacao && Array.isArray(data.ComodidadeAcomodacao)) {
        return data.ComodidadeAcomodacao.map((item) => item.id); // Retorna apenas os IDs
      } else {
        console.error('Formato inesperado:', data);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar comodidades:', error);
      return [];
    }
  }, [id]);

  useEffect(() => {
    fetchComodidades().then((data) => {
      if (data) {
        setInitialComodidades(data); // Salva o estado inicial
        setSelectedComodidades(data); // Define como selecionadas no início
      }
    });
  }, [fetchComodidades]);

  // Mudança de rota
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      // Adicionar comodidades
      const newComodidades = selectedComodidades.filter(
        (id) => !initialComodidades.includes(id)
      );
  
      // Enviar cada ID selecionado em uma requisição separada
      for (const comodidadeId of newComodidades) {
        console.log('Enviando comodidade ID:', comodidadeId);
        await api.post(`acomodacoes/${id}/comodidade`, { comodidadeId });
      }
  
      // Deletar comodidades
      const removedComodidades = initialComodidades.filter(
        (id) => !selectedComodidades.includes(id)
      );
  
      for (const comodidadeId of removedComodidades) {
        console.log('Removendo comodidade ID:', comodidadeId);
        await api.request({
          method: 'DELETE',
          url: `acomodacoes/${id}/comodidade`,
          data: { comodidadeId }, // Passa o ID como parte do corpo da requisição
        });
      }
  
      console.log("Alterações confirmadas!");
  
      // Redirecionar para a página do quarto
      router.push(`/hotel/quarto/${id}`);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
  

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
      <LoggedHeader />

      <div className="w-screen flex relative justify-around mt-[110px]">
        <div className="flex flex-col items-center my-20 gap-[26px] bg-[#F6F4F4] px-[50px] py-[34px] rounded-[20px] ">
          <div className="w-[458px] flex flex-col items-center gap-[26px]">
            <Image src="/rafiki.svg" alt="imagem" height={341.15} width={372} className="justify-items-center relative" />
            <p className="h-[36px] font-[500] text-[24px] leading-[36px] text-[#372F30] font-sans text-center">Comodidades</p>

            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[15px]">
                <div className="bg-[url('/right.png')] h-[27px] w-[27px] bg-no-repeat bg-contain inline-block shrink-0"></div>
                <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">Selecione ao lado as principais comodidades do seu hotel. </p>
              </div>
              <div className="flex gap-[15px]">
                <div className="bg-[url('/right.png')] h-[27px] w-[27px] bg-no-repeat bg-contain inline-block shrink-0"></div>
                <p className="font-[400] text-[16px] text-[#372F30] leading-[24px] font-sans">
                  Você poderá detalhar as demais características do seu hotel na opção de <span className="text-red-600 font-[400] text-[16px] leading-[24px] font-sans">detalhar informações.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-[56px] flex flex-col items-center self-center">
          <div className="gap-[32px] flex flex-col items-center">
            <div className="flex gap-[26px]">
              <Comodidade id={1} nome="Wi-fi grátis" icon="/wifi.svg" onClick={() => toggleComodidade(1)} selected={selectedComodidades.includes(1)} />
              <Comodidade id={2} nome="Ar-condicionado" icon="/ice.svg" onClick={() => toggleComodidade(2)} selected={selectedComodidades.includes(2)} />
            </div>

            <div className="flex gap-[26px]">
              <Comodidade id={3} nome="Spa" icon="/spa.png" onClick={() => toggleComodidade(3)} selected={selectedComodidades.includes(3)} />
              <Comodidade id={4} nome="Café da manhã incluso" icon="/coffe.svg" onClick={() => toggleComodidade(4)} selected={selectedComodidades.includes(4)} />
            </div>

            <div className="flex gap-[26px]">
              <Comodidade id={5} nome="Cozinha Gourmet" icon="/chef.svg" onClick={() => toggleComodidade(5)} selected={selectedComodidades.includes(5)} />
              <Comodidade id={6} nome="Piscina" icon="/pool.svg" onClick={() => toggleComodidade(6)} selected={selectedComodidades.includes(6)} />
            </div>

            <button className="bg-[#FFEDF0] rounded-[10px] gap-[16px] p-[10px_32px_10px_32px] border border-[#CEC6C7] flex">
              <Image src="/red_add.svg" alt="AC icon" height={36} width={40} />
              <p className="font-sans font-[500] text-[24px] leading-[36px] text-[#FD765E]">Carregar Mais ...</p>
            </button>
          </div>

          <button onClick={handleConfirm} className="bg-[#DC143B] hover:bg-[#F42C46] w-[433px] h-[57px] p-[15px, 182px, 15px, 182px] rounded-[10px] text-[#FFFFFF] font-sans font-[400] text-[24px]">
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
}