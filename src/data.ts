import { Doctor, MenuItem, Prescription } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-doe',
    name: 'Dr. Roberto Díaz',
    specialty: 'Veterinario Cirujano',
    patients: '2.4k Mascotas',
    experience: '8 años',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80',
    about: 'El Dr. Roberto Díaz es un Cirujano Veterinario senior especializado en cirugía de tejidos blandos, traumatología y cuidado crítico de pequeñas especies. Con más de 8 años de dedicación clínica, brinda atención empática y experta para asegurar la salud de tu mascota.',
  },
  {
    id: 'dr-vance',
    name: 'Dra. Amanda Vargas',
    specialty: 'Veterinaria Cardióloga',
    patients: '3.1k Mascotas',
    experience: '11 años',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&h=400&q=80',
    about: 'La Dra. Amanda Vargas es especialista en Cardiología de pequeños animales y medicina de diagnóstico preventivo. Es apasionada de guiar a los propietarios con terapias innovadoras para mantener corazones de mascotas sanos y fuertes.',
  },
  {
    id: 'dr-sato',
    name: 'Dr. Kenji Sato',
    specialty: 'Etólogo y Neurólogo Vet',
    patients: '1.8k Mascotas',
    experience: '7 años',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=400&q=80',
    about: 'El Dr. Kenji Sato combina la Neurología Veterinaria con la Etología (comportamiento animal). Experto en resolver problemas complejos de comportamiento, ansiedad de separación, trastornos neurológicos y dolor neuropático en caninos y felinos.',
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'appointment',
    label: 'Appointment Request',
    iconName: 'CalendarCheck',
    color: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100',
  },
  {
    id: 'medicine',
    label: 'Medicine',
    iconName: 'Pill',
    color: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
  },
  {
    id: 'doctor',
    label: 'Doctor List',
    iconName: 'Stethoscope',
    color: 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100',
  },
  {
    id: 'history',
    label: 'History Logs',
    iconName: 'ClipboardList',
    color: 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100',
  },
  {
    id: 'consult',
    label: 'AI Consult',
    iconName: 'MessageSquareCode',
    color: 'bg-purple-50 text-purple-500 hover:bg-purple-100',
  },
  {
    id: 'patients',
    label: 'Today\'s Patients',
    iconName: 'UserCheck',
    color: 'bg-pink-50 text-pink-500 hover:bg-pink-100',
  },
  {
    id: 'customer_service',
    label: 'Support Chat',
    iconName: 'PhoneCall',
    color: 'bg-amber-50 text-amber-500 hover:bg-amber-100',
  },
  {
    id: 'hospital',
    label: 'Hospitals Finder',
    iconName: 'Building2',
    color: 'bg-teal-50 text-teal-500 hover:bg-teal-100',
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'p1',
    name: 'Desparasitante NextGard (Max - Canino)',
    dosage: '1 masticable',
    frequency: 'Mensual',
    taken: false,
    time: '08:00 AM',
  },
  {
    id: 'p2',
    name: 'Condroprotector Articular JointVet (Luna - Felino)',
    dosage: '1/2 tableta',
    frequency: 'Diario con comida',
    taken: true,
    time: '12:30 PM',
  },
  {
    id: 'p3',
    name: 'Tratamiento Otitis Otovet Gotas (Max - Canino)',
    dosage: '3 gotas por oído',
    frequency: 'Cada 12 horas',
    taken: false,
    time: '09:30 PM',
  }
];

export const TODAY_PATIENTS = [
  { id: 'pat1', name: 'Max (Golden Retriever)', time: '09:30 AM', reason: 'Vacunación Séxtuple y Rabia', status: 'completed', ownerName: 'Sophia Martinez' },
  { id: 'pat2', name: 'Luna (Gato Siamés)', time: '11:00 AM', reason: 'Chequeo por Tos y Deshidratación', status: 'in-progress', ownerName: 'Lucas Williams' },
  { id: 'pat3', name: 'Rocky (Bulldog Francés)', time: '01:30 PM', reason: 'Tratamiento Alergias en Piel', status: 'upcoming', ownerName: 'Emma Watson' },
  { id: 'pat4', name: 'Coco (Loro Gris)', time: '03:00 PM', reason: 'Revisión periódica de Plumaje', status: 'upcoming', ownerName: 'Liam Neeson' }
];

export const HOSPITALS = [
  { name: 'Hospital de Emergencias Veterinarias VetCare 24/7', address: 'Av. Principal de Mascotas #525', rating: '4.9', distance: '0.8 km' },
  { name: 'Clínica Veterinaria Central San Francisco', address: 'Calle San Francisco #1468', rating: '4.7', distance: '2.1 km' },
  { name: 'Hospital de Animales y Exóticos del Este', address: 'Av. Las Flores #550', rating: '4.8', distance: '3.5 km' },
  { name: 'Centro Veterinario de Especialidades Médicas', address: 'Av. Circunvalación #100', rating: '4.5', distance: '5.2 km' }
];
