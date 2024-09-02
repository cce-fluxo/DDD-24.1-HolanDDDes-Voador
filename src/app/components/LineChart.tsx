"use client"; // Adiciona esta linha para marcar como Componente Cliente

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  titulo: string;
  categorias: string[];
  dados: number[];
  lineColor: string;
  lineWidth: number;
}

const LineChart: React.FC<LineChartProps> = ({ titulo, dados, categorias, lineColor, lineWidth }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const series = [
    {
      name: 'Valores',
      data: dados,
      color: lineColor
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false, // Desativa a toolbar
      },
    },
    title: {
      text: titulo,
      align: 'center',
      style: {
        fontSize: "24px",
        fontWeight: "400",
        color: "#574A4D",
      },
    },
    grid: {
      row: {
        colors: ['#FFFFFF', 'transparent'], // takes an array which will be repeated on rows
        opacity: 0.5,
      },
    },
    stroke: {
      width: lineWidth, // Define a espessura da linha aqui
    },
    xaxis: {
      categories: categorias,
    },
  };

  return isMounted ? <Chart options={options} series={series} type="line" height={350} /> : null;
};

export default LineChart;
