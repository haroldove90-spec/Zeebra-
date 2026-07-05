import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Smartphone, 
  Layers, 
  PlusCircle, 
  RefreshCw, 
  Terminal, 
  HelpCircle,
  FileText,
  User,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import PhoneShell from './components/PhoneShell';
import DashboardScreen from './components/DashboardScreen';
import AppointmentScreen from './components/AppointmentScreen';
import { 
  MedicineModal, 
  HistoryLogsModal, 
  AIConsultModal, 
  PatientsListModal, 
  SupportChatModal, 
  HospitalFinderModal,
  AppointmentSuccessModal 
} from './components/InteractiveModals';
import { Doctor, MenuItem, Appointment, Message, Prescription, UserRole } from './types';
import { DOCTORS, INITIAL_PRESCRIPTIONS } from './data';

export default function App() {
  // Simulator State
  const [userName, setUserName] = React.useState('Sophia Martinez');
  const [userLocation, setUserLocation] = React.useState('New York');
  const [prescriptions, setPrescriptions] = React.useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [selectedDoctorId, setSelectedDoctorId] = React.useState('dr-doe');
  const [currentRole, setCurrentRole] = React.useState<UserRole>('client');
  const [isRoleEntered, setIsRoleEntered] = React.useState<boolean>(false);
  
  // Simulated Appointments (Starts with one pre-loaded to match the image booking screen)
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: 'pre-loaded-1',
      doctorId: 'dr-doe',
      doctorName: 'Dr. Roberto Díaz',
      doctorSpecialty: 'Veterinario Cirujano',
      doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80',
      date: 'JUNE 20, 2021',
      time: '12:00',
      status: 'upcoming',
      patientName: 'Sophia Martinez'
    }
  ]);

  // UI Control states
  const [viewMode, setViewMode] = React.useState<'single-dashboard' | 'single-appointment'>('single-dashboard');
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  
  // AI Consulting Chat state
  const [aiMessages, setAiMessages] = React.useState<Message[]>([
    { 
      id: 'ai-1', 
      sender: 'assistant', 
      text: "Hello! I am your AI Medical & Wellness Consultant. How are you feeling today? Ask me about wellness tips, mental health care, or healthy habits.", 
      timestamp: '11:29 AM' 
    }
  ]);
  const [isAiReplying, setIsAiReplying] = React.useState(false);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [successAppointment, setSuccessAppointment] = React.useState<Omit<Appointment, 'id' | 'status' | 'patientName'> | null>(null);

  // Simulated Console Log stream
  const [simulatedLogs, setSimulatedLogs] = React.useState<string[]>([
    'System: Interactive Medical App Simulator initialized.',
    'System: Prescriptions database loaded (3 active).',
    'System: Default user set to Sophia Martinez (New York).'
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSimulatedLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 25)]);
  };

  const handleLocationChange = (newLoc: string) => {
    setUserLocation(newLoc);
    addLog(`User: Changed location preference to ${newLoc}`);
  };

  const handleUserChange = (newName: string) => {
    setUserName(newName);
    addLog(`User: Renamed profile user to "${newName}"`);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setIsRoleEntered(true);
    if (role === 'admin') {
      setUserName('Administrador General (VetCare)');
      addLog(`System: Cambiado al rol de ADMINISTRADOR (Acceso total clínico y de sistema)`);
    } else if (role === 'veterinarian') {
      setUserName('Dr. Roberto Díaz');
      addLog(`System: Cambiado al rol de VETERINARIO (Permisos para recetar fármacos y examinar diagnósticos)`);
    } else if (role === 'receptionist') {
      setUserName('Laura Pérez (Recepción)');
      addLog(`System: Cambiado al rol de RECEPCIONISTA (Permisos para agendar citas, soporte de tickets y entrada)`);
    } else if (role === 'client') {
      setUserName('Sophia Martinez');
      addLog(`System: Cambiado al rol de CLIENTE (Acceso a portal de control para mascotas y recordatorios de medicinas)`);
    }
  };

  const handleMenuItemClick = (itemId: string) => {
    addLog(`Action: Clicked grid menu option "${itemId.toUpperCase()}"`);
    
    if (itemId === 'appointment' || itemId === 'doctor') {
      if (viewMode === 'dual') {
        // Highlight Screen 2
        addLog('Layout: Scrolling appointment profile view into focus');
        const scroller = document.getElementById('screen-appointment');
        if (scroller) {
          scroller.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setViewMode('single-appointment');
      }
    } else {
      setActiveModal(itemId);
    }
  };

  // Prescription Handlers
  const handleTogglePrescription = (id: string) => {
    setPrescriptions(prev => prev.map(med => {
      if (med.id === id) {
        const nextState = !med.taken;
        addLog(`Database: Prescription "${med.name}" marked as ${nextState ? 'TAKEN' : 'PENDING'}`);
        return { ...med, taken: nextState };
      }
      return med;
    }));
  };

  const handleAddPrescription = (name: string, dosage: string, frequency: string, time: string) => {
    const newMed: Prescription = {
      id: `p-${Date.now()}`,
      name,
      dosage,
      frequency,
      taken: false,
      time
    };
    setPrescriptions(prev => [...prev, newMed]);
    addLog(`Database: Added new prescription medication: "${name} (${dosage})"`);
  };

  // Appointment Handlers
  const handleBookAppointment = (details: Omit<Appointment, 'id' | 'status' | 'patientName'>) => {
    const newApp: Appointment = {
      ...details,
      id: `app-${Date.now()}`,
      status: 'upcoming',
      patientName: userName
    };

    // Prevent duplicate booking for same doctor/date/time
    const isDup = appointments.some(app => 
      app.doctorId === details.doctorId && 
      app.date === details.date && 
      app.time === details.time && 
      app.status === 'upcoming'
    );

    if (isDup) {
      addLog(`Error: Appointment with ${details.doctorName} at ${details.time} on ${details.date} already exists!`);
      alert('This appointment slot is already booked! Please select another time slot.');
      return;
    }

    setAppointments(prev => [newApp, ...prev]);
    setSuccessAppointment(details);
    setShowSuccessModal(true);
    addLog(`Success: Booked appointment with ${details.doctorName} for ${details.date} at ${details.time}`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === id) {
        addLog(`Database: Cancelled appointment with ${app.doctorName} scheduled on ${app.date}`);
        return { ...app, status: 'cancelled' };
      }
      return app;
    }));
  };

  // AI Consultant Chat logic
  const handleSendAiMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp
    };
    setAiMessages(prev => [...prev, userMsg]);
    setIsAiReplying(true);
    addLog(`AI Consultant: Received query "${text.length > 20 ? text.substring(0, 20) + '...' : text}"`);

    // Simulated Smart clinical response
    setTimeout(() => {
      let replyText = "I understand you have questions regarding your wellbeing. Could you please specify any specific symptoms, duration, or if you are taking any medication?";
      const lower = text.toLowerCase();

      if (lower.includes('anxiety') || lower.includes('estres') || lower.includes('estrés') || lower.includes('stress') || lower.includes('psicologo') || lower.includes('psicólogo')) {
        replyText = "For stress and anxiety, Dr. Robert John Doe suggests taking brief, paced diaphragmatic breathing cycles (4 seconds in, 7 seconds hold, 8 seconds out). Consider journaling your thoughts before sleep or scheduling a psychological review to identify cognitive triggers.";
      } else if (lower.includes('cabeza') || lower.includes('migraine') || lower.includes('migraña') || lower.includes('headache') || lower.includes('dolor')) {
        replyText = "Migraines or headaches can stem from hydration deficits, stress, or posture. We recommend resting in a dark room, drinking 500ml of electrolytes, and avoiding visual screen exposure. If accompanied by neurological signs, please contact Dr. Kenji Sato.";
      } else if (lower.includes('corazon') || lower.includes('corazón') || lower.includes('heart') || lower.includes('chest') || lower.includes('presion') || lower.includes('cardio')) {
        replyText = "Cardiovascular wellness is essential. Dr. Amanda Vance recommends tracking resting heart rates, limiting sodium ingestion to under 2000mg daily, and engaging in light aerobic exercises. If you experience severe chest pressures, seek immediate clinical support.";
      } else if (lower.includes('vitamin') || lower.includes('vitamina') || lower.includes('d3') || lower.includes('prescripcion') || lower.includes('pastilla')) {
        replyText = "Vitamins (like Vitamin D3 or Melatonin) support bodily homeostasis when taken consistently. Please ensure you track them daily using our Medicine Grid Option to form strong routines. Always cross-check with your physician before changing dosages.";
      } else if (lower.includes('hola') || lower.includes('hello') || lower.includes('hi') || lower.includes('buenos dias')) {
        replyText = "Hello! I am your interactive AI health advisor. You can inquire about mental health tips, cardiac health guidelines, dosage routines, or clinic directions. How can I support you?";
      }

      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, replyMsg]);
      setIsAiReplying(false);
      addLog('AI Consultant: Replied to user medical inquiry.');
    }, 1200);
  };

  const handleResetSimulator = () => {
    setUserName('Sophia Martinez');
    setUserLocation('New York');
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setAppointments([
      {
        id: 'pre-loaded-1',
        doctorId: 'dr-doe',
        doctorName: 'Dr. Roberto Díaz',
        doctorSpecialty: 'Veterinario Cirujano',
        doctorAvatar: 'https://appdesign.appdesignproyectos.com/zeebrafoto.jpg',
        date: 'JUNE 20, 2021',
        time: '12:00',
        status: 'upcoming',
        patientName: 'Sophia Martinez'
      }
    ]);
    setSelectedDoctorId('dr-doe');
    setCurrentRole('client');
    setAiMessages([
      { 
        id: 'ai-1', 
        sender: 'assistant', 
        text: "Hello! I am your AI Medical & Wellness Consultant. How are you feeling today? Ask me about wellness tips, mental health care, or healthy habits.", 
        timestamp: '11:29 AM' 
      }
    ]);
    addLog('System: Reset simulator to default clinic states.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* Root Layout */}
      <div className="flex-1 flex flex-col w-full" id="root-layout-container">
        {viewMode === 'single-dashboard' ? (
          <DashboardScreen
            userName={userName}
            userLocation={userLocation}
            onNavigateToCalendar={() => setViewMode('single-appointment')}
            onMenuItemClick={handleMenuItemClick}
            onLocationChange={handleLocationChange}
            onUserChange={handleUserChange}
            currentRole={currentRole}
            onChangeRole={handleRoleChange}
            isRoleEntered={isRoleEntered}
            onExitRole={() => setIsRoleEntered(false)}
          />
        ) : (
          <AppointmentScreen
            selectedDoctorId={selectedDoctorId}
            onDoctorChange={setSelectedDoctorId}
            onNavigateBack={() => setViewMode('single-dashboard')}
            onBookAppointment={handleBookAppointment}
            userName={userName}
          />
        )}
      </div>

      {/* Modals placed outside of viewport columns for clean backdrop overlay */}
      <MedicineModal
        isOpen={activeModal === 'medicine'}
        onClose={() => setActiveModal(null)}
        prescriptions={prescriptions}
        onTogglePrescription={handleTogglePrescription}
        onAddPrescription={handleAddPrescription}
        currentRole={currentRole}
      />

      <HistoryLogsModal
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        currentRole={currentRole}
      />

      <AIConsultModal
        isOpen={activeModal === 'consult'}
        onClose={() => setActiveModal(null)}
        messages={aiMessages}
        onSendMessage={handleSendAiMessage}
        isReplying={isAiReplying}
        currentRole={currentRole}
      />

      <PatientsListModal
        isOpen={activeModal === 'patients'}
        onClose={() => setActiveModal(null)}
        currentRole={currentRole}
      />

      <SupportChatModal
        isOpen={activeModal === 'customer_service'}
        onClose={() => setActiveModal(null)}
        currentRole={currentRole}
      />

      <HospitalFinderModal
        isOpen={activeModal === 'hospital'}
        onClose={() => setActiveModal(null)}
      />

      <AppointmentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setSuccessAppointment(null);
        }}
        appointmentDetails={successAppointment}
      />

    </div>
  );
}
