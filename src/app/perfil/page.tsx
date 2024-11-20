import Image from "next/image";
import Diamante from "../../../public/diamante.png"
import Ranking from "../../../public/ranking.png"
import Coracao from "../../../public/coracao.png"
import Medalha from "../../../public/medalha.png"
import Estrela from "../../../public/estrela.png"
import Mala from "../../../public/mala.png"
import Foto1 from "../../../public/Rectangle 160.png"
import Foto2 from "../../../public/Rectangle 161.png"
import Foto3 from "../../../public/Rectangle 162.png"
import Link from "next/link";

export default function Perfil(){
    return(
        <div className=" overflow-clip flex w-screen gap-24 h-screen pr-10">
            <div className=" w-[342px] h-[516px] mt-20 overflow-clip ml-[10vw]">
                <div className=" overflow-clip w-[342px] h-[342px] mb-[14px]">
                    <Image src={Foto1} alt=""></Image>
                </div>
                <div className=" flex w-full h-full gap-[22px] justify-between">
                    <div className=" h-full w-full">
                        <Image src={Foto2} alt=""></Image>
                    </div>
                    <div className=" h-full w-full">
                        <Image src={Foto3} alt=""></Image>
                    </div>

                </div>
            </div>

            <div className=" w-full h-full mt-20 overflow-y-auto pb-20">
                <div className="">
                    <p className=" text-[44px] font-bold text-preto">Nome</p>
                    <div className=" mt-[16px] ">
                        <div className=" flex items-center gap-[10px]">
                            <Image src={Estrela} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">Membro antigo</p>
                        </div>

                        <div className=" flex items-center gap-[10px]">
                            <Image src={Mala} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">600+ hospedagens realizadas pelo aplicativo</p>
                        </div>

                        <div className=" flex items-center gap-[10px]">
                            <Image src={Coracao} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">Seu hotel está entre os mais populares da região</p>
                        </div>

                        <div className=" flex items-center gap-[10px]">
                            <Image src={Ranking} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">Top 10 melhores destinos na categoria praia</p>
                        </div>

                        <div className=" flex items-center gap-[10px]">
                            <Image src={Medalha} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">Você conquistou o título de Superhost</p>
                        </div>

                        <div className=" flex items-center gap-[10px]">
                            <Image src={Diamante} className="h-[20px] w-[20px]" alt=""></Image>
                            <p className=" text-[20px] text-preto">Seu hotel está na categoria Diamante</p>
                        </div>
                    </div>
                </div>

                <div className=" w-full mb-[64px] mt-[64px]">
                    <div className=" w-full h-[110px] flex justify-around">
                        <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                            <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                                <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                                <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
                            </div>
                        </div>
                        <div className="bg-branco-2 w-[348px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] items-center justify-center">
                            <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                                <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                                <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" mb-[64px]">
                    <div className="grid grid-cols-3 gap-5">
                        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                            <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                        </div>
                        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                            <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                        </div>
                        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                            <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                        </div>
                        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                            <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                        </div>
                        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
                            <Image src={Mala} className=" w-[40px] h-[36px]" alt=""></Image>
                            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">Viagens</p>
                        </div>

                    </div>
                </div>

                <div>
                    <h1 className=" text-preto font-bold text-[35px] mb-5 ">Meus dados:</h1>
                    <p className="font-readex-pro text-cinza-4 font-normal text-[20px] mb-3 ">Sobre</p>
                    <p className="font-readex-pro text-cinza-3 font-normal mb-10"> bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Nome: </p>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Email: </p>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Telefone: </p>
                </div>

                <div className=" w-full h-10 flex border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Senha: </p>
                    <button>

                    </button>
                </div>

                <div>
                    <h1 className=" text-preto font-bold text-[35px] mb-5 ">Pagamento:</h1>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Código do banco: </p>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Agencia bancária: </p>
                </div>

                <div className=" w-full h-10 border-cinza-1 border-b-2 mb-10">
                    <p className=" font-medium font-readex-pro text-cinza-4 text-[20px]"> Conta para débito: </p>
                </div>

                <div className="flex gap-5 mb-10 w-full justify-around">
                    <Link href="/perfil/editar">
                        <button className=" flex align-middle items-center gap-5 justify-center w-[300px] h-[56px] bg-rosa-3 rounded-lg hover:bg-red-400">
                            <p className="font-readex-pro text-branco font-normal leading-10 text-[24px]">Editar informações</p>
                        </button>
                    </Link>

                    <button  className=" flex align-middle items-center gap-5 justify-center w-[300px] h-[56px] border-rosa-3 border-2 rounded-lg text-rosa-3 hover:bg-laranja hover:border-0 hover:text-branco">
                        <p className="font-readex-pro font-normal leading-10 text-[24px]">Excluir conta</p>
                    </button>
                </div>
               
            </div>
        </div>
    )
}