
import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Consultando il sommo Giacomo...",
    "Misurando l'angolazione dei tuoi zigomi...",
    "Confrontando con le divinità dell'Olimpo...",
    "Calcolando i decimali della tua bellezza...",
    "Giacomo sta decidendo il tuo destino...",
    "Analisi della perfezione in corso..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
      </div>
      <p className="text-xl font-medium text-orange-400 animate-pulse text-center">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingSpinner;
