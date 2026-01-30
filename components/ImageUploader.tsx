
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 border-2 border-dashed border-slate-700 rounded-3xl bg-slate-800/50 hover:border-orange-500 transition-all duration-300 group">
      <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Carica la tua foto</h3>
        <p className="text-gray-400 text-sm mb-6">Fatti bello, Giacomo ti sta osservando.</p>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full font-bold text-white shadow-xl transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Analizzando...' : 'Seleziona Immagine'}
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
