"use client";
import Image from "next/image";
import LineChart from '@/app/components/LineChart';
import Avaliacao from "@/app/components/Avaliacao";
import LoggedHeader from "@/app/LoggedHeader";
import { useEffect, useState } from "react";
import api from "@/app/services/axios";

interface AvaliacoesData {
  avaliacoes_acomodacoes: {
    Acomodacao: {
      Avaliacao_acomodacao: {
        id: number;
        custo_beneficio: number;
        atendimento: number;
        comida: number;
        limpeza: number;
        conforto: number;
        localizacao: number;
        comentario?: string;
        acomodacaoId: number;
        clienteId: number;
      }[];
    }[];
  }[];

  acomodacoes: {
    Acomodacao: {
      id: number;
      titulo: string;
      descricao?: string;
      banheiros: number;
      quartos: number;
      camas: number;
      valor_diaria: number;
      valor_pet: number;
      complemento: string;
      tipo_acomodacaoId: number;
      hotelId: number;
    }[]
  }[]

  cliente_avaliacao: {
    Acomodacao: {
      Avaliacao_acomodacao: {
        cliente: {
          id: number;
          usuarioId: number;
        }
      }[]
    }[]
  }[]

  usuario_avaliacao: {
    Acomodacao: {
      Avaliacao_acomodacao: {
        cliente: {
          usuario: {
            id: number;
            nome: string;
            sobrenome: string;
            email: string;
            hash_senha: string;
            telefone: string;
            token_resetar_senha: string;
            data_nascimento: any;
            vip: boolean;
            role: string;
          };
        };
      }[];
    }[];
  }[];

  foto_usuario: {
    Acomodacao: {
      Avaliacao_acomodacao: {
        cliente: {
          usuario:{
            FotoUsuario: {
              id: number;    
              url_foto: string;  
              usuarioId: number;
            }[]
          }
        }
      }[]
    }[]
  }[]
}

interface Avaliacao {
  id: number;
  name: string;
  acomodacao: string;
  nota: number;
  descricao: string;
  url_foto: string;
}

