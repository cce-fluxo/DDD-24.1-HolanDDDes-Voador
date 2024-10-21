import React, { useState, useEffect } from 'react';

const LetreiroAnimado = () => {
  const palavras = ["Fácil", "Eficiente", "Rápido"];
  const [palavraAtual, setPalavraAtual] = useState(palavras[0]);
  let indice = 0;

  useEffect(() => {
    const intervalo = setInterval(() => {
      indice = (indice + 1) % palavras.length;
      setPalavraAtual(palavras[indice]);
    }, 2000); // Muda a cada 2 segundos

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar
  }, []);

  return (
      <div className="">
        <p className="text-[48px] font-semibold font-poppins text-preto">
          Anunciar seu hotel com a{" "}
          <span className="text-red-600">BonVoyage</span>
        </p>
        <p className="text-[48px] font-semibold font-poppins text-preto">
          é <span className="text-orange-500">{palavraAtual}</span>
        </p>
      </div>
  );
};

export default LetreiroAnimado;