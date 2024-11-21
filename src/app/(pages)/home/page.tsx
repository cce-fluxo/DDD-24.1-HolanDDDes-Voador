"use client";

import React, { useState } from "react";

import LoggedHeader from "@/app/LoggedHeader";
import BoxCheckin from "../../components/BoxCheckin";
import BoxCheckout from "../../components/BoxCheckout";
import BoxHospede from "../../components/BoxHospede";
import BoxReserva from "../../components/BoxReserva";
import BoxQuarto from "../../components/BoxQuarto";

//const checkin = await fetch()

//const chackout = await fectch()

//const reservado = await fectch()

//const livres = await fectch()

//const hospedes = await fectch()

export default function Home({}) {
  const [temCheckin, setTemCheckin] = useState(true);
  const [temCheckout, setTemCheckout] = useState(false);
  const [temQuartosReservados, setTemQuartosReservados] = useState(false);
  const [temQuartosLivres, setTemQuartosLivres] = useState(false);
  const [temHospedesNoMomento, setTemHospedesNoMomento] = useState(false);

  return (
    <>
      <div>
        <LoggedHeader />
        <div className=" mt-16">
          <div className="flex justify-center pt-[64px] text-rosa-4 text-[30px]">
            Bem vindo ao seu hotel
          </div>
          <div className=" flex justify-center pb-[64px] text-cinza-1 text-[30px] ">
            Controle totalmente o seu negócio!
          </div>
        </div>

        <div className=" ml-[42.5px]">
          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Fazendo check in (1){}
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxCheckin temAlgo={false} />
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Fazendo check out (1){}
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxCheckout temAlgo={false} />
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Quartos reservados nos últimos dias (1){}
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxReserva temAlgo={false} />
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Quartos livres (1){}
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxQuarto temAlgo={false} />
            </div>
          </div>

          <div className=" mb-[64px] overflow-x-auto">
            <div className=" mb-[24px]">
              <p className=" text-[22px] text-preto font-poppins">
                Hóspedes no momento (1){}
              </p>
            </div>
            <div className=" flex gap-[24px] overflow-x-auto">
              <BoxHospede temAlgo={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