export default function Avaliacoes() {
  const [avaliacoesData, setAvaliacoesData] = useState<Avaliacao[]>([]);

  function formatAvaliacoes(data: AvaliacoesData): Avaliacao[] {
    const avaliacoes: Avaliacao[] = [];
  
    data.avaliacoes_acomodacoes.forEach(ac => {
      ac.Acomodacao.forEach(acomodacao => {
        acomodacao.Avaliacao_acomodacao.forEach(avaliacao => {
          // Encontrar o cliente associado ao clienteId da avaliação
          const cliente = data.cliente_avaliacao
            .flatMap(ca => ca.Acomodacao)
            .flatMap(a => a.Avaliacao_acomodacao)
            .find(aa => aa.cliente.id === avaliacao.clienteId)?.cliente;

          // Se o cliente não for encontrado, ignore a avaliação
          if (!cliente) return;
  
          // Encontrar o usuário associado ao cliente
          const usuario = data.usuario_avaliacao
            .flatMap(ua => ua.Acomodacao)
            .flatMap(a => a.Avaliacao_acomodacao)
            .find(aa => aa.cliente.usuario.id === cliente.usuarioId)?.cliente.usuario;

          // Se o usuário não for encontrado, ignore a avaliação
          if (!usuario) return;
  
          // Encontrar a URL da foto do usuário
          const fotoUsuario = data.foto_usuario
            .flatMap(fu => fu.Acomodacao)
            .flatMap(a => a.Avaliacao_acomodacao)
            .flatMap(aa => aa.cliente.usuario.FotoUsuario)
            .find(foto => foto.usuarioId === usuario.id);

          // Encontrar o título da acomodação associada ao acomodacaoId
          const acomodacaoEncontrada = data.acomodacoes
            .flatMap(acom => acom.Acomodacao)
            .find(a => a.id === avaliacao.acomodacaoId);
  
          // Criar o objeto Avaliacao
          avaliacoes.push({
            id: avaliacao.id,
            name: `${usuario.nome} ${usuario.sobrenome}`,
            acomodacao: acomodacaoEncontrada?.titulo || "Sem Nome",
            nota: calcularNota(avaliacao),
            descricao: avaliacao.comentario || "",
            url_foto: fotoUsuario?.url_foto || "/google.png", // Foto padrão se não houver foto
          });
        });
      });
    });

    return avaliacoes;
  }
  
  
  async function getAvaliacoes(): Promise<AvaliacoesData> {
    try {
      const response = await api.get<AvaliacoesData>("avaliacao/avaliacoes");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      throw error; // Relançar o erro para o chamador lidar
    }
  }

  function calcularNota(avaliacao: any): number{
    const soma = avaliacao.custo_beneficio + avaliacao.atendimento + avaliacao.comida + avaliacao.limpeza + avaliacao.conforto + avaliacao.localizacao
    return Math.floor(soma/6)

  }

  function getMediaDasNotas(avaliacoes: Avaliacao[]){
    let soma = 0;
    avaliacoes.map(avaliacao => soma += avaliacao.nota);
    return soma/avaliacoes.length;
  }

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const avaliacoes = await getAvaliacoes(); 
        setAvaliacoesData(formatAvaliacoes(avaliacoes)); 
      } catch (error) {
        console.error("Erro ao definir avaliações:", error);
      }
    };
    fetchAvaliacoes();
  }, []);
  
  return (
    // página
    <div> 
      <LoggedHeader />

      <div className="w-screen flex justify-center pt-[90px] mt-[110px]">
        <div className="w-11/12 gap-[48px] flex flex-col items-center">

          <div className="grid content-between justify-center">
            <h1 className="text-[#333333] font-sans justify-self-center font-[700] text-[36px]">Avaliações</h1>
            <p className="text-[#AB9C9F] font-sans font-[500] text-[30px]">Suas avaliações aparecerão aqui</p>
          </div>

          <div className="gap-[14px] grid justify-center justify-items-center content-between">
            <p className="font-[500] text-[24px] leading-[36px] text-[#574A4D] font-sans">Nota geral do hotel</p>
            <div className="flex gap-[24px] justify-between items-center">
              <Image src="/star.svg" alt='star' height={71} width={80}/>
              <p className="font-[700] text-[36px] leading-[54px] text-[#333333] self-center">{getMediaDasNotas(avaliacoesData) || "-"}</p>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-max mb-[48px]">
              <h2 className="font-[500] text-[24px] leading-[36px] text-[#333333] font-sans">Avaliações</h2>
              <div className="w-full h-[1px] bg-[#AB9C9F]"></div>
            </div>

            <div className="w-full h-[1px] bg-[#AB9C9F]"/>

            {avaliacoesData.map((avaliacao, index) => (
              <Avaliacao
                key={index}
                imagem={avaliacao.url_foto}
                nome= {avaliacao.name}
                quarto= {avaliacao.acomodacao}
                descricao={avaliacao.descricao}
                estrelas={avaliacao.nota}
              />
            ))}
          </div>
        
        <div className="flex flex-col w-full gap-[48px]">
          <div className="w-max">
            <h2 className="font-[500] text-[24px] leading-[36px] text-[#333333] font-sans">Visualizações</h2>
            <div className="w-full h-[1px] bg-[#AB9C9F]"></div>
          </div>

          <div className="flex max-w-[90%] justify-between">
            <div className="flex flex-col gap-[16px]">
              <p className="font-[900] text-[40px] leading-[30px] text-[#333333] font-sans max-w-full">-</p>
              <p className="font-[500] text-[20px] leading-[30px] text-[#333333] font-sans max-w-full">Visualizações nos últimos 30 dias</p>
            </div>

            <div className="flex flex-col gap-[16px]">
              <p className="font-[900] text-[40px] leading-[30px] text-[#333333] font-sans max-w-full">4</p>
              <p className="font-[500] text-[20px] leading-[30px] text-[#333333] font-sans max-w-full">Reservas nos últimos 30 dias</p>
            </div>

            <div className="flex flex-col gap-[16px]">
              <p className="font-[900] text-[40px] leading-[30px] text-[#333333] font-sans max-w-full">5%</p>
              <p className="font-[500] text-[20px] leading-[30px] text-[#333333] font-sans max-w-full">Taxa de reservas</p>
            </div>
          </div>
          
          <div className="w-full grid justify-items-center">
            <div className="h-[462px] w-[1361px] mb-12">
              <LineChart lineWidth={4} lineColor="#DC143B" titulo="Abril de 2024" categorias={["18", "19", "20", "21", "22", "23"]} dados={[-50, 100, -250, 1000, 75, 260]} />
            </div>
          </div>
        </div>
        

          
        </div>
      </div>
    </div>
  );
}
