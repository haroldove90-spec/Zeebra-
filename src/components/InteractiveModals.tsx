import React from 'react';
import { 
  X, 
  Check, 
  Pill, 
  ClipboardList, 
  Search, 
  Send,
  Sparkles,
  HeartPulse,
  Trash2,
  AlertCircle,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Lock,
  Shield,
  Heart,
  PlusCircle,
  User,
  UserPlus,
  PhoneCall,
  Building2
} from 'lucide-react';
import { Prescription, Appointment, Message, UserRole } from '../types';
import { HOSPITALS } from '../data';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ModalWrapper({ isOpen, onClose, title, icon, children }: ModalWrapperProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden" id={`modal-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
      <div className="bg-white w-full sm:max-w-md md:max-w-lg h-[80vh] sm:h-auto max-h-[85vh] sm:max-h-[90vh] rounded-t-[32px] sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-slide-up" id="modal-content">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
              {icon}
            </div>
            <h3 className="text-xs font-bold text-slate-800 tracking-wide">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
            id="modal-close-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 text-xs text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
}

// 1. Medicine prescription tracker modal (Adapted to Roles)
interface MedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescriptions: Prescription[];
  onTogglePrescription: (id: string) => void;
  onAddPrescription: (name: string, dosage: string, frequency: string, time: string) => void;
  currentRole: UserRole;
}

export function MedicineModal({ 
  isOpen, 
  onClose, 
  prescriptions, 
  onTogglePrescription, 
  onAddPrescription,
  currentRole
}: MedicineModalProps) {
  const [newMedName, setNewMedName] = React.useState('');
  const [newDosage, setNewDosage] = React.useState('');
  const [newFreq, setNewFreq] = React.useState('');
  const [newTime, setNewTime] = React.useState('08:00 AM');
  const [showAddForm, setShowAddForm] = React.useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;
    onAddPrescription(newMedName, newDosage || '1 tableta', newFreq || 'Diario', newTime);
    setNewMedName('');
    setNewDosage('');
    setNewFreq('');
    setShowAddForm(false);
  };

  const isStaff = currentRole === 'admin' || currentRole === 'veterinarian';

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={isStaff ? "Prescribir Medicamentos" : "Medicamentos de Mascota"} icon={<Pill className="h-4.5 w-4.5" />}>
      <div className="space-y-4" id="medicine-modal-inner">
        
        {/* Context subtitle */}
        <p className="text-[10.5px] text-slate-400 leading-normal">
          {currentRole === 'client' 
            ? "Lleva el control de los medicamentos de tu mascota. Marca las dosis administradas para asegurar su bienestar clínico."
            : currentRole === 'receptionist'
            ? "Módulo de consulta de medicamentos. Solo los veterinarios certificados y administradores pueden prescribir nuevos fármacos."
            : "Formulación de recetas clínicas. Escribe nuevos medicamentos para añadir al expediente del paciente de forma instantánea."}
        </p>

        {/* List of medications */}
        <div className="space-y-2.5" id="medications-list">
          {prescriptions.map((med) => (
            <div 
              key={med.id} 
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                med.taken 
                  ? 'bg-emerald-50/40 border-emerald-100/80 text-slate-500 line-through' 
                  : 'bg-white border-slate-100 shadow-sm text-slate-800'
              }`}
              id={`med-item-${med.id}`}
            >
              <div className="flex items-start space-x-2.5">
                <button
                  onClick={() => {
                    if (currentRole === 'receptionist') return; // Readonly for reception
                    onTogglePrescription(med.id);
                  }}
                  disabled={currentRole === 'receptionist'}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all mt-0.5 ${
                    currentRole === 'receptionist' ? 'cursor-not-allowed border-slate-200' : 'cursor-pointer'
                  } ${
                    med.taken 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-300 hover:border-cyan-500 bg-white'
                  }`}
                  id={`med-check-${med.id}`}
                >
                  {med.taken && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </button>
                <div>
                  <h4 className={`text-xs font-bold ${med.taken ? 'text-slate-400' : 'text-slate-800'}`}>{med.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{med.dosage} • {med.frequency}</p>
                </div>
              </div>
              <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold ${med.taken ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-cyan-600'}`}>
                {med.time}
              </span>
            </div>
          ))}
        </div>

        {/* Add new medication toggle - Only for Vets and Admin */}
        {isStaff ? (
          showAddForm ? (
            <form onSubmit={handleAdd} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2.5" id="add-medication-form">
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1">
                <PlusCircle className="h-3.5 w-3.5 text-cyan-500" />
                <span>Nueva Prescripción Médica</span>
              </h4>
              <div>
                <input
                  type="text"
                  placeholder="Fármaco (ej: Antibiótico Clavar)"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                  required
                  id="input-med-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Dosis (ej: 1 tableta)"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                  id="input-med-dosage"
                />
                <input
                  type="text"
                  placeholder="Frecuencia (ej: Cada 12h)"
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value)}
                  className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                  id="input-med-freq"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Hora (ej: 09:30 PM)"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                  id="input-med-time"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-[10px] rounded-lg cursor-pointer transition-colors"
                  id="btn-submit-med"
                >
                  Confirmar Receta
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full border border-dashed border-slate-300 hover:border-cyan-500 text-cyan-600 hover:text-cyan-700 font-semibold py-2.5 rounded-xl text-center cursor-pointer transition-colors text-[11px]"
              id="btn-show-add-med"
            >
              + Prescribir Nuevo Medicamento (Médico)
            </button>
          )
        ) : (
          currentRole === 'client' && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center space-x-2.5 text-slate-500 text-[10px]" id="client-add-disclaimer">
              <AlertCircle className="h-4 w-4 text-cyan-500 shrink-0" />
              <span>Para prescribir nuevos fármacos de espectro clínico, contacta a tu médico o utiliza la barra superior para cambiar a rol <strong>Veterinario</strong>.</span>
            </div>
          )
        )}
      </div>
    </ModalWrapper>
  );
}

