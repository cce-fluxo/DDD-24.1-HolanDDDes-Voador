import LineChart from '@/app/components/LineChart';
import LoggedHeader from "@/app/components/LoggedHeader";

export default function Gerenciamento() {
  return (
    // página
    <div> 
      <LoggedHeader/>

      <div className="w-screen flex justify-center pt-[90px] mt-[110px]">
        <div className="w-9/12 gap-[90px] flex flex-col items-center">
          <div className="grid content-between justify-center">
            <h1 className="text-[#333333] font-sans justify-self-center font-[700] text-[36px] lading-[54px]">Gerenciamento de Ganhos</h1>
            <p className="text-[#AB9C9F] font-sans font-[500] text-[32px] leading-[48px]">Aqui você poderá observar seu lucro</p>
          </div>

          <div className="w-full flex flex-col items-center gap-[12px]">
            <div className="flex flex-col gap-[14px] w-full">
                <div className="w-full flex gap-[20px]">
                    <button className="bg-[#E0E0E0] hover:bg-[#afaeae] p-[7px_16px_7px_16px] rounded-[10px] text-[#372F30] font-sans font-[500] text-[20px]">Lucro Geral</button>
                    <button className="bg-[#E0E0E0] hover:bg-[#afaeae] p-[7px_16px_7px_16px] rounded-[10px] text-[#372F30] font-sans font-[500] text-[20px]">Lucro por Quarto</button>
                    <button className="bg-[#E0E0E0] hover:bg-[#afaeae] p-[7px_16px_7px_16px] rounded-[10px] text-[#372F30] font-sans font-[500] text-[20px]">Lucro mediante Cupons e Promoções</button>
                </div>

                <p className="text-[#828282] font-sans font-[400] text-[16px] leading-[24px]">Em reais (R$)</p>

                <div className="w-full flex justify-end">
                    <p className="text-red-600 font-sans font-[400] text-[16px] leading-[14px]">Valor Atual:</p>
                    <p className="text-[#333333] font-sans font-[400] text-[16px] leading-[14px]">+R$ 1.234</p>
                </div>

            </div>
            <div className="w-[1139px] h-[322px] mb-10"><LineChart lineWidth={1} lineColor="#333333" titulo="" categorias={["jan", "fev", "mar", "apr", "mai", "jun"]} dados={[-50, 100, -250, 1000, 75, 260]} /></div>
          </div>

        </div>
      </div>
    </div>
  );
}
