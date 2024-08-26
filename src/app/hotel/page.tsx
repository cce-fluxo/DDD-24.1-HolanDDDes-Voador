// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from 'next/link';

const Hotel = () => {
  return (
    <>
      <LoggedHeader />
      <main className="flex pt-[80px]">
      <div className="flex w-11/12 h-full justify-around">
      <div className="w-1/4 h-screen fixed left-[88px] top-[30px] flex flex-col items-center justify-center gap-[32px]">
            <div className="bg-[#D9D9D9]  p-[176px_128px] w-[430px] h-[466px] rounded-[10px] flex items-center justify-center">
              <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5}/>
            </div>
            <button className="py-[15px] px-[182px] bg-cinza-2 w-[340px] h-[57px] flex items-center justify-center gap-[10px] text-white whitespace-nowrap font-poppins text-[24px] font-normal rounded-[10px] -tracking-2 leading-9">
              Postar Anúncio
            </button>
          </div>
          <div className="ml-[25%] w-[669px] h-[447px] relative top-[50px] flex flex-col">
          <div className="w-[816px] h-[723px] gap-[64px]">
          <div className="w-[669px] h-[358px] gap-[16px]">
            <div className="w-[245px] h-[118px] gap-[16px]">
              <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px]"> Sem Nome</h1>
              <h4 className="w-[31px] h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A]">0$</h4>
            </div>
            <div className="w-[669px] h-[224px] gap-2">
              <ul className="gap-[10px]">
                <li className="flex items-center gap-[10px] mb-[10px] w-[669px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Comece Renomeando seu Hotel; atribua endereço e telefone.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[427px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Adicione fotos do Hotel e dos quartos.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Selecione suas Comodidades.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] w-[290px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Escreva sobre seu Hotel.
                  </h5>
                </li>
              </ul>
            </div>
            </div>
            <Link href="/hotel/adicionarinfo" passHref>
                <button className="mt-[32px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Comece agora!
                </button>
            </Link>
            <div className="flex flex-row items-top justify-center min-h-screen">
              <div className="mt-[64px] w-[816px] h-[150px] flex flex-row items-center justify-center">
                <div className="w-[675px] h-[110px] gap-[40px] flex items-center justify-center">
                  <div className="bg-branco-2 w-[280px] h-[110px] rounded-[10px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                    <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
                    </div>
                  </div>
                  <div className="bg-branco-2 w-[348px] h-[110px] rounded-[10px] py-[16px] px-[80px] gap-[64px] items-center justify-center">
                    <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className="mt-[-500px] w-[188px] h-[498px] gap-[24px]">
                <div className="w-[144px] h-[51px] gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
                  Quartos
                </div>
                <div className="w-[854px] h-[423px]">
                  <div className="w-[400px] h-[432px] top-[2px] rounded-[10px] p-[32px] gap-[56px] bg-branco-2 flex flex-col justify-center items-end">
                    <div className="w-[336px] h-[359px] gap-[16px]">
                      <div className="w-[336px] h-[287px] gap-[16px]">
                        <div className="w-[336px] h-[235px] rounded-[10px] bg-[#D9D9D9] flex justify-center items-center">
                          <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                            <Image src="/hotel_image.png" width={123.5} height={104.5} alt="Hotel" />
                          </div>
                        </div>
                        <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">Adicione um Quarto</h4>
                        <div className="mt-[-40px] w-[600px] h-[100px] gap-[4px] flex flex-col justify-end items-center">
                        <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                          por noite:
                        </p>
                        <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">R$ 0</h3>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[520px] h-[56px] gap-[32px] mt-[40px]">
              <div className="w-[520px] h-[56px] gap-[26px]">
                <div className="w-[520px] h-[56px] gap-[40px]">
                  <div className="w-[520px] h-[56px] gap-[40px]">
                    <div className="w-[520px] h-[56px] rounded-[10px] border-[1px] border-cinza-1 p-[10px,32px, 10px, 32px] gap-[16px] bg-branco-2 flex items-center justify-center">
                      <Image src="/x.png" width={26} height={26} className="color-cinza-2" alt="x"/>
                      <h4 className="font-poppins font-medium text-[24px] text-cinza-3"> Nenhuma comodidade adicionada </h4>
                    </div>
                  </div>
                </div>
                <div className="mt-[60px] flex flex-col">
                <h3 className=" w-[245px] h=[400px] font-poppins text-preto text-[32px] font-bold leading-[66px]"> Meus dados:</h3>
                <div className="w-[240px] h-[70px] ml-8">
                  <h4 className="w-[245px] h=[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">Descrição</h4>
                  <h5 className="font-poppins font-normal text-[20px] text-cinza-2 whitespace-nowrap">/Adicione uma descrição...</h5>
                </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[56px] gap-[26px] flex items-center">
                <div className="mt-[80px] relative w-[400px] h-[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap">
                  <h4 className="text-preto inline-block">Nome: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-bloc">Adicione um Nome</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>
                </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[160px] gap-[26px] flex items-center">
                <div className="mt-[60px] relative w-[400px] h=[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap">
                  <h4 className="text-preto inline-block">Endereço: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-block">Adicione Endereço</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>           
                </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-[520px] h-[180px] gap-[26px] flex items-center">
                <div className="mt-[40px] relative w-[400px] h=[66px] font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap mb-[80px]">
                  <h4 className="text-preto inline-block">Telefone: </h4>
                  <h5 className="text-cinza-2 ml-2 inline-block">Adicione Número de Telefone</h5>
                  <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>                 
                </div>
                </div>
              </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hotel;