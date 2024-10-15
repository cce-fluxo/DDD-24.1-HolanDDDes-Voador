import Pergunta from '@/app/components/Pergunta';
import LoggedHeader from '@/app/components/LoggedHeader';

export default function Perguntas() {
  return (
    // página
    <> 
      <LoggedHeader/>

      <div className="w-screen flex justify-center pt-[90px] mt-[110px]">
        <div className="w-11/12 gap-[90px] flex flex-col items-center">
          <div className="grid content-between justify-center">
            <h1 className="text-[#333333] font-sans justify-self-center font-[700] text-[36px] lading-[54px]">Perguntas Frequentes</h1>
            <p className="text-[#AB9C9F] font-sans font-[500] text-[32px] leading-[48px]">Perguntas frequentes aparecerão aqui</p>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-max mb-[48px]">
              <h2 className="font-[500] text-[24px] leading-[36px] text-[#333333] font-sans">Perguntas Frequentes</h2>
              <div className="w-full h-[1px] bg-[#AB9C9F]"></div>
            </div>

            <div className="w-full h-[1px] bg-[#AB9C9F]"/>
            <Pergunta pergunta='Como funcionam os cancelamentos?' resposta='Vamos cuidar do seu cancelamento rapidamente: se o motivo for uma mudança nos planos, vá até Viagens para cancelar a reserva. Você verá o valor do reembolso durante o processo de cancelamento.'/>
            <Pergunta pergunta='Como alterar uma reserva antes da sua viagem?' resposta='O anfitrião terá que aceitar todas as alterações solicitadas. Se o anfitrião não responder, tente enviar uma mensagem para lembrá-lo de analisar seu pedido de alteração.'/>
            <Pergunta pergunta='Como pagar a viagem?' resposta='Você está com tudo pronto para reservar, mas ainda falta pagar. A boa notícia é que aceitamos diferentes formas de pagamento, e as opções dependem apenas do país em que a conta do pagamento está localizada. Se você precisar dividir seu pagamento, tem essa opção, desde que a estadia seja elegível e haja uma opção de plano de pagamento no checkout.'/>
            <Pergunta pergunta='Como encontrar o status da minha reserva como hóspede?' resposta='Ao fazer uma Reserva Instantânea, ela é confirmada automaticamente. Se você enviou um pedido de reserva ao anfitrião, ele terá 24 horas para responder. Se ele recusar ou não responder, não se preocupe: você não precisa pagar nada e pode reservar outra acomodação. De qualquer forma, verifique se a sua conta está atualizada.'/>
          </div>
        </div>
      </div>
    </>
  );
}