// 2. Appointment Booking History logs
interface HistoryLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  currentRole: UserRole;
}

export function HistoryLogsModal({ isOpen, onClose, appointments, onCancelAppointment, currentRole }: HistoryLogsModalProps) {
  const isClient = currentRole === 'client';
  
  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isClient ? "Historial Médico de Mascotas" : "Registro de Agenda y Citas"} 
      icon={<ClipboardList className="h-4.5 w-4.5" />}
    >
      <div className="space-y-4" id="history-modal-inner">
        <p className="text-[10.5px] text-slate-400 leading-normal">
          {isClient 
            ? "Revisa las citas agendadas para tus mascotas, el estatus de las visitas y cancela citas que no requieras."
            : "Consola de control de agenda de la clínica. Visualización de turnos asignados por paciente de Max, Luna, Rocky y Coco."}
        </p>

        <div className="space-y-3" id="appointments-history-list">
          {appointments.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400" id="empty-history-state">
              <ClipboardList className="h-8 w-8 mx-auto stroke-[1.2] text-slate-300 mb-2" />
              <span>No hay registros de citas en el sistema.</span>
            </div>
          ) : (
            appointments.map((app) => (
              <div 
                key={app.id} 
                className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs space-y-2.5 flex flex-col justify-between"
                id={`app-history-item-${app.id}`}
              >
                {/* Doctor / Pet Info */}
                <div className="flex items-center space-x-2.5">
                  <img 
                    src={app.doctorAvatar} 
                    alt={app.doctorName} 
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    id={`history-avatar-${app.id}`}
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-800">{app.doctorName}</h4>
                    <p className="text-[9.5px] text-slate-400 font-semibold">{app.doctorSpecialty}</p>
                    <div className="mt-1 flex items-center space-x-1.5">
                      <span className="text-[8px] bg-slate-100 px-1.5 py-0.2 rounded font-extrabold text-slate-500 uppercase">
                        Paciente: {app.patientName || "Max (Golden)"}
                      </span>
                    </div>
                  </div>
                  {/* Status Badge */}
                  <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-bold ${
                    app.status === 'upcoming' 
                      ? 'bg-cyan-50 text-cyan-600' 
                      : app.status === 'cancelled' 
                      ? 'bg-rose-50 text-rose-500' 
                      : 'bg-slate-100 text-slate-500'
                  }`} id={`history-status-${app.id}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>

                {/* Date & Time details */}
                <div className="flex justify-between items-center bg-slate-50 rounded-lg p-2 text-[10px] text-slate-500 font-medium" id={`history-schedule-${app.id}`}>
                  <span className="truncate pr-2">{app.date}</span>
                  <span className="font-bold text-slate-700 bg-white border border-slate-200/50 rounded px-1.5 py-0.5 shrink-0">{app.time}</span>
                </div>

                {/* Cancel Trigger - only allowed for Clients, Receptionists, Admins */}
                {app.status === 'upcoming' && currentRole !== 'veterinarian' && (
                  <button
                    onClick={() => onCancelAppointment(app.id)}
                    className="w-full py-1.5 text-center text-rose-500 hover:text-rose-600 bg-rose-50/50 hover:bg-rose-50 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    id={`btn-cancel-app-${app.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Cancelar Cita</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

// 3. AI Consulting Medical chat modal
interface AIConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isReplying: boolean;
  currentRole: UserRole;
}

export function AIConsultModal({ isOpen, onClose, messages, onSendMessage, isReplying, currentRole }: AIConsultModalProps) {
  const [inputText, setInputText] = React.useState('');
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isReplying]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isReplying) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const isClinician = currentRole === 'veterinarian' || currentRole === 'admin';

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isClinician ? "AI Vet Diagnostic Assistant" : "AI VetCare Consultor Mascotas"} 
      icon={<Sparkles className="h-4.5 w-4.5" />}
    >
      <div className="flex flex-col h-[380px]" id="ai-consult-container">
        {/* Warning label */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 flex items-start space-x-2 text-[9.5px] leading-relaxed text-amber-700 shrink-0" id="ai-disclaimer">
          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
          <span>
            {isClinician 
              ? "Herramienta de asistencia diagnóstica veterinaria basada en IA. No sustituye el criterio clínico final del médico de guardia."
              : "Consultor de IA para orientación primaria de mascotas. Para emergencias graves o cirugías, acude de inmediato a urgencias."}
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1" id="ai-chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`} id={`ai-msg-${m.id}`}>
              <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed ${m.sender === 'user' ? 'bg-[#3db5d7] text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                {m.text}
              </div>
              <span className="text-[8px] text-slate-400 mt-1 px-1 font-medium">{m.timestamp}</span>
            </div>
          ))}

          {isReplying && (
            <div className="flex flex-col items-start max-w-[85%] mr-auto" id="msg-replying-typing">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-500 rounded-tl-none flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="mt-3 flex items-center space-x-2 bg-slate-50 border border-slate-100 p-1.5 rounded-full" id="ai-input-form">
          <input
            type="text"
            placeholder={isClinician ? "Pregunta sobre dosis de antibióticos o síntomas..." : "Pregunta sobre tu perro o gato (ej: ¿Por qué estornuda mi gato?)"}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isReplying}
            className="flex-1 bg-transparent border-none text-xs outline-none px-3 py-1 text-slate-800 disabled:opacity-50 placeholder-slate-400"
            id="input-ai-chat"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isReplying}
            className="w-8 h-8 rounded-full bg-[#3db5d7] disabled:bg-slate-300 text-white flex items-center justify-center cursor-pointer transition-colors hover:bg-cyan-600 shadow-sm"
            id="btn-send-ai-message"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}

// 4. Patients List Modal OR Client Pets Manager (Adapted to Roles!)
interface PatientsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
}

export function PatientsListModal({ isOpen, onClose, currentRole }: PatientsListModalProps) {
  // Local state for staff patient queue
  const [patients, setPatients] = React.useState([
    { id: 'pat1', name: 'Max (Golden Retriever)', time: '09:30 AM', reason: 'Vacunación Séxtuple y Rabia', status: 'completed', ownerName: 'Sophia Martinez' },
    { id: 'pat2', name: 'Luna (Gato Siamés)', time: '11:00 AM', reason: 'Chequeo por Tos y Deshidratación', status: 'in-progress', ownerName: 'Lucas Williams' },
    { id: 'pat3', name: 'Rocky (Bulldog Francés)', time: '01:30 PM', reason: 'Tratamiento Alergias en Piel', status: 'upcoming', ownerName: 'Emma Watson' },
    { id: 'pat4', name: 'Coco (Loro Gris)', time: '03:00 PM', reason: 'Revisión periódica de Plumaje', status: 'upcoming', ownerName: 'Liam Neeson' }
  ]);

  // Client mode pets database
  const [pets, setPets] = React.useState([
    { id: 'pet-1', name: 'Max', breed: 'Golden Retriever', age: '2 años', weight: '32 kg', status: 'Saludable', vaccine: 'Séxtuple de Refuerzo (12 Jul)', avatar: '🐶' },
    { id: 'pet-2', name: 'Luna', breed: 'Gato Siamés', age: '1 año', weight: '4.2 kg', status: 'Tratamiento Otitis', vaccine: 'Triple Felina (Al día)', avatar: '🐱' }
  ]);

  const [showAddPet, setShowAddPet] = React.useState(false);
  const [newPetName, setNewPetName] = React.useState('');
  const [newPetBreed, setNewPetBreed] = React.useState('');
  const [newPetAge, setNewPetAge] = React.useState('');
  const [newPetWeight, setNewPetWeight] = React.useState('');

  const handleAddPetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName || !newPetBreed) return;
    const newPet = {
      id: `pet-${Date.now()}`,
      name: newPetName,
      breed: newPetBreed,
      age: newPetAge || '6 meses',
      weight: newPetWeight || '5 kg',
      status: 'Chequeo Inicial Pendiente',
      vaccine: 'Ninguna (Requiere revisión)',
      avatar: newPetBreed.toLowerCase().includes('gato') || newPetBreed.toLowerCase().includes('cat') ? '🐱' : '🐶'
    };
    setPets(prev => [...prev, newPet]);
    setNewPetName('');
    setNewPetBreed('');
    setNewPetAge('');
    setNewPetWeight('');
    setShowAddPet(false);
  };

  const handleUpdateStatus = (patId: string, nextStatus: string) => {
    setPatients(prev => prev.map(p => p.id === patId ? { ...p, status: nextStatus } : p));
  };

  const isClient = currentRole === 'client';

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isClient ? "Mi Expediente de Mascotas" : "Fichas Médicas de Pacientes de Hoy"} 
      icon={isClient ? <Heart className="h-4.5 w-4.5 text-cyan-600 fill-current" /> : <User className="h-4.5 w-4.5" />}
    >
      <div className="space-y-4" id="patients-modal-inner">
        
        {isClient ? (
          /* CLIENT VIEW: MY PETS FILE MANAGER */
          <div className="space-y-3" id="client-pets-container">
            <p className="text-[10.5px] text-slate-400 leading-normal">
              Revisa el expediente general, vacunas y peso de tus mascotas registradas en VetCare.
            </p>

            <div className="space-y-3" id="client-pets-list">
              {pets.map(p => (
                <div key={p.id} className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-2 flex flex-col" id={`pet-card-${p.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-lg shadow-inner">
                        {p.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{p.name} <span className="text-[9px] font-normal text-slate-400">({p.breed})</span></h4>
                        <p className="text-[9px] text-slate-400">Edad: {p.age} • Peso: {p.weight}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                      {p.status}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 p-2 rounded-xl text-[9.5px] text-slate-500 flex items-center justify-between border border-slate-100" id={`pet-vaccine-${p.id}`}>
                    <span className="font-bold text-slate-400 text-[8px] uppercase">Control Vacunas:</span>
                    <span className="font-bold text-slate-700">{p.vaccine}</span>
                  </div>
                </div>
              ))}
            </div>

            {showAddPet ? (
              <form onSubmit={handleAddPetSubmit} className="bg-slate-50 p-3 rounded-2xl border border-slate-150 space-y-2.5 animate-fade-in" id="add-pet-form">
                <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1">
                  <UserPlus className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Registrar Nueva Mascota</span>
                </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre (ej: Bruno)"
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    required
                    className="w-full bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                    id="input-pet-name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Raza (ej: Schnauzer o Gato Mestizo)"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    required
                    className="w-full bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                    id="input-pet-breed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Edad (ej: 3 años)"
                    value={newPetAge}
                    onChange={(e) => setNewPetAge(e.target.value)}
                    className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                    id="input-pet-age"
                  />
                  <input
                    type="text"
                    placeholder="Peso (ej: 14 kg)"
                    value={newPetWeight}
                    onChange={(e) => setNewPetWeight(e.target.value)}
                    className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500 text-slate-800"
                    id="input-pet-weight"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3db5d7] hover:bg-cyan-600 text-white text-[10px] py-2 rounded-lg font-bold transition-colors cursor-pointer"
                  id="btn-submit-pet"
                >
                  Registrar Ficha de Mascota
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddPet(true)}
                className="w-full border border-dashed border-slate-300 hover:border-cyan-500 text-cyan-600 hover:text-cyan-750 font-bold py-2.5 rounded-xl text-center cursor-pointer transition-colors"
                id="btn-show-add-pet"
              >
                + Registrar Nueva Mascota en mi Perfil
              </button>
            )}
          </div>
        ) : (
          /* CLINICAL VIEW: PATIENT QUEUE (VET, RECEPTIONIST, ADMIN) */
          <div className="space-y-3" id="clinic-patients-container">
            <p className="text-[10.5px] text-slate-400 leading-normal">
              Expediente clínico del turno activo. Los médicos y recepcionistas pueden interactuar para actualizar estados.
            </p>

            <div className="space-y-2.5" id="patients-queue-list">
              {patients.map((p) => (
                <div 
                  key={p.id} 
                  className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs flex flex-col space-y-2 justify-between"
                  id={`patient-item-${p.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold text-xs shadow-inner">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{p.name}</h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5">{p.reason}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1" id={`patient-meta-${p.id}`}>
                      <span className="text-[9.5px] text-slate-500 font-bold flex items-center space-x-0.5 bg-slate-50 border border-slate-150 rounded px-1.5 py-0.5">
                        <Clock className="h-2.5 w-2.5 text-cyan-500" />
                        <span>{p.time}</span>
                      </span>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                        p.status === 'completed' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : p.status === 'in-progress' 
                          ? 'bg-amber-50 text-amber-500 animate-pulse border border-amber-100' 
                          : 'bg-slate-100 text-slate-500'
                      }`} id={`patient-status-${p.id}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions depending on Role */}
                  <div className="border-t border-slate-50 pt-2 flex justify-end space-x-1.5" id={`patient-actions-${p.id}`}>
                    {/* Vet actions */}
                    {currentRole === 'veterinarian' && p.status === 'upcoming' && (
                      <button
                        onClick={() => handleUpdateStatus(p.id, 'in-progress')}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[9px] px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Iniciar Consulta Médica
                      </button>
                    )}
                    {currentRole === 'veterinarian' && p.status === 'in-progress' && (
                      <button
                        onClick={() => handleUpdateStatus(p.id, 'completed')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[9px] px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Completar y Guardar Receta
                      </button>
                    )}

                    {/* Receptionist actions */}
                    {currentRole === 'receptionist' && p.status === 'upcoming' && (
                      <button
                        onClick={() => handleUpdateStatus(p.id, 'in-progress')}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-[9px] px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Marcar Check-In Entrada
                      </button>
                    )}

                    {/* Admin can override any */}
                    {currentRole === 'admin' && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleUpdateStatus(p.id, 'in-progress')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[8.5px] px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          Simular Progreso
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(p.id, 'completed')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[8.5px] px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          Simular Completado
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

// 5. Customer Service support chat modal
interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
}

export function SupportChatModal({ isOpen, onClose, currentRole }: SupportChatModalProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: '1', sender: 'assistant', text: "¡Hola! Bienvenido al canal de Soporte Técnico de VetCare. ¿En qué podemos ayudarte hoy?", timestamp: 'Just now' }
  ]);
  const [input, setInput] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      sender: currentRole === 'receptionist' ? 'assistant' : 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Trigger automated reply only if client sent the message
    if (currentRole !== 'receptionist') {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `m-reply-${Date.now()}`,
          sender: 'assistant',
          text: "Gracias por escribir. Laura en recepción ha recibido tu ticket. Nos comunicaremos contigo en menos de 2 minutos para confirmar los detalles.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1000);
    } else {
      // Receptionist mode response confirmation
      setTimeout(() => {
        const replyMsg: Message = {
          id: `m-reply-${Date.now()}`,
          sender: 'user',
          text: "[Simulador] El cliente recibió tu respuesta administrativa. ¡Transacción completada!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1200);
    }
  };

  const isOperator = currentRole === 'receptionist' || currentRole === 'admin';

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isOperator ? "Mesa de Operador de Soporte" : "Chat de Soporte con Recepción"} 
      icon={<PhoneCall className="h-4.5 w-4.5" />}
    >
      <div className="flex flex-col h-[340px]" id="support-chat-container">
        <p className="text-[10px] text-slate-400 text-center pb-2 border-b border-slate-100">
          {isOperator 
            ? "Sesión de respuesta en vivo. Estás chateando en nombre de Laura de Recepción."
            : "Tiempo promedio de respuesta de recepción: <span className=\"font-bold text-emerald-500\">Menos de 2 minutos</span>"}
        </p>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1" id="support-messages">
          {messages.map((m) => {
            const isMe = (m.sender === 'user' && !isOperator) || (m.sender === 'assistant' && isOperator);
            return (
              <div key={m.id} className={`flex flex-col max-w-[85%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`} id={`support-msg-${m.id}`}>
                <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed ${isMe ? 'bg-[#3db5d7] text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {m.text}
                </div>
                <span className="text-[8px] text-slate-400 mt-1 px-1 font-medium">{m.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="mt-2 flex items-center space-x-2 bg-slate-50 border border-slate-100 p-1 rounded-full" id="support-input-form">
          <input
            type="text"
            placeholder={isOperator ? "Responder como Laura de Recepción..." : "Escribe tu mensaje a soporte..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs outline-none px-3 py-1 text-slate-800 placeholder-slate-400"
            id="input-support"
          />
          <button type="submit" disabled={!input.trim()} className="w-8 h-8 rounded-full bg-[#3db5d7] disabled:bg-slate-200 text-white flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-colors" id="btn-send-support">
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}

// 6. Hospital finder modal
export function HospitalFinderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [filterQuery, setFilterQuery] = React.useState('');

  const filteredHospitals = HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    h.address.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Hospitales y Clínicas de Urgencia 24/7" icon={<Building2 className="h-4.5 w-4.5" />}>
      <div className="space-y-3.5" id="hospitals-modal-inner">
        {/* Search inside hospitals */}
        <div className="relative" id="hospital-search-bar">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Buscar clínicas u hospitales veterinarios..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-50 text-xs border border-slate-200 rounded-xl py-2 pl-9 pr-3 outline-none focus:bg-white focus:border-cyan-500 transition-all text-slate-800 placeholder-slate-400"
            id="input-search-hospital"
          />
        </div>

        {/* List */}
        <div className="space-y-3" id="hospitals-list-scroller">
          {filteredHospitals.length === 0 ? (
            <p className="text-center text-slate-400 py-6">No matching veterinary centers found.</p>
          ) : (
            filteredHospitals.map((h, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs space-y-1.5 flex flex-col justify-between" id={`hospital-card-${idx}`}>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{h.name}</h4>
                  <p className="text-[9.5px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-rose-400 shrink-0" />
                    <span className="truncate">{h.address}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center text-[9.5px] border-t border-slate-50 pt-1.5 mt-1" id={`hospital-meta-${idx}`}>
                  <span className="font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{h.distance}</span>
                  <div className="flex items-center text-amber-500 font-bold space-x-0.5">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{h.rating} Rating</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

// 7. Appointment Booking Success animation popup
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: Omit<Appointment, 'id' | 'status' | 'patientName'> | null;
}

export function AppointmentSuccessModal({ isOpen, onClose, appointmentDetails }: SuccessModalProps) {
  if (!isOpen || !appointmentDetails) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden" id="booking-success-modal">
      <div className="bg-white rounded-2xl p-5 text-center shadow-2xl max-w-sm w-full flex flex-col items-center space-y-4 animate-scale-up" id="success-dialog">
        {/* Animated Check icon */}
        <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner animate-pulse" id="success-badge">
          <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
        </div>

        <div id="success-text-content">
          <h3 className="text-sm font-bold text-slate-800">Booking Confirmed!</h3>
          <p className="text-[10.5px] text-slate-400 leading-normal mt-1">
            Your medical session has been successfully added to your health journal calendar.
          </p>
        </div>

        {/* Appointment Card Details */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 w-full text-left space-y-2.5" id="success-appointment-summary">
          {/* Doctor Row */}
          <div className="flex items-center space-x-2">
            <img 
              src={appointmentDetails.doctorAvatar} 
              alt={appointmentDetails.doctorName} 
              className="w-8 h-8 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
              id="success-summary-avatar"
            />
            <div>
              <h4 className="text-[11px] font-bold text-slate-800">{appointmentDetails.doctorName}</h4>
              <p className="text-[9px] text-slate-400 font-semibold">{appointmentDetails.doctorSpecialty}</p>
            </div>
          </div>
          
          {/* Date Row */}
          <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-medium text-slate-500" id="success-summary-schedule">
            <div className="bg-white px-2 py-1 rounded border border-slate-100 flex flex-col justify-center">
              <span className="text-[8px] text-slate-400 uppercase font-bold">Date</span>
              <span className="text-slate-700 font-bold truncate">{appointmentDetails.date}</span>
            </div>
            <div className="bg-white px-2 py-1 rounded border border-slate-100 flex flex-col justify-center">
              <span className="text-[8px] text-slate-400 uppercase font-bold">Time</span>
              <span className="text-slate-700 font-bold">{appointmentDetails.time}</span>
            </div>
          </div>
        </div>

        {/* Acknowledge Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#3db5d7] hover:bg-[#32a3c3] text-white font-bold text-xs py-2.5 rounded-full transition-colors cursor-pointer shadow-sm text-center"
          id="btn-confirm-success"
        >
          Excellent
        </button>
      </div>
    </div>
  );
}
