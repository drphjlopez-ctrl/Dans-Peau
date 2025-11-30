import React, { useCallback, useState } from 'react';
import { Button } from './Button';

interface ImageUploadProps {
  onImageSelected: (base64: string) => void;
  onAnalyze: () => void;
  area: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, onAnalyze, area }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        // Remove data url prefix for API
        const base64 = result.split(',')[1];
        onImageSelected(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-dans-200">
        <div className="mb-4">
            <h3 className="text-xl font-serif text-dans-800 mb-2">Foto de análisis</h3>
            <p className="text-dans-600 text-sm">
                Para un mejor diagnóstico, sube una foto de tu {area.toLowerCase()} con buena iluminación y sin filtros.
            </p>
        </div>

        <div className="relative w-full aspect-[3/4] max-w-xs mx-auto bg-dans-100 rounded-xl overflow-hidden border-2 border-dashed border-dans-400 flex flex-col items-center justify-center">
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center p-4 hover:bg-dans-200/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-dans-500 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              <span className="text-dans-700 font-semibold">Tomar foto o subir</span>
              <span className="text-xs text-dans-500 mt-1">Formatos: JPG, PNG</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange} 
                capture="user" 
              />
            </label>
          )}
        </div>
      </div>

      {preview && (
        <div className="animate-fade-in">
           <Button variant="primary" fullWidth onClick={onAnalyze}>
             Analizar ahora
           </Button>
           <p className="text-xs text-dans-500 mt-2">La IA de Google analizará tu imagen de forma segura.</p>
        </div>
      )}
    </div>
  );
};