export enum SkinType {
  OILY = 'Grasa',
  DRY = 'Seca',
  MIXED = 'Mixta',
  SENSITIVE = 'Sensible',
  NORMAL = 'Normal'
}

export enum AreaType {
  FACE = 'Rostro',
  BODY = 'Cuerpo'
}

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  description: string[];
  area: AreaType;
  bestFor: string[]; // Keywords for AI matching
}

export interface UserProfile {
  name: string;
  age: string;
  skinType: SkinType;
  concerns: string;
  area: AreaType;
}

export interface AnalysisResult {
  diagnosis: string;
  recommendedPackageId: string;
  reasoning: string;
  estimatedSessions: string;
  routineAdvice: string[];
}