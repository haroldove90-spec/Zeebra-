import React from 'react';
import { 
  Search, 
  Pill, 
  Stethoscope, 
  ClipboardList, 
  UserCheck, 
  Lock, 
  Activity, 
  Plus, 
  Trash2, 
  Download, 
  Send, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  FileText 
} from 'lucide-react';

interface VeterinaryWorkspaceProps {
  onExitRole: () => void;
}

export default function VeterinaryWorkspace({ onExitRole }: VeterinaryWorkspaceProps) {
  // Active veterinarian module: 'appointments' | 'vitals' | 'vaccination' | 'prescription' | 'notes'
  const [activeVetModule, setActiveVetModule] = React.useState<'appointments' | 'vitals' | 'vaccination' | 'prescription' | 'notes'>('appointments');

  // Veterinary EHR/CRM States
  const [selectedApptId, setSelectedApptId] = React.useState<string>('appt-1');
  const [vetAppointments, setVetAppointments] = React.useState<any[]>([
    {
      id: 'appt-1',
      patientName: 'Luna',
      petType: 'Gato',
      breed: 'Siamés',
      ownerName: 'Lucas Williams',
      time: '11:00 AM',
      status: 'consulta', // 'espera' | 'consulta' | 'finalizada'
      reason: 'Chequeo por Tos y Deshidratación',
      constants: {
        weight: '4.2',
        temperature: '38.5',
        heartRate: '140',
        respRate: '28',
        mucosa: 'Rosada Normal',
      },
      notes: 'Paciente presenta leve congestión en vías aéreas superiores. Pulmones limpios. Ligera deshidratación (estimada en 5%). Se recomienda hidratación asistida y nebulización.',
      biologics: [
        { id: 'b1', name: 'Triple Felina (Refuerzo)', lot: 'TF-9382', expiry: '2027-12-15' }
      ],
      receta: {
        diagnostico: 'Rinotraqueitis viral felina leve con deshidratación grado I',
        medications: [
          { id: 'm1', name: 'Suero Electrólitos Orales', dosage: '50ml', frequency: 'Cada 4 horas', duration: '3 días' },
          { id: 'm2', name: 'Mucolítico Jarabe Vet', dosage: '1 ml', frequency: 'Cada 12 horas', duration: '5 días' }
        ]
      },
      isLocked: false
    },
    {
      id: 'appt-2',
      patientName: 'Max',
      petType: 'Perro',
      breed: 'Golden Retriever',
      ownerName: 'Sophia Martinez',
      time: '09:30 AM',
      status: 'finalizada',
      reason: 'Vacunación Séxtuple y Control de Otitis',
      constants: {
        weight: '32.5',
        temperature: '38.9',
        heartRate: '95',
        respRate: '20',
        mucosa: 'Rosada Normal',
      },
      notes: 'Max acude por otitis bilateral ya controlada. Oídos limpios, sin secreciones ni eritema. Se procede con vacuna de refuerzo anual.',
      biologics: [
        { id: 'b2', name: 'Séxtuple Canina Nobivac', lot: 'SX-83920', expiry: '2026-10-22' },
        { id: 'b3', name: 'Rabia Defensor 3', lot: 'RB-11029', expiry: '2027-04-18' }
      ],
      receta: {
        diagnostico: 'Otitis externa resuelta. Vacunación anual al día.',
        medications: [
          { id: 'm3', name: 'Gotas Óticas Otovet', dosage: '3 gotas por oído', frequency: 'Cada 12 horas', duration: '2 días más para asegurar' }
        ]
      },
      isLocked: true
    },
    {
      id: 'appt-3',
      patientName: 'Rocky',
      petType: 'Perro',
      breed: 'Bulldog Francés',
      ownerName: 'Emma Watson',
      time: '01:30 PM',
      status: 'espera',
      reason: 'Tratamiento Alergias en Piel y Prurito',
      constants: {
        weight: '11.8',
        temperature: '38.2',
        heartRate: '110',
        respRate: '24',
        mucosa: 'Rosada Pálida',
      },
      notes: 'Prurito intenso en zona abdominal y axilas. Eritema cutáneo notable. Posible alergia alimentaria o dermatitis atópica.',
      biologics: [],
      receta: {
        diagnostico: 'Dermatitis alérgica atópica / Alergia alimentaria en estudio',
        medications: [
          { id: 'm4', name: 'Apoquel 5.4mg', dosage: '1 tableta', frequency: 'Cada 24 horas', duration: '14 días' },
          { id: 'm5', name: 'Champú de Avena Coloidal', dosage: 'Baño', frequency: 'Cada 3 días', duration: '3 semanas' }
        ]
      },
      isLocked: false
    },
    {
      id: 'appt-4',
      patientName: 'Coco',
      petType: 'Ave',
      breed: 'Loro Gris',
      ownerName: 'Liam Neeson',
      time: '03:00 PM',
      status: 'espera',
      reason: 'Revisión periódica de plumaje y pico',
      constants: {
        weight: '0.45',
        temperature: '41.1',
        heartRate: '250',
        respRate: '40',
        mucosa: 'Pálida',
      },
      notes: 'Pérdida de plumaje en pecho y flancos (autopicado). Posible estrés ambiental o parásitos.',
      biologics: [],
      receta: {
        diagnostico: 'Picaje psicogénico por estrés ambiental',
        medications: [
          { id: 'm6', name: 'Suplemento Multivitamínico Plumas', dosage: '5 gotas en agua', frequency: 'Diario', duration: '30 días' }
        ]
      },
      isLocked: false
    }
  ]);

  // Quick form state for vaccine additions
  const [newBiologicName, setNewBiologicName] = React.useState('');
  const [newBiologicLot, setNewBiologicLot] = React.useState('');
  const [newBiologicExpiry, setNewBiologicExpiry] = React.useState('');

  // Quick form state for digital prescription additions
  const [newMedName, setNewMedName] = React.useState('');
  const [newMedDosage, setNewMedDosage] = React.useState('');
  const [newMedFreq, setNewMedFreq] = React.useState('');
  const [newMedDur, setNewMedDur] = React.useState('');

  // Prescription modal state
  const [showPrescriptionModal, setShowPrescriptionModal] = React.useState<boolean>(false);
  const [prescriptionActionSuccess, setPrescriptionActionSuccess] = React.useState<string | null>(null);

  // Search filter for patients (veterinarian quick search)
  const [vetSearchQuery, setVetSearchQuery] = React.useState('');

  // Veterinary CRM handlers
  const filteredVetAppointments = vetAppointments.filter(app => 
    app.patientName.toLowerCase().includes(vetSearchQuery.toLowerCase()) ||
    app.ownerName.toLowerCase().includes(vetSearchQuery.toLowerCase()) ||
    app.breed.toLowerCase().includes(vetSearchQuery.toLowerCase()) ||
    app.petType.toLowerCase().includes(vetSearchQuery.toLowerCase())
  );

  const activeAppt = vetAppointments.find(app => app.id === selectedApptId) || vetAppointments[0];

  const updateApptStatus = (id: string, nextStatus: 'espera' | 'consulta' | 'finalizada') => {
    setVetAppointments(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: nextStatus };
      }
      return app;
    }));
  };

  const updateApptConstants = (field: string, value: string) => {
    if (!activeAppt || activeAppt.isLocked) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          constants: {
            ...app.constants,
            [field]: value
          }
        };
      }
      return app;
    }));
  };

  const updateApptNotes = (value: string) => {
    if (!activeAppt || activeAppt.isLocked) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return { ...app, notes: value };
      }
      return app;
    }));
  };

  const addBiologic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppt || activeAppt.isLocked) return;
    if (!newBiologicName.trim()) return;

    const newBio = {
      id: `bio-${Date.now()}`,
      name: newBiologicName,
      lot: newBiologicLot || 'L-9302-A',
      expiry: newBiologicExpiry || '2027-10-12'
    };

    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          biologics: [...app.biologics, newBio]
        };
      }
      return app;
    }));

    setNewBiologicName('');
    setNewBiologicLot('');
    setNewBiologicExpiry('');
  };

  const removeBiologic = (bioId: string) => {
    if (!activeAppt || activeAppt.isLocked) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          biologics: app.biologics.filter((b: any) => b.id !== bioId)
        };
      }
      return app;
    }));
  };

  const updateDiagnosis = (val: string) => {
    if (!activeAppt || activeAppt.isLocked) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          receta: {
            ...app.receta,
            diagnostico: val
          }
        };
      }
      return app;
    }));
  };

  const addMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppt || activeAppt.isLocked) return;
    if (!newMedName.trim()) return;

    const newMed = {
      id: `med-${Date.now()}`,
      name: newMedName,
      dosage: newMedDosage || '1 tableta',
      frequency: newMedFreq || 'Cada 24 horas',
      duration: newMedDur || '7 días'
    };

    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          receta: {
            ...app.receta,
            medications: [...app.receta.medications, newMed]
          }
        };
      }
      return app;
    }));

    setNewMedName('');
    setNewMedDosage('');
    setNewMedFreq('');
    setNewMedDur('');
  };

  const removeMedication = (medId: string) => {
    if (!activeAppt || activeAppt.isLocked) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          receta: {
            ...app.receta,
            medications: app.receta.medications.filter((m: any) => m.id !== medId)
          }
        };
      }
      return app;
    }));
  };

  const lockMedicalHistory = () => {
    if (!activeAppt) return;
    setVetAppointments(prev => prev.map(app => {
      if (app.id === activeAppt.id) {
        return {
          ...app,
          isLocked: true,
          status: 'finalizada'
        };
      }
      return app;
    }));
  };

  const vetNavItems = [
    { id: 'appointments', label: 'Pacientes', icon: UserCheck, color: 'text-indigo-500' },
    { id: 'vitals', label: 'Signos', icon: Activity, color: 'text-rose-500' },
    { id: 'vaccination', label: 'Vacunas', icon: Pill, color: 'text-teal-500' },
    { id: 'prescription', label: 'Receta', icon: FileText, color: 'text-amber-500' },
    { id: 'notes', label: 'Cierre', icon: ClipboardList, color: 'text-indigo-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-4 flex-1 flex flex-col lg:flex-row gap-5 font-sans pb-24 lg:pb-4 animate-fade-in" id="veterinary-workspace">
      
      {/* NAVIGATION BAR - Left Side on Desktop, Bottom on Mobile/Tablet */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:shadow-none lg:static lg:bg-transparent lg:border-t-0 lg:border-r lg:border-slate-200 lg:px-4 lg:py-0 lg:flex-col lg:justify-start lg:items-stretch lg:w-48 lg:space-y-1.5 shrink-0" 
        id="vet-nav-container"
      >
        {/* Nav Header - Only visible on desktop */}
        <div className="hidden lg:block pb-3 mb-2 border-b border-slate-200 text-left">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Módulos Clínicos</span>
        </div>

        {vetNavItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeVetModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveVetModule(item.id as any)}
              className={`flex flex-col lg:flex-row items-center lg:space-x-3 px-2.5 py-1.5 lg:px-4 lg:py-3.5 rounded-xl transition-all duration-200 cursor-pointer w-full text-center lg:text-left ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 lg:shadow-2xs font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50/80'
              }`}
              id={`vet-nav-btn-${item.id}`}
            >
              <IconComponent className={`h-5 w-5 ${isActive ? item.color : 'text-slate-400'}`} />
              <span className="text-[9px] lg:text-xs tracking-tight mt-1 lg:mt-0 font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN MODULE CONTENT AREA */}
      <div className="flex-1 flex flex-col space-y-4" id="vet-module-content">
        
        {/* Header info badge - Compact & Beautiful */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-indigo-950" id="vet-info-banner">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 shrink-0">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-tight flex items-center space-x-1.5 text-white">
                <span>Dr. Roberto Díaz</span>
                <span className="bg-emerald-500 text-white text-[7px] font-extrabold px-1.5 py-0.2 rounded uppercase">CÉDULA REGISTRADA</span>
              </h2>
              <p className="text-[9px] text-indigo-200 mt-0.5">GP-839210-MX • Especialista en Cirugía de Pequeñas Especies</p>
            </div>
          </div>
          <div className="text-left sm:text-right sm:border-l sm:border-indigo-800/60 sm:pl-4">
            <p className="text-[8px] text-indigo-300 uppercase font-bold tracking-wider leading-none">Guardia Activa</p>
            <p className="text-[10px] font-mono font-bold mt-1 text-white">05 Jul, 2026</p>
          </div>
        </div>

        {/* Active Patient Alert Bar - Show on modules 2, 3, 4, 5 */}
        {activeVetModule !== 'appointments' && activeAppt && (
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-left animate-fade-in" id="active-patient-header">
            <div className="flex items-center space-x-2 text-left">
              <span className="text-base shrink-0">
                {activeAppt.petType === 'Gato' ? '🐱' : activeAppt.petType === 'Perro' ? '🐶' : '🦜'}
              </span>
              <div className="text-left">
                <p className="text-[11px] font-black text-slate-800">
                  Paciente: {activeAppt.patientName} <span className="text-slate-400 font-bold">({activeAppt.breed})</span>
                </p>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Propietario: <span className="text-slate-700 font-extrabold">{activeAppt.ownerName}</span> • Motivo: <span className="italic">{activeAppt.reason}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveVetModule('appointments')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-extrabold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap shadow-xs hover:scale-[1.02]"
              id="btn-switch-patient"
            >
              Cambiar Paciente
            </button>
          </div>
        )}

        {/* RENDER ACTIVE MODULE CONTENT */}
        <div className="flex-1" id="active-vet-module-wrapper">
          
          {/* MODULE 1: APPOINTMENTS & PATIENTS */}
          {activeVetModule === 'appointments' && (
            <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm flex flex-col space-y-3 animate-fade-in" id="module-appointments">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2 text-left">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 flex items-center space-x-1.5">
                  <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full" />
                  <span>Panel Diario de Guardia ({filteredVetAppointments.length})</span>
                </h3>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none font-mono">HOY</span>
              </div>

              {/* Quick Search for Patients */}
              <div className="relative" id="vet-quick-search-container">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar paciente, dueño, especie..."
                  value={vetSearchQuery}
                  onChange={(e) => setVetSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-[11px] rounded-xl py-2 pl-8 pr-3 outline-none border border-slate-200 transition-all font-normal shadow-2xs text-left"
                  id="vet-patient-search-input"
                />
                {vetSearchQuery && (
                  <button 
                    onClick={() => setVetSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 font-bold text-[10px]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Appointment Queue List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 text-left" id="vet-appointments-scroller">
                {filteredVetAppointments.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs" id="empty-vet-search">
                    Ninguna cita coincide con "{vetSearchQuery}"
                  </div>
                ) : (
                  filteredVetAppointments.map((app) => {
                    const isSelected = app.id === selectedApptId;
                    let statusBadge = "";
                    let statusText = "";

                    if (app.status === 'espera') {
                      statusBadge = "border-amber-200 text-amber-600 bg-amber-50";
                      statusText = "En Espera";
                    } else if (app.status === 'consulta') {
                      statusBadge = "border-indigo-200 text-indigo-600 bg-indigo-50";
                      statusText = "En Consulta";
                    } else if (app.status === 'finalizada') {
                      statusBadge = "border-emerald-200 text-emerald-600 bg-emerald-50";
                      statusText = "Finalizada";
                    }

                    return (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedApptId(app.id);
                          setActiveVetModule('vitals');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col space-y-2 ${
                          isSelected 
                            ? 'bg-indigo-50/25 border-indigo-400 shadow-xs' 
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                        }`}
                        id={`vet-appt-${app.id}`}
                      >
                        {isSelected && (
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-xl" />
                        )}

                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2 text-left">
                            <span className="text-[9.5px] font-mono font-extrabold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {app.time}
                            </span>
                            <h4 className="text-[12px] font-black text-slate-800 text-left">
                              {app.patientName} <span className="text-slate-400 font-bold text-[10px]">({app.breed})</span>
                            </h4>
                          </div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 border rounded-full ${statusBadge}`}>
                            {statusText}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-500 space-y-0.5 pl-0.5 text-left">
                          <p><strong className="text-slate-600">Dueño:</strong> {app.ownerName}</p>
                          <p className="truncate"><strong className="text-slate-600">Motivo:</strong> {app.reason}</p>
                        </div>

                        {/* Quick tap actions to update status */}
                        <div className="flex items-center space-x-1 pt-1 justify-end border-t border-slate-100/60" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[8px] font-black uppercase text-slate-400 mr-1.5">Estatus:</span>
                          <button
                            onClick={() => updateApptStatus(app.id, 'espera')}
                            className={`px-2 py-0.5 text-[8px] font-bold rounded-md border cursor-pointer transition-all ${
                              app.status === 'espera' 
                                ? 'bg-amber-500 text-white border-amber-500 font-extrabold shadow-xs' 
                                : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            Espera
                          </button>
                          <button
                            onClick={() => updateApptStatus(app.id, 'consulta')}
                            className={`px-2 py-0.5 text-[8px] font-bold rounded-md border cursor-pointer transition-all ${
                              app.status === 'consulta' 
                                ? 'bg-indigo-500 text-white border-indigo-500 font-extrabold shadow-xs' 
                                : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            Consulta
                          </button>
                          <button
                            onClick={() => updateApptStatus(app.id, 'finalizada')}
                            className={`px-2 py-0.5 text-[8px] font-bold rounded-md border cursor-pointer transition-all ${
                              app.status === 'finalizada' 
                                ? 'bg-emerald-500 text-white border-emerald-500 font-extrabold shadow-xs' 
                                : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            Finalizada
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* MODULE 2: CLINICAL CONSTANTS (VITALS) */}
          {activeVetModule === 'vitals' && activeAppt && (
            <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-md flex flex-col space-y-4 relative text-left animate-fade-in" id="module-vitals">
              {activeAppt.isLocked && (
                <div className="absolute top-4 right-4 bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs z-20">
                  <Lock className="h-3 w-3" />
                  <span>EXPEDIENTE SELLADO</span>
                </div>
              )}

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-left">
                <Activity className="h-5 w-5 text-indigo-500" />
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">Constantes Clínicas (Signos Vitales)</h3>
                  <p className="text-[10px] text-slate-400">Registre y actualice las constantes clínicas del paciente.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2" id="vitals-inputs-grid">
                <div className="text-left">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">Peso (kg)</label>
                  <input
                    type="text"
                    value={activeAppt.constants.weight}
                    onChange={(e) => updateApptConstants('weight', e.target.value)}
                    disabled={activeAppt.isLocked}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-mono font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-indigo-400 disabled:bg-slate-100/75 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                    placeholder="kg"
                  />
                </div>
                <div className="text-left">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">Temp (°C)</label>
                  <input
                    type="text"
                    value={activeAppt.constants.temperature}
                    onChange={(e) => updateApptConstants('temperature', e.target.value)}
                    disabled={activeAppt.isLocked}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-mono font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-indigo-400 disabled:bg-slate-100/75 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                    placeholder="°C"
                  />
                </div>
                <div className="text-left">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">FC (lpm)</label>
                  <input
                    type="text"
                    value={activeAppt.constants.heartRate}
                    onChange={(e) => updateApptConstants('heartRate', e.target.value)}
                    disabled={activeAppt.isLocked}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-mono font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-indigo-400 disabled:bg-slate-100/75 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                    placeholder="lpm"
                  />
                </div>
                <div className="text-left">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">FR (rpm)</label>
                  <input
                    type="text"
                    value={activeAppt.constants.respRate}
                    onChange={(e) => updateApptConstants('respRate', e.target.value)}
                    disabled={activeAppt.isLocked}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-mono font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-indigo-400 disabled:bg-slate-100/75 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                    placeholder="rpm"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 text-left">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">Edo. Mucosa</label>
                  <input
                    type="text"
                    value={activeAppt.constants.mucosa}
                    onChange={(e) => updateApptConstants('mucosa', e.target.value)}
                    disabled={activeAppt.isLocked}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-indigo-400 disabled:bg-slate-100/75 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                    placeholder="Mucosa"
                  />
                </div>
              </div>

              {/* Vitals Summary Card */}
              <div className="bg-indigo-50/30 rounded-xl p-4 border border-indigo-100/50 mt-4 text-left">
                <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-wider mb-2">Guía de Referencia Rápida</h4>
                <p className="text-[10px] text-slate-600 leading-normal">
                  • <strong className="text-slate-700 font-bold">Perros:</strong> Temp: 37.5°C - 39.2°C • FC: 60-140 lpm • FR: 10-30 rpm.<br />
                  • <strong className="text-slate-700 font-bold">Gatos:</strong> Temp: 38.0°C - 39.2°C • FC: 140-220 lpm • FR: 20-42 rpm.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveVetModule('vaccination')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center shadow-xs"
                >
                  Siguiente: Módulo de Vacunas ➡️
                </button>
              </div>
            </div>
          )}

          {/* MODULE 3: VACCINATION & DEWORMING */}
          {activeVetModule === 'vaccination' && activeAppt && (
            <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-md flex flex-col space-y-4 relative text-left animate-fade-in" id="module-vaccines">
              {activeAppt.isLocked && (
                <div className="absolute top-4 right-4 bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs z-20">
                  <Lock className="h-3 w-3" />
                  <span>EXPEDIENTE SELLADO</span>
                </div>
              )}

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-left">
                <Pill className="h-5 w-5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">Vacunación y Desparasitación</h3>
                  <p className="text-[10px] text-slate-400">Administre el registro de vacunas aplicadas y desparasitantes.</p>
                </div>
              </div>

              {/* Applied Biologics List */}
              <div className="space-y-1.5" id="biologics-list-container">
                {activeAppt.biologics.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">Ningún biológico registrado para esta sesión.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                    {activeAppt.biologics.map((bio: any) => (
                      <div key={bio.id} className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex items-center justify-between text-[11px] shadow-2xs">
                        <div className="space-y-1 text-left">
                          <p className="font-extrabold text-slate-800 text-left">🛡️ {bio.name}</p>
                          <p className="text-[9px] text-slate-450 text-left leading-none mt-1">
                            Lote: <span className="text-slate-650 font-mono font-bold">{bio.lot}</span> • Vence: <span className="text-slate-650 font-mono font-bold">{bio.expiry}</span>
                          </p>
                        </div>
                        {!activeAppt.isLocked && (
                          <button
                            type="button"
                            onClick={() => removeBiologic(bio.id)}
                            className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all p-1.5 shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Biologic Form (Only visible if not locked) */}
              {!activeAppt.isLocked ? (
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-150 space-y-3 text-left mt-2" id="form-add-biologic">
                  <p className="text-[9px] font-black uppercase text-teal-600 tracking-wider text-left">Registrar Aplicación de Biológico (Vacuna / Antiparasitario)</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="biologic-inputs-grid">
                    <div className="text-left">
                      <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Nombre Biológico</label>
                      <input
                        type="text"
                        placeholder="ej. Triple Felina"
                        value={newBiologicName}
                        onChange={(e) => setNewBiologicName(e.target.value)}
                        className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-400 font-bold text-slate-800 text-left"
                      />
                    </div>
                    <div className="text-left">
                      <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Número de Lote</label>
                      <input
                        type="text"
                        placeholder="ej. L-9302-A"
                        value={newBiologicLot}
                        onChange={(e) => setNewBiologicLot(e.target.value)}
                        className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-400 font-mono text-slate-700 text-left"
                      />
                    </div>
                    <div className="text-left">
                      <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Fecha de Caducidad</label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={newBiologicExpiry}
                          onChange={(e) => setNewBiologicExpiry(e.target.value)}
                          className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-400 font-mono text-slate-700 text-left"
                        />
                        <button
                          type="button"
                          onClick={(e) => addBiologic(e)}
                          className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-3 transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
                          title="Registrar aplicación"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveVetModule('vitals')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  ⬅️ Volver a Signos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVetModule('prescription')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center shadow-xs"
                >
                  Siguiente: Receta Médica ➡️
                </button>
              </div>
            </div>
          )}

          {/* MODULE 4: DIGITAL PRESCRIPTION */}
          {activeVetModule === 'prescription' && activeAppt && (
            <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-md flex flex-col space-y-4 relative text-left animate-fade-in" id="module-prescription">
              {activeAppt.isLocked && (
                <div className="absolute top-4 right-4 bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs z-20">
                  <Lock className="h-3 w-3" />
                  <span>EXPEDIENTE SELLADO</span>
                </div>
              )}

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-left">
                <FileText className="h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">Emisión de Receta Digital</h3>
                  <p className="text-[10px] text-slate-400">Emita recetas médicas firmadas digitalmente para el propietario de la mascota.</p>
                </div>
              </div>

              {/* Diagnóstico Input */}
              <div className="space-y-1 text-left">
                <label className="text-[9px] text-slate-400 font-extrabold uppercase text-left">Diagnóstico Clínico del Tratante</label>
                <input
                  type="text"
                  value={activeAppt.receta.diagnostico}
                  onChange={(e) => updateDiagnosis(e.target.value)}
                  disabled={activeAppt.isLocked}
                  className="w-full bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 p-2.5 outline-none focus:border-amber-400 disabled:bg-slate-100/70 disabled:text-slate-500 disabled:cursor-not-allowed text-left"
                  placeholder="Diagnóstico clínico presuntivo o definitivo..."
                />
              </div>

              {/* Prescribed Medications */}
              <div className="space-y-1.5 text-left" id="prescribed-meds-list">
                <p className="text-[9px] text-slate-400 font-extrabold uppercase text-left">Tratamiento Farmacológico</p>
                {activeAppt.receta.medications.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">Ningún fármaco recetado aún en esta sesión.</p>
                ) : (
                  <div className="space-y-1.5 text-left">
                    {activeAppt.receta.medications.map((med: any) => (
                      <div key={med.id} className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between text-[11px] font-medium text-slate-800 shadow-2xs">
                        <div className="text-left leading-normal">
                          <span className="font-extrabold text-indigo-700">💊 {med.name}</span> — {med.dosage} <span className="text-slate-400">({med.frequency} por {med.duration})</span>
                        </div>
                        {!activeAppt.isLocked && (
                          <button
                            type="button"
                            onClick={() => removeMedication(med.id)}
                            className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all p-1.5 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Medication Form */}
              {!activeAppt.isLocked ? (
                <div className="bg-amber-50/10 rounded-xl p-4 border border-amber-100/50 space-y-3 text-left" id="form-add-med">
                  <p className="text-[9px] font-black uppercase text-amber-600 tracking-wider text-left">Agregar Medicación Recetada</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="med-inputs-grid">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[8px] text-slate-400 font-bold block mb-1">Nombre Fármaco</label>
                      <input
                        type="text"
                        placeholder="ej. Apoquel 5.4mg"
                        value={newMedName}
                        onChange={(e) => setNewMedName(e.target.value)}
                        className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-400 font-bold text-slate-800 text-left"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-bold block mb-1">Dosis</label>
                      <input
                        type="text"
                        placeholder="ej. 1 tableta"
                        value={newMedDosage}
                        onChange={(e) => setNewMedDosage(e.target.value)}
                        className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-400 text-left"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-bold block mb-1">Frecuencia</label>
                      <input
                        type="text"
                        placeholder="ej. Cada 24 horas"
                        value={newMedFreq}
                        onChange={(e) => setNewMedFreq(e.target.value)}
                        className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-400 text-left"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-bold block mb-1">Duración</label>
                      <div className="flex space-x-1.5">
                        <input
                          type="text"
                          placeholder="ej. 14 días"
                          value={newMedDur}
                          onChange={(e) => setNewMedDur(e.target.value)}
                          className="w-full bg-white text-[11px] rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-400 text-left"
                        />
                        <button
                          type="button"
                          onClick={(e) => addMedication(e)}
                          className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-3.5 transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
                          title="Agregar fármaco"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Action buttons to Download / Share Digital Recipe */}
              <div className="flex flex-wrap gap-2.5 pt-2 text-left" id="prescription-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowPrescriptionModal(true);
                    setPrescriptionActionSuccess("DOWNLOAD_SIMULATED");
                  }}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] sm:text-xs rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.01]"
                  id="btn-rx-download"
                >
                  <Download className="h-4 w-4" />
                  <span>Generar Receta (PDF)</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowPrescriptionModal(true);
                    setPrescriptionActionSuccess("EMAIL_SIMULATED");
                  }}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-[11px] sm:text-xs rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.01]"
                  id="btn-rx-send"
                >
                  <Send className="h-4 w-4" />
                  <span>Envío Digital (Propietario)</span>
                </button>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => setActiveVetModule('vaccination')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  ⬅️ Volver a Vacunas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVetModule('notes')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center shadow-xs"
                >
                  Siguiente: Notas y Cierre ➡️
                </button>
              </div>
            </div>
          )}

          {/* MODULE 5: ANAMNESIS & CLINICAL NOTES (CLOSURE) */}
          {activeVetModule === 'notes' && activeAppt && (
            <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-md flex flex-col space-y-4 relative text-left animate-fade-in" id="module-notes">
              {activeAppt.isLocked && (
                <div className="absolute top-4 right-4 bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs z-20">
                  <Lock className="h-3 w-3" />
                  <span>EXPEDIENTE SELLADO</span>
                </div>
              )}

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-left">
                <ClipboardList className="h-5 w-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">Anamnesis y Observaciones Clínicas</h3>
                  <p className="text-[10px] text-slate-400">Registre la evolución y archive de forma segura y legal la consulta de hoy.</p>
                </div>
              </div>

              <div className="space-y-1.5 text-left" id="sect-notes">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block text-left">Anamnesis, Observaciones y Notas Médicas</label>
                <textarea
                  value={activeAppt.notes}
                  onChange={(e) => updateApptNotes(e.target.value)}
                  disabled={activeAppt.isLocked}
                  className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl border border-slate-200 p-3 min-h-[140px] outline-none focus:border-indigo-400 disabled:bg-slate-100/70 disabled:text-slate-500 disabled:cursor-not-allowed leading-relaxed text-left"
                  placeholder="Anote los hallazgos de la exploración clínica, anamnesis y evolución..."
                />
              </div>

              {/* Cierre de Consulta (Bloqueo Legal) */}
              <div className="border-t border-slate-150 pt-4 text-left" id="sect-legal-closure">
                {activeAppt.isLocked ? (
                  <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-150 flex items-start space-x-3 text-emerald-800 text-left" id="record-locked-display">
                    <CheckCircle2 className="h-5.5 w-5.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[11px] font-black uppercase text-left">Consulta Finalizada y Expediente Cerrado</h5>
                      <p className="text-[9.5px] text-emerald-700 leading-normal mt-0.5 text-left">
                        Historial clínico bloqueado por seguridad jurídica según reglamentos sanitarios vigentes, bajo firma digital del <strong className="text-emerald-900">Dr. Roberto Díaz</strong>. No se admiten modificaciones retroactivas.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left" id="record-lock-callout">
                    <div className="flex items-start space-x-2 text-left">
                      <AlertTriangle className="h-4.5 w-4.5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-[10.5px] font-extrabold text-slate-700 uppercase text-left">Bloqueo Sanitario de Expediente</h5>
                        <p className="text-[9px] text-slate-500 leading-normal text-left">
                          Al archivar, certificas la conclusión de la consulta de hoy. Los parámetros de signos vitales, vacunas y recetas quedarán blindados permanentemente para protección médica legal.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={lockMedicalHistory}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10.5px] px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-center shrink-0 shadow-xs hover:scale-[1.01]"
                    >
                      🔒 Sellar y Archivar
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setActiveVetModule('prescription')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  ⬅️ Volver a Receta
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* DYNAMIC DIGITAL PRESCRIPTION CERTIFICATE MODAL */}
      {showPrescriptionModal && activeAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-digital-rx">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-150 shadow-2xl flex flex-col space-y-4 animate-scale-up text-center max-h-[90vh] overflow-y-auto z-50">
            
            {/* Visual feedback notice */}
            {prescriptionActionSuccess === "DOWNLOAD_SIMULATED" ? (
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-xl p-2.5 text-[10.5px] font-semibold text-left flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>📥 PDF Generado con éxito: <code>receta_{activeAppt.patientName.toLowerCase()}_05jul.pdf</code></span>
              </div>
            ) : prescriptionActionSuccess === "EMAIL_SIMULATED" ? (
              <div className="bg-cyan-50 border border-cyan-150 text-cyan-800 rounded-xl p-2.5 text-[10.5px] font-semibold text-left flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                <span>✉️ Envío digital exitoso: Receta enviada a <code>{activeAppt.ownerName.toLowerCase().replace(' ', '')}@vetmail.com</code></span>
              </div>
            ) : null}

            {/* Prescription Document Sheet */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left font-sans space-y-4 shadow-inner relative overflow-hidden" id="rx-document-sheet">
              {/* Decorative Stamp */}
              <div className="absolute top-10 right-4 transform rotate-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-black px-3 py-1 rounded tracking-widest uppercase">
                VETCARE FIRMA S.D.
              </div>

              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-3 text-left">
                <div className="flex items-center space-x-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
                    VC
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-800 tracking-tight leading-none text-left">Clínicas VetCare SA</h4>
                    <p className="text-[7.5px] text-slate-400 mt-1 font-bold uppercase tracking-wider text-left">Receta Médica Certificada</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[7.5px] text-slate-400 uppercase font-extrabold text-right">Cédula Federal No.</p>
                  <p className="text-[9px] font-mono font-bold text-slate-800 text-right">GP-839210-MX</p>
                </div>
              </div>

              {/* Dr & Patient details */}
              <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-600 border-b border-slate-100 pb-3 leading-normal">
                <div className="text-left">
                  <p><strong className="text-slate-800 font-extrabold">Médico:</strong> Dr. Roberto Díaz</p>
                  <p><strong className="text-slate-800 font-extrabold">Especialidad:</strong> Medicina y Cirugía</p>
                  <p><strong className="text-slate-800 font-extrabold">Fecha:</strong> 05 Jul, 2026</p>
                </div>
                <div className="text-left">
                  <p><strong className="text-slate-800 font-extrabold font-mono">Paciente:</strong> {activeAppt.patientName} ({activeAppt.breed})</p>
                  <p><strong className="text-slate-800 font-extrabold font-mono">Constantes:</strong> {activeAppt.constants.weight}kg, {activeAppt.constants.temperature}°C</p>
                  <p><strong className="text-slate-800 font-extrabold">Propietario:</strong> {activeAppt.ownerName}</p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-1 text-left">
                <p className="text-[7.5px] text-slate-400 uppercase font-extrabold text-left">Diagnóstico Médico</p>
                <p className="text-[10.5px] font-bold text-slate-800 leading-normal italic text-left">
                  "{activeAppt.receta.diagnostico || 'Control clínico preventivo / Sin patología aparente'}"
                </p>
              </div>

              {/* Meds table */}
              <div className="space-y-1.5 text-left">
                <p className="text-[7.5px] text-slate-400 uppercase font-extrabold border-b border-slate-150 pb-0.5 text-left">Indicación de Fármacos</p>
                {activeAppt.receta.medications.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic text-left">No se han registrado indicaciones farmacológicas.</p>
                ) : (
                  <div className="space-y-2 text-left">
                    {activeAppt.receta.medications.map((med: any, index: number) => (
                      <div key={med.id} className="text-[10px] text-left">
                        <p className="font-extrabold text-slate-800 text-left">{index + 1}. {med.name} — {med.dosage}</p>
                        <p className="text-slate-500 text-[9px] pl-3 leading-normal text-left">
                          Frecuencia: {med.frequency} • Periodo: {med.duration}.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Signatures & Security footer */}
              <div className="pt-3 flex justify-between items-end border-t border-slate-200">
                <div className="space-y-1 text-center">
                  <div className="font-mono italic text-slate-400 text-[10px] border-b border-slate-200 w-24 mx-auto pb-0.5 text-center">
                    Roberto Díaz
                  </div>
                  <p className="text-[7px] text-slate-400 uppercase font-extrabold tracking-wider text-center">Firma Digital del Médico</p>
                </div>
                <div className="text-right">
                  <div className="bg-white border border-slate-200 p-1 rounded-lg">
                    <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white text-[5px] font-mono leading-none text-center">
                      VET<br/>QR
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Print button & exit actions */}
            <div className="flex space-x-2 text-left" id="modal-rx-footer-btns">
              <button
                type="button"
                onClick={() => {
                  alert("Simulación: Documento enviado a la cola de la Impresora de Recetas.");
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Imprimir</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrescriptionModal(false)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-full transition-colors cursor-pointer text-center"
              >
                Cerrar Receta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
