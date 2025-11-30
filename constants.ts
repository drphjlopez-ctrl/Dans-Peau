import { ServicePackage, AreaType } from './types';

export const WHATSAPP_NUMBER = "3320433036";

export const SERVICE_MENU: ServicePackage[] = [
  {
    id: 'hydrafacial-basic',
    title: 'Paquete Hydrafacial - Limpieza Profunda',
    price: 250,
    area: AreaType.FACE,
    description: [
      'Hidrodermabrasión',
      'Martillo frío',
      'Pistola de pulverización (Oxygen Spray)',
      'Peeling ultrasónico'
    ],
    bestFor: ['puntos negros', 'piel opaca', 'limpieza', 'hidratación', 'granos leves']
  },
  {
    id: 'fototerapia-cejas',
    title: 'Paquete Fototerapia + Planchado Cejas',
    price: 250,
    area: AreaType.FACE,
    description: [
      'Mascarilla LED',
      'Limpieza superficial',
      'Mascarilla coreana',
      'Planchado de cejas'
    ],
    bestFor: ['cejas rebeldes', 'relajación', 'piel cansada']
  },
  {
    id: 'fototerapia-basic',
    title: 'Paquete Fototerapia Básica',
    price: 210,
    area: AreaType.FACE,
    description: [
      'Mascarilla LED',
      'Limpieza superficial',
      'Mascarilla coreana'
    ],
    bestFor: ['acné activo', 'manchas', 'mantenimiento']
  },
  {
    id: 'maderoterapia-jabon',
    title: 'Maderoterapia Corporal + Jabón Reductivo',
    price: 400,
    area: AreaType.BODY,
    description: [
      'Reducción y afinación de cintura',
      'Levantamiento de glúteos',
      'Reducción de celulitis',
      'Incluye jabón reductivo'
    ],
    bestFor: ['celulitis', 'grasa localizada', 'moldeo corporal']
  },
  {
    id: 'maderoterapia-basic',
    title: 'Maderoterapia Corporal',
    price: 350,
    area: AreaType.BODY,
    description: [
      'Reducción y afinación de cintura',
      'Levantamiento de glúteos',
      'Reducción de celulitis'
    ],
    bestFor: ['celulitis', 'grasa localizada', 'moldeo corporal']
  },
  {
    id: 'hydrafacial-premium',
    title: 'Paquete Hydrafacial Premium',
    price: 350,
    area: AreaType.FACE,
    description: [
      'Limpieza profunda',
      'Radiofrecuencia',
      'Ultrasonido',
      'Fototerapia'
    ],
    bestFor: ['arrugas finas', 'flacidez leve', 'limpieza profunda', 'anti-edad']
  },
  {
    id: 'rf-facial',
    title: 'Paquete Radiofrecuencia Facial',
    price: 350,
    area: AreaType.FACE,
    description: [
      'Limpieza profunda',
      'Radiofrecuencia'
    ],
    bestFor: ['flacidez', 'arrugas', 'producción colágeno', 'lifting']
  },
  {
    id: 'ultrasonido-facial',
    title: 'Paquete Ultrasonido Facial',
    price: 300,
    area: AreaType.FACE,
    description: [
      'Limpieza profunda',
      'Ultrasonido'
    ],
    bestFor: ['inflamación', 'absorción de productos', 'post-operatorio facial']
  },
  {
    id: 'fototerapia-pigmentacion',
    title: 'Paquete Fototerapia + Pigmentación',
    price: 350,
    area: AreaType.FACE,
    description: [
      'Mascarilla LED',
      'Limpieza profunda',
      'Pigmentación de cejas'
    ],
    bestFor: ['cejas poco pobladas', 'manchas', 'acné']
  }
];