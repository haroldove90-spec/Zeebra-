import React from 'react';
import { 
  Phone, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Check, 
  CheckCircle2, 
  Download, 
  Send, 
  ShoppingBag, 
  X, 
  Bell, 
  ShieldAlert, 
  Camera, 
  CreditCard, 
  BookOpen, 
  Instagram, 
  MessageCircle, 
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface ClientWorkspaceProps {
  onExitRole: () => void;
  hideHeader?: boolean;
}

const PET_AVATARS = [
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&h=150&q=80', // Dog
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&h=150&q=80', // Cat
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=150&h=150&q=80', // Cute dog
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150&q=80', // Dog with toy
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150&q=80'  // Golden puppy
];

export default function ClientWorkspace({ onExitRole, hideHeader = false }: ClientWorkspaceProps) {
  // Navigation for Client Mobile Portal
  const [activeTab, setActiveTab] = React.useState<'home' | 'pets' | 'appointments' | 'health' | 'store'>('home');

  // Push Notifications state
  const [notifications, setNotifications] = React.useState([
    { id: 'n-1', title: 'Refuerzo de Vacuna', body: 'A Max le toca la vacuna Séxtuple de Refuerzo el 12 de Julio.', type: 'vaccine', date: 'Hace 1 hora', isRead: false },
    { id: 'n-2', title: 'Confirmación de Cita', body: 'Tu cita con el Dr. Roberto Díaz para Luna ha sido confirmada para hoy a las 11:00 AM.', type: 'appointment', date: 'Hace 3 horas', isRead: true },
    { id: 'n-3', title: 'Promoción Estética ✨', body: '¡Consiente a tu peludo! 15% de descuento en Baño Spa zeebra durante esta semana.', type: 'promo', date: 'Ayer', isRead: false }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = React.useState(false);

  // Auth / Profile simulated state
  const [isBiometricRegistered, setIsBiometricRegistered] = React.useState(false);
  const [showBiometricSetup, setShowBiometricSetup] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: 'Sophia Martinez',
    phone: '444-987-6543',
    email: 'sophia@example.com',
    memberSince: '2024-08-19'
  });

  // Client Pets list state
  const [myPets, setMyPets] = React.useState([
    {
      id: 'pet-c1',
      name: 'Max',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      weight: '32.5 kg',
      photo: PET_AVATARS[0],
      isHealthy: true,
      vaccines: [
        { name: 'Séxtuple Canina', date: '2025-07-12', status: 'pending', id: 'v-1' },
        { name: 'Rabia Anual', date: '2025-04-18', status: 'completed', id: 'v-2' },
        { name: 'Parvovirus', date: '2025-01-05', status: 'completed', id: 'v-3' }
      ],
      dewormings: [
        { name: 'Endogard Puppy/Adult', date: '2025-06-01', nextDate: '2025-10-01' }
      ]
    },
    {
      id: 'pet-c2',
      name: 'Luna',
      type: 'Gato',
      breed: 'Siamés',
      age: '2 años',
      weight: '4.2 kg',
      photo: PET_AVATARS[1],
      isHealthy: true,
      vaccines: [
        { name: 'Triple Felina Refuerzo', date: '2025-12-15', status: 'pending', id: 'v-4' },
        { name: 'Leucemia Viral', date: '2025-05-10', status: 'completed', id: 'v-5' }
      ],
      dewormings: [
        { name: 'Broadline Spot-on', date: '2025-05-15', nextDate: '2025-09-15' }
      ]
    }
  ]);

  const [showAddPetModal, setShowAddPetModal] = React.useState(false);
  const [newPetForm, setNewPetForm] = React.useState({
    name: '',
    type: 'Perro',
    breed: '',
    age: '',
    weight: '',
    avatarUrl: PET_AVATARS[2]
  });

  // Appointment Request states
  const [appointments, setAppointments] = React.useState([
    { id: 'appt-c1', petName: 'Max', reason: 'Control de Otitis de rutina', doctor: 'Dra. Amanda Vargas', date: '2026-07-05', time: '09:30 AM', status: 'completed' },
    { id: 'appt-c2', petName: 'Luna', reason: 'Chequeo por Tos y Refuerzo', doctor: 'Dr. Roberto Díaz', date: '2026-07-05', time: '11:00 AM', status: 'scheduled' }
  ]);
  const [showRequestAppt, setShowRequestAppt] = React.useState(false);
  const [reqForm, setReqForm] = React.useState({
    petId: 'pet-c1',
    reason: 'Consulta General / Vacuna',
    doctor: 'Dr. Roberto Díaz',
    date: '2026-07-12',
    time: '10:00 AM'
  });

  // Digital Prescription Cards
  const digitalPrescriptions = [
    {
      id: 'rx-c1',
      petName: 'Max',
      doctor: 'Dra. Amanda Vargas',
      date: '2026-07-05',
      diagnostic: 'Otitis externa resuelta. Vacunación al día.',
      medications: [
        { name: 'Gotas Óticas Otovet', dosage: '3 gotas por oído', frequency: 'Cada 12 horas', duration: '2 días' }
      ]
    },
    {
      id: 'rx-c2',
      petName: 'Luna',
      doctor: 'Dr. Roberto Díaz',
      date: '2026-07-05',
      diagnostic: 'Rinotraqueitis viral felina leve con deshidratación grado I',
      medications: [
        { name: 'Suero Electrólitos Orales', dosage: '50ml', frequency: 'Cada 4 horas', duration: '3 días' },
        { name: 'Mucolítico Jarabe Vet', dosage: '1 ml', frequency: 'Cada 12 horas', duration: '5 días' }
      ]
    }
  ];
  const [selectedRx, setSelectedRx] = React.useState<any | null>(null);

  // Online Store click & collect state
  const storeCatalog = [
    { id: 'sc-1', name: 'Alimento Royal Canin Medium Adult 10kg', category: 'food', price: 1250, photo: 'https://images.unsplash.com/photo-1589924691106-07c26da9b8bf?auto=format&fit=crop&w=300&q=80', desc: 'Soporte digestivo y articular para perros de raza mediana.' },
    { id: 'sc-2', name: 'NexGard Espectra Mastigables x3', category: 'meds', price: 420, photo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=300&q=80', desc: 'Tratamiento mensual completo contra pulgas y garrapatas.' },
    { id: 'sc-3', name: 'Juguete Interactivo KONG Classic M', category: 'accs', price: 290, photo: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=300&q=80', desc: 'Juguete de caucho natural ultra-resistente rellenable.' },
    { id: 'sc-4', name: 'Plato de Cerámica Premium Zeebra', category: 'accs', price: 195, photo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80', desc: 'Plato pesado antiderrames con diseño artesanal.' }
  ];
  const [storeCart, setStoreCart] = React.useState<any[]>([]);
  const [showStoreCheckout, setShowStoreCheckout] = React.useState(false);
  const [paymentDone, setPaymentDone] = React.useState(false);

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetForm.name) return;

    const newPet = {
      id: `pet-c${Date.now()}`,
      name: newPetForm.name,
      type: newPetForm.type,
      breed: newPetForm.breed || 'Sin raza definida',
      age: newPetForm.age || '1 año',
      weight: newPetForm.weight || 'N/A',
      photo: newPetForm.avatarUrl,
      isHealthy: true,
      vaccines: [
        { name: 'Triple Felina/Canina Básica', date: '2025-07-20', status: 'pending', id: `v-${Date.now()}` }
      ],
      dewormings: [
        { name: 'Desparasitante General', date: '2025-07-05', nextDate: '2025-11-05' }
      ]
    };

    setMyPets([...myPets, newPet]);
    setShowAddPetModal(false);
    setNewPetForm({
      name: '',
      type: 'Perro',
      breed: '',
      age: '',
      weight: '',
      avatarUrl: PET_AVATARS[2]
    });
  };

  const handleRequestApptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPet = myPets.find(p => p.id === reqForm.petId);
    if (!targetPet) return;

    const newAppt = {
      id: `appt-c${Date.now()}`,
      petName: targetPet.name,
      reason: reqForm.reason,
      doctor: reqForm.doctor,
      date: reqForm.date,
      time: reqForm.time,
      status: 'scheduled'
    };

    setAppointments([newAppt, ...appointments]);
    setShowRequestAppt(false);

    // Generate quick mock Push Notification confirm
    setNotifications([
      {
        id: `n-${Date.now()}`,
        title: 'Cita Solicitada 🐾',
        body: `Tu solicitud para ${targetPet.name} con el ${reqForm.doctor} ha sido agendada con éxito para el ${reqForm.date}.`,
        type: 'appointment',
        date: 'Ahora mismo',
        isRead: false
      },
      ...notifications
    ]);

    alert('Cita solicitada exitosamente. Tu confirmación ya está disponible en tu bandeja de notificaciones push.');
  };

  const handleStoreAddToCart = (item: any) => {
    setStoreCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleUpdateStoreCartQty = (id: string, delta: number) => {
    setStoreCart(prev => prev.map(item => {
      if (item.id === id) {
        const nq = item.qty + delta;
        return nq > 0 ? { ...item, qty: nq } : null;
      }
      return item;
    }).filter(Boolean) as any[]);
  };

  const storeCartTotal = storeCart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleStoreCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentDone(true);
    setTimeout(() => {
      setStoreCart([]);
      setShowStoreCheckout(false);
      setPaymentDone(false);
      // Notify
      setNotifications([
        {
          id: `n-${Date.now()}`,
          title: 'Compra Confirmada 📦',
          body: 'Tu pedido Click & Collect está listo para recoger en recepción con tu folio: ZB-COLL-928.',
          type: 'promo',
          date: 'Ahora mismo',
          isRead: false
        },
        ...notifications
      ]);
      alert('¡Pago autorizado con éxito! Recibirás un correo con las instrucciones de recolección Click & Collect en clínica.');
    }, 1800);
  };

  const toggleNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex-1 flex flex-col font-sans bg-slate-50 min-h-screen max-w-md mx-auto relative border-x border-slate-200/50" id="client-pwa-container">
      
      {/* MOBILE HEADER BAR */}
      {!hideHeader && (
        <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-3xs" id="client-header">
          <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-lg shadow-inner">
            🐶
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 leading-none">Sophia Martinez</h3>
            <span className="text-[8px] uppercase tracking-wider text-cyan-600 font-extrabold mt-1 block">Miembro Zeebra</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 relative">
          {/* Push notification bell */}
          <button 
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-500 hover:text-slate-800 relative cursor-pointer"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-pink-500 text-white font-black text-[8px] rounded-full flex items-center justify-center border border-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={onExitRole}
            className="text-[9.5px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-100"
          >
            Salir
          </button>

          {/* NOTIFICATIONS DROPDOWN MOCKUP */}
          {showNotificationsDropdown && (
            <div className="absolute right-0 top-12 bg-white w-72 rounded-2xl border border-slate-150 shadow-2xl p-4 space-y-3 z-50 animate-fade-in" id="notif-dropdown">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span className="text-[10px] font-black uppercase text-slate-500">Notificaciones Push</span>
                <button 
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                  }}
                  className="text-[8.5px] text-cyan-600 font-bold hover:underline"
                >
                  Marcar leídas
                </button>
              </div>

              <div className="divide-y divide-slate-50 max-h-[220px] overflow-y-auto space-y-2">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => toggleNotificationRead(n.id)}
                    className={`py-2 text-[10px] space-y-0.5 cursor-pointer rounded-lg px-2 transition-colors ${!n.isRead ? 'bg-cyan-50/40 font-semibold' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-800 font-extrabold">{n.title}</span>
                      <span className="text-[7.5px] text-slate-400">{n.date}</span>
                    </div>
                    <p className="text-slate-500 leading-normal">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* QUICK FLOATING EMERGENCY BUTTON */}
      <div className="px-5 py-2.5 bg-rose-50 border-b border-rose-100 flex items-center justify-between" id="quick-emergency">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
          <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wide">¿Urgencia Veterinaria?</span>
        </div>
        <a
          href="tel:4448372832"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md shadow-rose-500/15 cursor-pointer"
        >
          <Phone className="h-3 w-3" />
          <span>Llamar (444) 837-2832</span>
        </a>
      </div>

      {/* MAIN PWA MOBILE VIEWPORT */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-24 space-y-6" id="client-viewport">
        
        {/* ======================= TAB: HOME (PORTAL PRINCIPAL) ======================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in" id="client-home-tab">
            
            {/* WELCOME HERO & BIOMETRIC MOCK */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-[28px] p-5 text-white shadow-lg relative overflow-hidden">
              <div className="space-y-1.5 relative z-10">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-cyan-100">Fidelidad Familiar</h4>
                <h3 className="text-base font-black tracking-tight leading-tight">¡Hola, Sophia!</h3>
                <p className="text-[10px] text-cyan-50/80 leading-relaxed max-w-[200px]">Cuentas con acceso móvil exclusivo para cuidar a tus mascotas las 24 horas.</p>
              </div>

              {/* Biometric setup notification badge */}
              <div className="mt-4 bg-white/10 backdrop-blur-3xs border border-white/20 p-2.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-black block">🔑 Soporte de Huella / Rostro</span>
                  <p className="text-[8.5px] text-cyan-100/90 mt-0.5">{isBiometricRegistered ? 'Acceso biométrico activo' : 'Registra tu rostro/huella para entrar más rápido'}</p>
                </div>
                {!isBiometricRegistered ? (
                  <button 
                    onClick={() => setShowBiometricSetup(true)}
                    className="bg-white text-cyan-700 font-extrabold text-[8.5px] px-2.5 py-1.5 rounded-xl uppercase hover:bg-cyan-50 cursor-pointer"
                  >
                    Activar
                  </button>
                ) : (
                  <span className="text-[9px] font-bold text-emerald-200">Activo ✓</span>
                )}
              </div>

              {/* Aesthetic background design */}
              <div className="absolute right-4 bottom-2 opacity-15 text-7xl select-none pointer-events-none">
                🐾
              </div>
            </div>

            {/* MY MASCOTS QUICK SLIDER */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Mis Mascotas Activas</h4>
                <button 
                  onClick={() => setActiveTab('pets')}
                  className="text-[10px] text-cyan-600 font-bold hover:underline"
                >
                  Administrar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3" id="home-pets-row">
                {myPets.map(pet => (
                  <div key={pet.id} className="bg-white p-3.5 rounded-2xl border border-slate-150 shadow-3xs flex items-center space-x-3">
                    <img 
                      src={pet.photo} 
                      alt={pet.name} 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-xl object-cover shadow-inner"
                    />
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-xs leading-none">{pet.name}</h5>
                      <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500 font-bold inline-block mt-1">{pet.breed}</span>
                      <p className="text-[9.5px] text-emerald-500 font-bold mt-1 flex items-center space-x-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span>Sano</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS BUTTONS GRID */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Acceso de Autoservicio</h4>
              
              <div className="grid grid-cols-3 gap-2.5" id="home-shortcut-grid">
                <button
                  onClick={() => {
                    setActiveTab('appointments');
                    setShowRequestAppt(true);
                  }}
                  className="bg-white p-3 rounded-2xl border border-slate-150 flex flex-col items-center justify-center text-center hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <span className="text-lg">📅</span>
                  <span className="text-[9.5px] font-bold text-slate-600 mt-2 leading-tight">Pedir Cita</span>
                </button>

                <button
                  onClick={() => setActiveTab('health')}
                  className="bg-white p-3 rounded-2xl border border-slate-150 flex flex-col items-center justify-center text-center hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <span className="text-lg">💉</span>
                  <span className="text-[9.5px] font-bold text-slate-600 mt-2 leading-tight">Ver Cartilla</span>
                </button>

                <button
                  onClick={() => setActiveTab('store')}
                  className="bg-white p-3 rounded-2xl border border-slate-150 flex flex-col items-center justify-center text-center hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <span className="text-lg">🛒</span>
                  <span className="text-[9.5px] font-bold text-slate-600 mt-2 leading-tight">Tienda</span>
                </button>
              </div>
            </div>

            {/* BRAND SOCIAL LINKS SUPPORT */}
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200/60 text-center space-y-3" id="brand-social-links">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">zeebra Hospital Veterinario</h5>
              <p className="text-[9px] text-slate-400 px-2 leading-relaxed">Conéctate directo con nuestros canales de soporte o redes oficiales para enterarte de eventos y estéticas.</p>
              
              <div className="flex justify-center space-x-3 pt-1">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-pink-600 border border-slate-200 flex items-center justify-center shadow-3xs hover:bg-slate-50"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://whatsapp.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-emerald-600 border border-slate-200 flex items-center justify-center shadow-3xs hover:bg-slate-50"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a 
                  href="tel:4448372832" 
                  className="w-8 h-8 rounded-full bg-white text-cyan-600 border border-slate-200 flex items-center justify-center shadow-3xs hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB: PETS (MIS MASCOTAS) ======================= */}
        {activeTab === 'pets' && (
          <div className="space-y-5 animate-fade-in" id="client-pets-tab">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Expedientes de mis Mascotas</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">Datos biométricos y de identificación de tus compañeros.</p>
              </div>
              <button
                onClick={() => setShowAddPetModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs p-2 rounded-full flex items-center justify-center cursor-pointer shadow-md shadow-cyan-500/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4" id="pets-cards-list">
              {myPets.map(pet => (
                <div key={pet.id} className="bg-white rounded-3xl p-4.5 border border-slate-150 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <img 
                        src={pet.photo} 
                        alt={pet.name} 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover shadow-inner border border-white"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-extrabold text-sm text-slate-800">{pet.name}</h4>
                          <span className="text-[8.5px] bg-cyan-100 text-cyan-700 font-extrabold px-1.5 rounded-full">{pet.type}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{pet.breed} • {pet.age}</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold px-2 py-0.5 rounded-full">
                      Expediente Activo
                    </span>
                  </div>

                  {/* Micro medical parameters indicator */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl text-[10px]">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[8px]">Peso Registrado:</span>
                      <span className="font-extrabold text-slate-700">{pet.weight}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold uppercase text-[8px]">Desparasitación:</span>
                      <span className="font-extrabold text-slate-700">{pet.dewormings[0]?.name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setReqForm(prev => ({ ...prev, petId: pet.id }));
                        setShowRequestAppt(true);
                        setActiveTab('appointments');
                      }}
                      className="text-[9.5px] font-bold text-cyan-600 bg-cyan-50 hover:bg-cyan-100 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
                    >
                      Solicitar Consulta para {pet.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: APPOINTMENTS (AGENDAMIENTO ONLINE) ======================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-5 animate-fade-in" id="client-appts-tab">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Historial & Solicitud de Citas</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">Agenda chequeos y consulta horas confirmadas.</p>
              </div>
              <button
                onClick={() => setShowRequestAppt(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-3.5 py-2 rounded-full cursor-pointer shadow-md shadow-cyan-500/10 flex items-center space-x-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Pedir Cita</span>
              </button>
            </div>

            {/* List of client-side appointments */}
            <div className="space-y-3" id="client-appts-history">
              {appointments.map(appt => (
                <div key={appt.id} className="bg-white rounded-2xl p-4 border border-slate-150 shadow-3xs flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-black text-slate-800 text-xs">{appt.petName}</span>
                      <span className="text-[8px] bg-slate-100 text-slate-500 font-bold px-1.5 rounded">{appt.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Médico: {appt.doctor}</p>
                    <p className="text-[9.5px] text-slate-400 italic">"{appt.reason}"</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block font-bold">{appt.date}</span>
                    {appt.status === 'completed' ? (
                      <span className="text-[8.5px] bg-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded mt-1.5 inline-block uppercase">Atendido</span>
                    ) : (
                      <span className="text-[8.5px] bg-cyan-100 text-cyan-700 font-extrabold px-2 py-0.5 rounded mt-1.5 inline-block uppercase animate-pulse">Agendado</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: HEALTH (CARTILLA DIGITAL & RECETAS) ======================= */}
        {activeTab === 'health' && (
          <div className="space-y-6 animate-fade-in" id="client-health-tab">
            <div>
              <h3 className="text-sm font-black text-slate-800 tracking-tight">Cartilla Digital de Salud</h3>
              <p className="text-[9.5px] text-slate-400 mt-0.5">Control público de vacunas, desparasitaciones y recetas descargables.</p>
            </div>

            {/* Pet Selector for Vaccine Card */}
            {myPets.map(pet => (
              <div key={pet.id} className="bg-white rounded-3xl p-4.5 border border-slate-150 shadow-3xs space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-50 pb-2">
                  <span className="text-xs">🐾</span>
                  <h4 className="text-xs font-black text-slate-700 uppercase">Cartilla de {pet.name}</h4>
                </div>

                {/* Vaccines Checklist */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] font-black uppercase text-cyan-600 block">Esquema de Vacunación</span>
                  
                  <div className="space-y-2">
                    {pet.vaccines.map(vac => (
                      <div key={vac.id} className="flex items-center justify-between text-[11px] p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${vac.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'}`}>
                            {vac.status === 'completed' && '✓'}
                          </div>
                          <span className="font-bold text-slate-700">{vac.name}</span>
                        </div>
                        <span className={`text-[9.5px] font-bold ${vac.status === 'completed' ? 'text-emerald-600' : 'text-amber-500 bg-amber-50 px-1.5 rounded'}`}>
                          {vac.status === 'completed' ? 'Aplicada' : `Próxima: ${vac.date}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dewormings list */}
                <div className="space-y-2">
                  <span className="text-[9.5px] font-black uppercase text-cyan-600 block">Desparasitaciones Internas</span>
                  {pet.dewormings.map((dew, i) => (
                    <div key={i} className="text-[10px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between">
                      <div>
                        <span className="font-bold text-slate-700">{dew.name}</span>
                        <p className="text-[8.5px] text-slate-400 mt-0.5">Última: {dew.date}</p>
                      </div>
                      <span className="font-extrabold text-cyan-600 self-center">Próxima: {dew.nextDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* DIGITAL RECETAS EMITIDAS */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Mis Recetas Digitales</h4>
              
              <div className="space-y-2.5" id="rx-list-container">
                {digitalPrescriptions.map(rx => (
                  <div key={rx.id} className="bg-white p-3.5 rounded-2xl border border-slate-150 shadow-3xs flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-black text-slate-800 text-xs">Receta de {rx.petName}</span>
                        <span className="text-[8.5px] bg-slate-100 text-slate-500 px-1.5 rounded">{rx.date}</span>
                      </div>
                      <p className="text-[9.5px] text-slate-400 truncate max-w-[200px]">Diag: {rx.diagnostic}</p>
                    </div>

                    <button
                      onClick={() => setSelectedRx(rx)}
                      className="text-[9px] font-bold text-cyan-600 hover:bg-cyan-50 border border-cyan-100 px-2.5 py-1.5 rounded-full cursor-pointer flex items-center space-x-0.5 shrink-0"
                    >
                      <Download className="h-3 w-3" />
                      <span>Ver Receta</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB: STORE (TIENDA & PAGOS) ======================= */}
        {activeTab === 'store' && (
          <div className="space-y-6 animate-fade-in" id="client-store-tab">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Tienda zeebra Mascotas</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">Click & Collect: Paga en línea y recoge rápido en recepción.</p>
              </div>

              {/* Store Cart count */}
              {storeCart.length > 0 && (
                <button
                  onClick={() => setShowStoreCheckout(true)}
                  className="bg-cyan-500 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-full flex items-center space-x-1 shadow-lg shadow-cyan-500/15 cursor-pointer hover:bg-cyan-600"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Carrito ({storeCart.reduce((sum, i) => sum + i.qty, 0)})</span>
                </button>
              )}
            </div>

            {/* Store Catalog Items Grid */}
            <div className="grid grid-cols-2 gap-3" id="store-catalog">
              {storeCatalog.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-150 p-3 shadow-3xs flex flex-col justify-between h-56">
                  <div className="space-y-2">
                    <img 
                      src={item.photo} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-24 object-cover rounded-xl shadow-inner bg-slate-50 border border-slate-50"
                    />
                    <h4 className="text-[10.5px] font-black text-slate-800 leading-tight line-clamp-2">{item.name}</h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                    <span className="text-[11px] font-extrabold text-slate-800">${item.price}</span>
                    <button
                      onClick={() => handleStoreAddToCart(item)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white p-1 rounded-full cursor-pointer transition-colors"
                      title="Añadir al carrito"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================== */}
      {/* ==================== CLIENT MODALS ======================= */}
      {/* ========================================================== */}

      {/* BIOMETRIC SETUP SIMULATION MODAL */}
      {showBiometricSetup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="biometric-modal">
          <div className="bg-white rounded-[32px] p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="text-3xl select-none animate-pulse">
              🛡️
            </div>
            <div>
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Activar Biomotores PWA</h3>
              <p className="text-[10px] text-slate-500 leading-normal mt-1.5">zeebra utiliza el protocolo WebAuthn nativo para registrar tu huella dactilar o FaceID en este dispositivo.</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[10px] text-slate-500 text-left space-y-1">
              <p>📱 <strong>Dispositivo:</strong> Compatible ✓</p>
              <p>🔐 <strong>Encriptación:</strong> AES-256 local</p>
            </div>

            <button
              onClick={() => {
                setIsBiometricRegistered(true);
                setShowBiometricSetup(false);
                alert('¡Biometría registrada con éxito en el dispositivo móvil simulated!');
              }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              Registrar Huella / FaceID
            </button>
            <button
              onClick={() => setShowBiometricSetup(false)}
              className="text-[10px] text-slate-400 font-bold hover:underline block mx-auto cursor-pointer"
            >
              En otro momento
            </button>
          </div>
        </div>
      )}

      {/* ALTA MASCOTA MODAL */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="add-pet-modal">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-xs font-black text-slate-800 uppercase">Añadir Mascota</h4>
              <button onClick={() => setShowAddPetModal(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddPet} className="space-y-3.5">
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Selecciona su Avatar</label>
                <div className="flex space-x-2">
                  {PET_AVATARS.map((pic, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewPetForm({ ...newPetForm, avatarUrl: pic })}
                      className={`w-10 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${newPetForm.avatarUrl === pic ? 'border-cyan-500 scale-105 shadow-md' : 'border-transparent opacity-60'}`}
                    >
                      <img src={pic} alt="avatar option" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Oliver"
                  value={newPetForm.name}
                  onChange={(e) => setNewPetForm({ ...newPetForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Tipo</label>
                  <select
                    value={newPetForm.type}
                    onChange={(e) => setNewPetForm({ ...newPetForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  >
                    <option value="Perro">🐶 Perro</option>
                    <option value="Gato">🐱 Gato</option>
                    <option value="Ave">🦜 Ave</option>
                    <option value="Otro">🐰 Otro</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Raza</label>
                  <input
                    type="text"
                    placeholder="Siamés / Mestizo"
                    value={newPetForm.breed}
                    onChange={(e) => setNewPetForm({ ...newPetForm, breed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Edad</label>
                  <input
                    type="text"
                    placeholder="2 años"
                    value={newPetForm.age}
                    onChange={(e) => setNewPetForm({ ...newPetForm, age: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Peso Aprox.</label>
                  <input
                    type="text"
                    placeholder="12 kg"
                    value={newPetForm.weight}
                    onChange={(e) => setNewPetForm({ ...newPetForm, weight: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
              >
                Completar Registro Mascota
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SOLICITAR CITA ONLINE MODAL */}
      {showRequestAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="request-appt-modal">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-xs font-black text-slate-800 uppercase">Agendar Cita en Línea</h4>
              <button onClick={() => setShowRequestAppt(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRequestApptSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Mascota Paciente</label>
                <select
                  value={reqForm.petId}
                  onChange={(e) => setReqForm({ ...reqForm, petId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                >
                  {myPets.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.breed})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Veterinario de Preferencia</label>
                <select
                  value={reqForm.doctor}
                  onChange={(e) => setReqForm({ ...reqForm, doctor: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="Dr. Roberto Díaz">Dr. Roberto Díaz (Cirujano)</option>
                  <option value="Dra. Amanda Vargas">Dra. Amanda Vargas (Cardióloga)</option>
                  <option value="Dr. Kenji Sato">Dr. Kenji Sato (Neurología)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Fecha Disponible</label>
                  <input
                    type="date"
                    required
                    value={reqForm.date}
                    onChange={(e) => setReqForm({ ...reqForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Hora de Interés</label>
                  <input
                    type="text"
                    required
                    placeholder="10:00 AM"
                    value={reqForm.time}
                    onChange={(e) => setReqForm({ ...reqForm, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Motivo del Chequeo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Vacuna de refuerzo / Tos ocasional"
                  value={reqForm.reason}
                  onChange={(e) => setReqForm({ ...reqForm, reason: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
              >
                Solicitar Reserva Online
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VER RECETA LIGHTBOX */}
      {selectedRx && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="rx-viewer">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-[9px] font-black uppercase text-cyan-600 tracking-wider">Recetario Oficial Digital</span>
              <button onClick={() => setSelectedRx(null)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl font-sans text-xs text-slate-600 space-y-3.5 border border-slate-150 relative">
              <div className="text-center space-y-0.5 border-b border-slate-200/60 pb-2.5">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase">zeebra Hospital Veterinario</h4>
                <p className="text-[9px] text-slate-400">Médico: {selectedRx.doctor}</p>
                <p className="text-[9px] text-slate-400">Fecha de Emisión: {selectedRx.date}</p>
              </div>

              <div>
                <span className="text-[9px] font-black uppercase text-slate-400">Paciente:</span>
                <p className="font-extrabold text-slate-800">{selectedRx.petName} (Mascota de Sophia Martinez)</p>
              </div>

              <div>
                <span className="text-[9px] font-black uppercase text-slate-400">Diagnóstico Clínico:</span>
                <p className="text-slate-700 leading-normal mt-0.5 italic">"{selectedRx.diagnostic}"</p>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-200/60">
                <span className="text-[9px] font-black uppercase text-slate-400">Medicamentos Prescritos:</span>
                {selectedRx.medications.map((med: any, i: number) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-slate-100 space-y-0.5">
                    <span className="font-black text-slate-800">{med.name}</span>
                    <p className="text-[10px] text-slate-500">{med.dosage} • {med.frequency} por {med.duration}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2 text-[8px] text-slate-400 select-none">
                📍 Firma Digital Certificada por zeebra COPR
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => {
                  alert('Receta enviada por correo electrónico exitosamente.');
                  setSelectedRx(null);
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2 rounded-full cursor-pointer transition-colors flex items-center justify-center space-x-1"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Reenviar Email</span>
              </button>
              <button 
                onClick={() => {
                  alert('PDF de receta digital descargado exitosamente.');
                  setSelectedRx(null);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-full cursor-pointer transition-colors border border-slate-250 flex items-center justify-center space-x-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLICK & COLLECT CHECKOUT COMPRA MODAL */}
      {showStoreCheckout && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="store-checkout-modal">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="text-xs font-black text-slate-800 uppercase">Liquidar Pedido Click & Collect</h4>
              <button onClick={() => setShowStoreCheckout(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleStoreCheckoutSubmit} className="space-y-4">
              
              {/* Cart List Brief */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 max-h-24 overflow-y-auto">
                {storeCart.map(item => (
                  <div key={item.id} className="flex justify-between text-[11px] text-slate-600">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-bold">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center font-extrabold text-slate-800 text-xs border-t border-slate-100 pt-2">
                <span>Total Compra:</span>
                <span className="text-cyan-600 text-sm font-black">${storeCartTotal} MXN</span>
              </div>

              {/* Payment Details */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-black uppercase text-cyan-600 block">Tarjeta de Crédito / Débito</span>
                
                <div className="space-y-1.5">
                  <input
                    type="text"
                    required
                    placeholder="4152 3829 1029 3820"
                    maxLength={19}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      maxLength={5}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none text-center"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVV"
                      maxLength={3}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 p-3 rounded-2xl border border-cyan-100 text-[9.5px] text-cyan-800 leading-normal flex items-start space-x-1.5">
                <Info className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                <p><strong>Click & Collect:</strong> Tras confirmar tu pago, tu orden se empaqueta de inmediato para que la recojas al instante en la clínica.</p>
              </div>

              <button
                type="submit"
                disabled={paymentDone}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-3 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/15"
              >
                {paymentDone ? 'Procesando Pago Seguro...' : 'Autorizar Pago En Línea'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE PWA NAV TAB BAR - Fixed Bottom */}
      <div className="bg-white border-t border-slate-200 grid grid-cols-5 py-2 px-2 fixed bottom-0 left-0 right-0 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]" id="client-mobile-tabs">
        {[
          { tab: 'home', icon: '🏠', label: 'Inicio' },
          { tab: 'pets', icon: '🐾', label: 'Mascotas' },
          { tab: 'appointments', icon: '📅', label: 'Citas' },
          { tab: 'health', icon: '💉', label: 'Cartilla' },
          { tab: 'store', icon: '🛒', label: 'Tienda' }
        ].map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab as any)}
              className="flex flex-col items-center justify-center text-center space-y-1 cursor-pointer"
              id={`tab-mobile-${item.tab}`}
            >
              <span className={`text-base transition-transform ${isActive ? 'scale-110' : 'opacity-70'}`}>{item.icon}</span>
              <span className={`text-[9px] font-bold ${isActive ? 'text-cyan-600 font-extrabold' : 'text-slate-400'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
