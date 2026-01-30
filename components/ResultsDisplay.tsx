
import React from 'react';
import { BeautyResult } from '../types';

interface ResultsDisplayProps {
  result: BeautyResult;
  imageUrl: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, imageUrl, onReset }) => {
  const scorePercentage = Math.round(result.punteggio * 100);
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row">
        {/* Image Preview */}
        <div className="md:w-1/2 h-80 md:h-auto overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt="Tu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-widest bg-orange-600 px-3 py-1 rounded-full font-bold">
              Immagine Analizzata
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bangers text-yellow-400 mb-2">{result.titolo}</h2>
            
            <div className="mb-6 flex items-end gap-2">
              <span className="text-6xl font-black text-orange-500 leading-none">{result.punteggio.toFixed(3)}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">GG</span>
              <div className="ml-4 flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-1000 ease-out"
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed italic mb-8 border-l-4 border-orange-500 pl-4">
              "{result.commento}"
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Osservazioni Cliniche:</h4>
              {result.dettagli.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-orange-500 mt-1">✨</span>
                  <p className="text-sm">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onReset}
            className="w-full py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-colors border border-slate-600"
          >
            Prova con un'altra vittima
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
