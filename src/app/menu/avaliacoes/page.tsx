import Image from "next/image";
import LineChart from '@/app/components/LineChart';
import Avaliacao from "@/app/components/Avaliacao";
import LoggedHeader from "@/app/components/LoggedHeader";

export default function Avaliacoes() {
  return (
    // página
    <div> 
      <LoggedHeader/>

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
              <p className="font-[700] text-[36px] leading-[54px] text-[#333333]self-center">4,6</p>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-max mb-[48px]">
              <h2 className="font-[500] text-[24px] leading-[36px] text-[#333333] font-sans">Avaliações</h2>
              <div className="w-full h-[1px] bg-[#AB9C9F]"></div>
            </div>

            <div className="w-full h-[1px] bg-[#AB9C9F]"/>
            <Avaliacao imagem="/usuário.png" nome="Marcella Johara" quarto="Quarto Deluxe" descricao="Hotel excelente em tudo. Buffet perfeito, atividades e acomodações ótimas. Elogio para a Lucinda do restaurante que foi muito atenciosa e excelente profissional. Parabéns e que cresça cada vez mais este hotel!!! Perfeito!! Quartos muito bonitos e limpos!! Ônibus a todo momento para levar os hóspedes." estrelas={5}/>
            <Avaliacao imagem="/usuário.png" nome="Marcella Johara" quarto="Quarto Deluxe" descricao="Hotel excelente em tudo. Buffet perfeito, atividades e acomodações ótimas. Elogio para a Lucinda do restaurante que foi muito atenciosa e excelente profissional. Parabéns e que cresça cada vez mais este hotel!!! Perfeito!! Quartos muito bonitos e limpos!! Ônibus a todo momento para levar os hóspedes." estrelas={5}/>
            <Avaliacao imagem="/usuário.png" nome="Marcella Johara" quarto="Quarto Deluxe" descricao="Hotel excelente em tudo. Buffet perfeito, atividades e acomodações ótimas. Elogio para a Lucinda do restaurante que foi muito atenciosa e excelente profissional. Parabéns e que cresça cada vez mais este hotel!!! Perfeito!! Quartos muito bonitos e limpos!! Ônibus a todo momento para levar os hóspedes." estrelas={5}/>
            <Avaliacao imagem="/usuário.png" nome="Marcella Johara" quarto="Quarto Deluxe" descricao="Hotel excelente em tudo. Buffet perfeito, atividades e acomodações ótimas. Elogio para a Lucinda do restaurante que foi muito atenciosa e excelente profissional. Parabéns e que cresça cada vez mais este hotel!!! Perfeito!! Quartos muito bonitos e limpos!! Ônibus a todo momento para levar os hóspedes." estrelas={5}/>
            <Avaliacao imagem="/usuário.png" nome="Marcella Johara" quarto="Quarto Deluxe" descricao="Hotel excelente em tudo. Buffet perfeito, atividades e acomodações ótimas. Elogio para a Lucinda do restaurante que foi muito atenciosa e excelente profissional. Parabéns e que cresça cada vez mais este hotel!!! Perfeito!! Quartos muito bonitos e limpos!! Ônibus a todo momento para levar os hóspedes." estrelas={5}/>
          
          </div>
        
        <div className="flex flex-col w-full gap-[48px]">
          <div className="w-max">
            <h2 className="font-[500] text-[24px] leading-[36px] text-[#333333] font-sans">Visualizações</h2>
            <div className="w-full h-[1px] bg-[#AB9C9F]"></div>
          </div>

          <div className="flex max-w-[90%] justify-between">
            <div className="flex flex-col gap-[16px]">
              <p className="font-[900] text-[40px] leading-[30px] text-[#333333] font-sans max-w-full">9</p>
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
