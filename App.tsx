import React, { useState } from 'react';
import { IntakeForm } from './components/IntakeForm';
import { ImageUpload } from './components/ImageUpload';
import { Results } from './components/Results';
import { UserProfile, AnalysisResult } from './types';
import { analyzeSkinCondition } from './services/geminiService';

enum Step {
  INTAKE = 1,
  PHOTO = 2,
  ANALYZING = 3,
  RESULTS = 4
}

export default function App() {
  const [step, setStep] = useState<Step>(Step.INTAKE);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIntakeSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep(Step.PHOTO);
    window.scrollTo(0, 0);
  };

  const handleImageSelected = (base64: string) => {
    setImageBase64(base64);
  };

  const startAnalysis = async () => {
    if (!userProfile || !imageBase64) return;
    
    setStep(Step.ANALYZING);
    setError(null);
    window.scrollTo(0, 0);

    try {
      const result = await analyzeSkinCondition(userProfile, imageBase64);
      setAnalysisResult(result);
      setStep(Step.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al analizar tu imagen. Por favor intenta con otra foto.");
      setStep(Step.PHOTO);
    }
  };

  const resetApp = () => {
    setStep(Step.INTAKE);
    setUserProfile(null);
    setImageBase64(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-dans-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-dans-800 text-white flex items-center justify-center font-serif text-lg font-bold">D</div>
             <span className="font-serif text-dans-800 text-xl font-semibold">Dans Peau</span>
          </div>
          <div className="text-xs font-bold text-dans-400 uppercase tracking-widest">Sana tu piel</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md px-6 py-8 flex-grow">
        
        {/* Progress Bar */}
        {step !== Step.RESULTS && (
            <div className="flex items-center justify-center mb-8 gap-2">
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= s ? 'bg-dans-600' : 'bg-dans-200'}`} />
                ))}
            </div>
        )}

        {/* Views */}
        {step === Step.INTAKE && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-serif text-dans-900 mb-2">Consulta Virtual</h1>
            <p className="text-dans-600 mb-6">Completa tus datos para recibir una recomendación personalizada de nuestros especialistas.</p>
            <IntakeForm onSubmit={handleIntakeSubmit} />
          </div>
        )}

        {step === Step.PHOTO && (
          <div className="animate-fade-in">
             <button onClick={() => setStep(Step.INTAKE)} className="text-sm text-dans-500 mb-4 flex items-center gap-1 hover:text-dans-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Volver
             </button>
             <ImageUpload 
                onImageSelected={handleImageSelected} 
                onAnalyze={startAnalysis} 
                area={userProfile?.area || 'rostro'} 
             />
             
             {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
                    {error}
                </div>
             )}
          </div>
        )}

        {step === Step.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-dans-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-dans-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-serif text-dans-800 mb-2">Analizando tu piel...</h3>
            <p className="text-dans-600 max-w-xs mx-auto">Nuestra inteligencia artificial está revisando tus preocupaciones y buscando el mejor tratamiento.</p>
          </div>
        )}

        {step === Step.RESULTS && analysisResult && (
          <Results result={analysisResult} onReset={resetApp} />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-6 border-t border-dans-100 mt-auto">
        <div className="max-w-md mx-auto px-6 text-center">
            <p className="text-dans-800 font-serif font-semibold">Dans Peau</p>
            <p className="text-dans-400 text-xs mt-1">Sana tu piel</p>
            <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-dans-400 hover:text-dans-600">
                    <span className="sr-only">Instagram</span>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.18 3.388c.636-.247 1.363-.416 2.427-.465C7.674 2.012 8.028 2 12.315 2zm-3.15 7.009a3.15 3.15 0 100 6.3 3.15 3.15 0 000-6.3zm3.15-4.409c-2.318 0-2.613.01-3.535.052-.921.042-1.547.19-2.096.403a2.9 2.9 0 00-1.054.686 2.9 2.9 0 00-.686 1.054c-.213.549-.361 1.175-.403 2.096-.042.922-.052 1.217-.052 3.535s.01 2.613.052 3.535c.042.921.19 1.547.403 2.096.166.428.4.816.686 1.054.238.286.626.52 1.054.686.549.213 1.175.361 2.096.403.922.042 1.217.052 3.535.052s2.613-.01 3.535-.052c.921-.042 1.547-.19 2.096-.403a2.9 2.9 0 001.054-.686 2.9 2.9 0 00.686-1.054c.213-.549.361-1.175.403-2.096.042-.922.052-1.217.052-3.535s-.01-2.613-.052-3.535c-.042-.921-.19-1.547-.403-2.096a2.9 2.9 0 00-.686-1.054 2.9 2.9 0 00-1.054-.686c-.549-.213-1.175-.361-2.096-.403-.922-.042-1.217-.052-3.535-.052zM12.315 7.5a4.815 4.815 0 110 9.63 4.815 4.815 0 010-9.63zm4.557-1.396a1.11 1.11 0 110 2.22 1.11 1.11 0 010-2.22z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-dans-400 hover:text-dans-600">
                    <span className="sr-only">Facebook</span>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
}