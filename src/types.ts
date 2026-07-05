export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  patients: string;
  experience: string;
  rating: number;
  avatar: string;
  about: string;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  color: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string; // e.g., "Saturday, June 20, 2021"
  time: string; // e.g., "12:00"
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  taken: boolean;
  time: string;
}

export type UserRole = 'admin' | 'veterinarian' | 'receptionist' | 'client';

