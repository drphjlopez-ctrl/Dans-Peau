import React from 'react';
import { UserProfile, SkinType, AreaType } from '../types';
import { Button } from './Button';

interface IntakeFormProps {
  onSubmit: (data: UserProfile) => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<UserProfile>({
    name: '',
    age: '',
    skinType: SkinType.MIXED,
    concerns: '',
    area: AreaType.FACE
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <label className="block text-dans-800 font-bold mb-2">Nombre</label>
          <input
            required
            type="text"
            className="w-full p-3 rounded-lg border border-dans-300 bg-white focus:ring-2 focus:ring-dans-500 focus:outline-none"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-dans-800 font-bold mb-2">Edad</label>
              <input
                required
                type="number"
                className="w-full p-3 rounded-lg border border-dans-300 bg-white focus:ring-2 focus:ring-dans-500 focus:outline-none"
                placeholder="25"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-dans-800 font-bold mb-2">Zona a tratar</label>
              <select
                className="w-full p-3 rounded-lg border border-dans-300 bg-white focus:ring-2 focus:ring-dans-500 focus:outline-none"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value as AreaType})}
              >
                {Object.values(AreaType).map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
        </div>

        {formData.area === AreaType.FACE && (
          <div>
            <label className="block text-dans-800 font-bold mb-2">Tipo de piel</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(SkinType).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, skinType: type})}
                  className={`p-2 text-sm rounded-lg border ${
                    formData.skinType === type 
                    ? 'bg-dans-700 text-white border-dans-700' 
                    : 'bg-white text-dans-600 border-dans-300 hover:bg-dans-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-dans-800 font-bold mb-2">
            {formData.area === AreaType.FACE ? 'Principales preocupaciones' : 'Objetivos corporales'}
          </label>
          <textarea
            required
            rows={3}
            className="w-full p-3 rounded-lg border border-dans-300 bg-white focus:ring-2 focus:ring-dans-500 focus:outline-none"
            placeholder={formData.area === AreaType.FACE ? "Ej: Acné, manchas, arrugas, puntos negros..." : "Ej: Celulitis en piernas, reducir cintura..."}
            value={formData.concerns}
            onChange={(e) => setFormData({...formData, concerns: e.target.value})}
          />
        </div>
      </div>

      <Button type="submit" fullWidth>
        Siguiente paso
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Button>
    </form>
  );
};