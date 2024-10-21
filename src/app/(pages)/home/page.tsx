"use client";
import Image from "next/image";
import Checkin from "./checkin";
import Checkout from "./checkout";
import Reserva from "./reserva"
import Quarto from "./quarto";
import React, { useRef } from 'react';
import Hospede from "./hospede"
import LoggedHeader from "@/app/LoggedHeader";

export default function Home() {

  //const checkin = await fetch()
  //const chackout = await fectch()
  //const reservado = await fectch()
  //const livres = await fectch()
  //const hospedes = await fectch()

  return (
    <>
    <div>
      <LoggedHeader />
      <div className=" mt-16">
        <div className="flex justify-center pt-[64px] text-rosa-4 text-[30px]">Bem vindo ao seu hotel</div>
        <div className=" flex justify-center pb-[64px] text-cinza-1 text-[30px] ">Controle totalmente o seu negócio!</div>
      </div>
      
      <div className=" ml-[42.5px]">

        <div className=" mb-[64px] overflow-x-auto">
          <div className=" mb-[24px]">
            <p className=" text-[22px] text-preto font-poppins">Fazendo check in (1){}</p>
          </div>
            <Checkin></Checkin>
        </div>

        <div className=" mb-[64px] overflow-x-auto">
          <div className=" mb-[24px]">
            <p className=" text-[22px] text-preto font-poppins">Fazendo check out (1){}</p>
          </div>
            <Checkout/>
        </div>

        <div className=" mb-[64px] overflow-x-auto">
          <div className=" mb-[24px]">
            <p className=" text-[22px] text-preto font-poppins">Quartos reservados nos últimos dias (1){}</p>
          </div>
            <Reserva/>
        </div>

        <div className=" mb-[64px] overflow-x-auto">
          <div className=" mb-[24px]">
            <p className=" text-[22px] text-preto font-poppins">Quartos livres (1){}</p>
          </div>
            <Quarto/>
        </div>

        <div className=" mb-[64px] overflow-x-auto">
          <div className=" mb-[24px]">
            <p className=" text-[22px] text-preto font-poppins">Hóspedes no momento (1){}</p>
          </div>
            <Hospede></Hospede>
        </div>
      </div>
    </div>
    </>
  );
}
