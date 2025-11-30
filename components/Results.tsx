import React from 'react';
import { AnalysisResult, ServicePackage } from '../types';
import { SERVICE_MENU, WHATSAPP_NUMBER } from '../constants';
import { Button } from './Button';

interface ResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const recommendedService: ServicePackage | undefined = SERVICE_MENU.find(s => s.id === result.recommendedPackageId);

  if (!recommendedService) {
    return (
      <div className="text-center p-6">
        <p>Lo sentimos, no pudimos encontrar el paquete recomendado.</p>
        <Button onClick={onReset}>Intentar de nuevo</Button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hola Dans Peau, mi consultora virtual me recomendó el *${recommendedService.title}* ($${recommendedService.price}). Se estiman *${result.estimatedSessions}*. Me gustaría agendar una cita.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-dans-200">
        <h3 className="text-2xl font-serif text-dans-800 mb-4">Diagnóstico</h3>
        <p className="text-dans-700 leading-relaxed mb-4">
          {result.diagnosis}
        </p>
        
        <div className="bg-dans-50 p-4 rounded-xl border border-dans-100">
            <h4 className="font-bold text-dans-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dans-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Por qué este tratamiento:
            </h4>
            <p className="text-sm text-dans-600 italic">
                "{result.reasoning}"
            </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-dans-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
            <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-1">Tu tratamiento ideal</div>
            <h2 className="text-2xl font-serif font-bold mb-2">{recommendedService.title}</h2>
            <div className="flex flex-col gap-1 mb-4">
                <div className="text-3xl font-bold">${recommendedService.price} <span className="text-sm font-normal opacity-80">/ sesión</span></div>
                <div className="inline-flex items-center gap-1.5 bg-white/20 w-fit px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                   </svg>
                   <span>Recomendado: {result.estimatedSessions}</span>
                </div>
            </div>
            
            <ul className="space-y-2 mb-6 text-dans-100 text-sm">
                {recommendedService.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-dans-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                    </li>
                ))}
            </ul>

            <Button onClick={handleWhatsApp} className="w-full bg-white text-dans-800 font-bold hover:bg-dans-50 border-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Agendar por WhatsApp
            </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-dans-200">
        <h4 className="font-serif font-bold text-dans-800 text-lg mb-3">Rutina diaria recomendada</h4>
        <ul className="space-y-4">
            {result.routineAdvice.map((tip, idx) => (
                <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dans-100 text-dans-700 flex items-center justify-center font-bold font-serif">
                        {idx + 1}
                    </span>
                    <p className="text-dans-700 mt-1">{tip}</p>
                </li>
            ))}
        </ul>
      </div>

      <div className="text-center">
          <button onClick={onReset} className="text-dans-500 hover:text-dans-800 underline text-sm">
              Realizar otro análisis
          </button>
      </div>
    </div>
  );
};