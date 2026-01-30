
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { AppState } from './types';
import { analyzeBeauty } from './services/geminiService';

// The AIStudio interface and window.aistudio property are pre-configured in this environment.
// Custom declarations are removed to avoid "Duplicate identifier" and modifier mismatch errors.

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [checkingKey, setCheckingKey] = useState<boolean>(true);
  const [state, setState] = useState<AppState>({
    image: null,
    loading: false,
    result: null,
    error: null,
  });

  useEffect(() => {
    const checkKey = async () => {
      try {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } catch (e) {
        console.error("Key check error", e);
      } finally {
        setCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    // Questo apre la finestra di dialogo per incollare/selezionare la chiave API
    await window.aistudio.openSelectKey();
    setHasKey(true);
  };

  const handleImageSelected = async (base64: string) => {
    setState(prev => ({ ...prev, image: base64, loading: true, error: null, result: null }));
    try {
      const result = await analyzeBeauty(base64);
      setState(prev => ({ ...prev, loading: false, result }));
    } catch (err: any) {
      if (err.message?.includes("Chiave API non valida")) {
          setHasKey(false);
      }
      setState(prev => ({ ...prev, loading: false, error: err.message }));
    }
  };

  const handleReset = () => {
    setState({ image: null, loading: false, result: null, error: null });
  };

  if (checkingKey) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><LoadingSpinner /></div>;

  if (!hasKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-950">
        <Header />
        <div className="max-w-md w-full p-10 bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl text-center border-t-yellow-500/50">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-lg shadow-orange-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Accesso Riservato</h2>
          <p className="text-gray-400 mb-8 text-balance">
            Il Giudizio di Giacomo richiede l'autenticazione. Clicca sotto per <strong>incollare la tua API Key</strong> e sbloccare il Guglielmometer.
          </p>
          <button 
            onClick={handleOpenKeyDialog}
            className="w-full py-4 bg-white text-slate-950 hover:bg-yellow-400 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95"
          >
            INCOLLA API KEY
          </button>
          <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest">
            Usa una chiave Gemini AI con fatturazione attiva <br/>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-yellow-500">Documentazione Billing</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4 bg-slate-950 selection:bg-orange-500/30">
      <Header />
      <main className="max-w-5xl mx-auto mt-8">
        {!state.image && !state.loading && !state.result && (
          <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <ImageUploader onImageSelected={handleImageSelected} disabled={state.loading} />
            <div className="mt-8 p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl text-orange-200/60 text-xs text-center leading-relaxed">
              L'algoritmo è attualmente impostato sulla modalità <strong>"Severità Guglielmi"</strong>. 
              Preparati psicologicamente a un punteggio molto basso.
            </div>
          </div>
        )}

        {state.loading && <div className="max-w-md mx-auto mt-20"><LoadingSpinner /></div>}

        {state.error && (
          <div className="max-w-md mx-auto mt-10 p-8 bg-red-500/10 border border-red-500/30 rounded-3xl text-center">
            <div className="text-5xl mb-6">🤌</div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">Errore di Dignità</h3>
            <p className="text-red-200/70 mb-8">{state.error}</p>
            <button onClick={handleReset} className="px-10 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-all">Riprova</button>
          </div>
        )}

        {state.result && state.image && <ResultsDisplay result={state.result} imageUrl={state.image} onReset={handleReset} />}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        Guglielmometer v2.0 • Verità Assoluta • © 2024
      </footer>
    </div>
  );
};

export default App;
