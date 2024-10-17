// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from 'next/link';

const Hotel = () => {
  return (
    <>
      <LoggedHeader />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <div className="flex flex-col xl:flex-row">
         
      <div className="w-full h-auto ml-8 flex flex-col items-center justify-around">
        <div className="flex flex-col xl:mt-0 mt-36 items-center justify-center xl:fixed max-w-md mx-auto overflow-hidden md:max-w-2xl">
          <div className="bg-branco-3 w-[430px] h-[400px] rounded-[10px] flex items-center justify-center mb-6">
            <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5} />
          </div>
          <button className="py-4 px-8 bg-cinza-2 w-[340px] h-[57px] flex items-center justify-center gap-[10px] text-white whitespace-nowrap font-poppins text-[24px] font-normal rounded-[10px] -tracking-2 leading-9">
            Postar Anúncio
          </button>
        </div>
      </div>

          <div className="w-full xl:ml-0 ml-8 h-screen mt-24 relative top-[50px] flex flex-col">
              <h1 className="mb-2 font-poppins text-preto text-[44px] font-bold leading-[66px]"> Sem Nome</h1>
              <h4 className="font-normal text-[24px] leading-9 text-[#2EC00A]">0$</h4>

              <ul className="gap-2">
                <li className="flex items-center gap-2 mb-2 p-2 relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-8 font-poppins text-cinza-3">
                    Comece Renomeando seu Hotel; atribua endereço e telefone.
                  </h5>
                </li>
                <li className="flex items-center gap-2 mb-2 p-2 relative">
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
              
            <Link href="/hotel/adicionarinfo" passHref>
                <button className="mt-[32px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Comece agora!
                </button>
            </Link>
            
            <div className="flex flex-row items-center justify-around mt-16">
              <div className="bg-branco-2 w-[280px] h-[110px] rounded-[10px] py-[16px] px-[80px] gap-[64px] items-center justify-center text-center">
                  <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                  <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
              </div>

              <div className="bg-branco-2 w-[348px] h-[110px] rounded-[10px] py-[16px] px-[80px] gap-[64px] items-center justify-center text-center">
                  <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                  <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
              </div>
            </div>
              
            <h2 className="mt-16 gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
              Quartos
            </h2>

              <div className="w-[400px] h-[432px] top-[2px] rounded-[10px] p-[32px] gap-[56px] bg-branco-2 flex flex-col justify-center">
                  
                  <div className="w-[336px] h-[359px] gap-[16px]">
                    <div className="w-[336px] h-[235px] rounded-[10px] bg-branco-3 flex justify-center items-center">
                      <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                        <Image src="/hotel_image.png" width={123.5} height={104.5} alt="Hotel" />
                      </div>
                    </div>
    
                    <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">Adicione um Quarto</h4>
                    <div className="w-[600px] flex flex-col justify-end items-center">
                    <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3 justify-end items-center">
                      por noite:
                    </p>
                    <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2 justify-end items-center">R$ 0</h3>
                  </div>
                </div>
              </div>

              <div className="items-center justify-center flex">
                <div className="mt-8 w-[520px] h-12 rounded-[10px] border-[1px] border-cinza-1 p-[10px 32px] bg-branco-2 flex items-center justify-center">
                  <Image src="/x.png" width={26} height={26} className="color-cinza-2" alt="x" />
                  <h4 className="font-poppins font-medium md:text-[24px] text-18px text-cinza-3">Nenhuma comodidade adicionada</h4>
                </div>
              </div>

                <h3 className="font-poppins text-preto text-[32px] font-bold leading-[66px]">Meus dados:</h3>

                <div className="flex flex-col gap-[26px]">
                  <div className="ml-8 w-[240px]">
                    <h4 className="font-poppins text-preto text-[24px] font-medium leading-[66px]">Descrição</h4>
                    <h5 className="font-poppins font-normal text-[20px] text-cinza-2 whitespace-nowrap">/Adicione uma descrição...</h5>
                  </div>

                  {/** Informações de contato */}
                  <div className="flex flex-col gap-[26px]">
                    {/** Nome */}
                    <div className="relative w-[500px] font-poppins text-[24px] font-medium leading-[66px]">
                      <h4 className="text-preto inline-block">Nome:</h4>
                      <h5 className="text-cinza-2 ml-2 inline-block">Adicione um Nome</h5>
                      <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>
                    </div>

                    {/** Endereço */}
                    <div className="relative w-[500px] font-poppins text-[24px] font-medium leading-[66px]">
                      <h4 className="text-preto inline-block">Endereço:</h4>
                      <h5 className="text-cinza-2 ml-2 inline-block">Adicione Endereço</h5>
                      <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>
                    </div>

                    {/** Telefone */}
                    <div className="mb-8 relative w-[500px] font-poppins text-[24px] font-medium leading-[66px]">
                      <h4 className="text-preto inline-block">Telefone:</h4>
                      <h5 className="text-cinza-2 ml-2 inline-block">Adicione Número de Telefone</h5>
                      <span className="absolute inset-x-0 bottom-0 border-b-2 border-cinza-2"></span>
                    </div>
                  </div>
                </div>

          </div>
      </div>
    </>
  );
};

export default Hotel;