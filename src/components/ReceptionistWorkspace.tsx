import React from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  User, 
  Phone, 
  Mail, 
  PlusCircle, 
  X, 
  ShoppingBag, 
  Check, 
  CheckCircle2, 
  Printer, 
  Download, 
  Send, 
  MessageSquare, 
  ClipboardList, 
  Package, 
  Users, 
  RefreshCw, 
  UserPlus, 
  FileText, 
  ChevronRight, 
  CreditCard,
  Building2,
  DollarSign,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Tag,
  Eye
} from 'lucide-react';

interface ReceptionistWorkspaceProps {
  onExitRole: () => void;
  hideHeader?: boolean;
}

// Pre-defined Pet avatars
const PET_PHOTOS = [
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&h=150&q=80', // Dog 1
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&h=150&q=80', // Cat 1
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=150&h=150&q=80', // Dog 2
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150&q=80', // Dog 3
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150&q=80'  // Dog 4
];

export default function ReceptionistWorkspace({ onExitRole, hideHeader = false }: ReceptionistWorkspaceProps) {
  // Navigation tabs for Receptionist Console
  const [activeTab, setActiveTab] = React.useState<'appointments' | 'crm' | 'pos' | 'inventory' | 'chat'>('appointments');

  // Appointments central list state
  const [appointments, setAppointments] = React.useState([
    {
      id: 'appt-r1',
      petName: 'Luna',
      petType: 'Gato',
      breed: 'Siamés',
      ownerName: 'Lucas Williams',
      phone: '444-123-4567',
      email: 'lucas@gmail.com',
      vetId: 'dr-doe',
      vetName: 'Dr. Roberto Díaz',
      date: '2026-07-05',
      time: '11:00 AM',
      status: 'upcoming', // 'upcoming' | 'completed' | 'cancelled' | 'in-progress'
      reason: 'Chequeo por Tos y Deshidratación',
      isUrgent: false
    },
    {
      id: 'appt-r2',
      petName: 'Max',
      petType: 'Perro',
      breed: 'Golden Retriever',
      ownerName: 'Sophia Martinez',
      phone: '444-987-6543',
      email: 'sophia@example.com',
      vetId: 'dr-vance',
      vetName: 'Dra. Amanda Vargas',
      date: '2026-07-05',
      time: '09:30 AM',
      status: 'completed',
      reason: 'Vacunación Séxtuple y Control de Otitis',
      isUrgent: false
    },
    {
      id: 'appt-r3',
      petName: 'Rocky',
      petType: 'Perro',
      breed: 'Bulldog Francés',
      ownerName: 'Emma Watson',
      phone: '444-555-8899',
      email: 'emma@watson.co',
      vetId: 'dr-doe',
      vetName: 'Dr. Roberto Díaz',
      date: '2026-07-05',
      time: '01:30 PM',
      status: 'upcoming',
      reason: 'Tratamiento Alergias en Piel y Prurito',
      isUrgent: true // Urgent status!
    },
    {
      id: 'appt-r4',
      petName: 'Coco',
      petType: 'Ave',
      breed: 'Loro Gris',
      ownerName: 'Liam Neeson',
      phone: '444-222-3333',
      email: 'liam@neeson.net',
      vetId: 'dr-sato',
      vetName: 'Dr. Kenji Sato',
      date: '2026-07-06',
      time: '03:00 PM',
      status: 'upcoming',
      reason: 'Revisión periódica de Plumaje',
      isUrgent: false
    }
  ]);

  // Appointment modals/forms state
  const [showAddAppt, setShowAddAppt] = React.useState(false);
  const [showRescheduleAppt, setShowRescheduleAppt] = React.useState<any | null>(null);
  const [newApptForm, setNewApptForm] = React.useState({
    petName: '',
    petType: 'Perro',
    breed: '',
    ownerName: '',
    phone: '',
    email: '',
    vetId: 'dr-doe',
    date: '2026-07-05',
    time: '12:00 PM',
    reason: '',
    isUrgent: false
  });

  // Emergency simulation status
  const [showEmergencyTriage, setShowEmergencyTriage] = React.useState(false);
  const [emergencyPhoneText, setEmergencyPhoneText] = React.useState('(444) 837-2832');

  // CRM Search and client list state
  const [crmSearch, setCrmSearch] = React.useState('');
  const [showAddClient, setShowAddClient] = React.useState(false);
  const [selectedPetPhoto, setSelectedPetPhoto] = React.useState(PET_PHOTOS[0]);
  const [clients, setClients] = React.useState([
    {
      id: 'c-1',
      ownerName: 'Lucas Williams',
      phone: '444-123-4567',
      email: 'lucas@gmail.com',
      joinedDate: '2025-03-12',
      pets: [
        { name: 'Luna', type: 'Gato', breed: 'Siamés', age: '2 años', photo: PET_PHOTOS[1], medicalNote: 'Ligera alergia al pescado.' }
      ]
    },
    {
      id: 'c-2',
      ownerName: 'Sophia Martinez',
      phone: '444-987-6543',
      email: 'sophia@example.com',
      joinedDate: '2024-08-19',
      pets: [
        { name: 'Max', type: 'Perro', breed: 'Golden Retriever', age: '3 años', photo: PET_PHOTOS[0], medicalNote: 'Excelente temperamento.' }
      ]
    },
    {
      id: 'c-3',
      ownerName: 'Emma Watson',
      phone: '444-555-8899',
      email: 'emma@watson.co',
      joinedDate: '2025-01-05',
      pets: [
        { name: 'Rocky', type: 'Perro', breed: 'Bulldog Francés', age: '1 año', photo: PET_PHOTOS[2], medicalNote: 'Sensibilidad en la piel.' }
      ]
    }
  ]);

  const [newClientForm, setNewClientForm] = React.useState({
    ownerName: '',
    phone: '',
    email: '',
    petName: '',
    petType: 'Perro',
    petBreed: '',
    petAge: '',
    medicalNote: ''
  });

  // POS / Sales states
  const [catalogSearch, setCatalogSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'meds' | 'food' | 'accs' | 'servs'>('all');
  const [posCatalog, setPosCatalog] = React.useState([
    { id: 'prod-1', name: 'NexGard Espectra Perro 15-30kg', category: 'meds', price: 420, stock: 15, unit: 'caja', desc: 'Tratamiento desparasitante interno y externo.' },
    { id: 'prod-2', name: 'Royal Canin Veterinary Diet Urinary S/O', category: 'food', price: 980, stock: 8, unit: 'kg', desc: 'Alimento de prescripción para la salud urinaria felina.' },
    { id: 'prod-3', name: 'Champú de Avena Coloidal Virbac', category: 'meds', price: 290, stock: 4, unit: 'pz', desc: 'Champú calmante para pieles sensibles.' },
    { id: 'prod-4', name: 'Apoquel 5.4mg Dermatológico', category: 'meds', price: 1100, stock: 12, unit: 'caja', desc: 'Control de prurito canino por dermatitis alérgica.' },
    { id: 'prod-5', name: 'Purina Pro Plan Cachorro Raza Med', category: 'food', price: 650, stock: 2, unit: 'kg', desc: 'Nutrición avanzada para cachorros.' },
    { id: 'prod-6', name: 'Gotas Óticas Otovet 15ml', category: 'meds', price: 240, stock: 18, unit: 'pz', desc: 'Tratamiento de otitis externa bacteriana.' },
    { id: 'prod-7', name: 'Collar de Piel Reforzado Zeebra', category: 'accs', price: 180, stock: 10, unit: 'pz', desc: 'Collar duradero con diseño exclusivo.' },
    { id: 'prod-8', name: 'Consulta Médica General Vet', category: 'servs', price: 500, stock: 999, unit: 'servicio', desc: 'Valoración general de mascota por médico de guardia.' },
    { id: 'prod-9', name: 'Servicio de Estética Canina Completo', category: 'servs', price: 350, stock: 999, unit: 'servicio', desc: 'Baño, corte de pelo, uñas y limpieza de glándulas.' }
  ]);

  const [cart, setCart] = React.useState<any[]>([]);
  const [showCheckoutSheet, setShowCheckoutSheet] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = React.useState({
    clientName: '',
    paymentMethod: 'Efectivo', // 'Efectivo' | 'Tarjeta de Crédito' | 'Transferencia'
    requiresInvoice: false,
    rfc: '',
    taxEmail: '',
    amountPaid: 0
  });
  
  // Completed sales log
  const [salesHistory, setSalesHistory] = React.useState<any[]>([]);
  const [selectedReceipt, setSelectedReceipt] = React.useState<any | null>(null);

  // Inventory Management states
  const [supplierList, setSupplierList] = React.useState([
    { id: 'sup-1', name: 'Distribuidora Veterinaria S.A. de C.V.', contact: 'Ing. Carlos Ortiz', phone: '555-938-1234', email: 'ventas@distrivet.com' },
    { id: 'sup-2', name: 'Laboratorios Boehringer Ingelheim México', contact: 'Dra. Elena Ruiz', phone: '555-102-3920', email: 'elena.ruiz@boehringer.com' },
    { id: 'sup-3', name: 'Alimentos Premium Royal Mascotas', contact: 'Marcos Juarez', phone: '444-392-1209', email: 'pedidos@royalmascotas.mx' }
  ]);
  const [showAddStock, setShowAddStock] = React.useState<any | null>(null);
  const [addStockAmount, setAddStockAmount] = React.useState(10);
  const [selectedSupplier, setSelectedSupplier] = React.useState('sup-1');

  // Internal Communication Chat states
  const [selectedDoctorId, setSelectedDoctorId] = React.useState('dr-doe');
  const [chats, setChats] = React.useState<any>({
    'dr-doe': [
      { sender: 'vet', text: 'Laura, ¿ya llegó Rocky? Me urge revisar su historial de alergias.', time: '11:45 AM' },
      { sender: 'receptionist', text: 'Hola Dr. Díaz. Sí, ya se registró en ventanilla y lo priorizamos en urgencias porque trae bastante comezón.', time: '11:46 AM' },
      { sender: 'vet', text: 'Perfecto, hazlo pasar en cuanto se desocupe la camilla 2.', time: '11:47 AM' }
    ],
    'dr-vance': [
      { sender: 'receptionist', text: 'Dra. Amanda, la dueña de Max pregunta si requiere ayuno para su consulta de eco.', time: '09:00 AM' },
      { sender: 'vet', text: 'No, no es necesario para Max hoy. Puedes decirle que pase directamente.', time: '09:02 AM' }
    ],
    'dr-sato': [
      { sender: 'receptionist', text: 'Dr. Kenji, ¿está disponible para recibir a Coco a las 3?', time: '10:15 AM' },
      { sender: 'vet', text: 'Sí, agéndalo sin problema Laura. Traigo libre esa hora.', time: '10:20 AM' }
    ]
  });
  const [chatInput, setChatInput] = React.useState('');

  // Doctor references
  const doctorsMap: any = {
    'dr-doe': 'Dr. Roberto Díaz',
    'dr-vance': 'Dra. Amanda Vargas',
    'dr-sato': 'Dr. Kenji Sato'
  };

  const doctorsList = [
    { id: 'dr-doe', name: 'Dr. Roberto Díaz', specialty: 'Cirujano & Cuidado Crítico', isOnline: true },
    { id: 'dr-vance', name: 'Dra. Amanda Vargas', specialty: 'Cardiología Preventiva', isOnline: true },
    { id: 'dr-sato', name: 'Dr. Kenji Sato', specialty: 'Neurología & Etología', isOnline: false }
  ];

  // Appointment Helpers
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptForm.petName || !newApptForm.ownerName) return;

    const newAppt = {
      id: `appt-r${Date.now()}`,
      petName: newApptForm.petName,
      petType: newApptForm.petType,
      breed: newApptForm.breed || 'Sin raza',
      ownerName: newApptForm.ownerName,
      phone: newApptForm.phone || 'N/A',
      email: newApptForm.email || 'N/A',
      vetId: newApptForm.vetId,
      vetName: doctorsMap[newApptForm.vetId],
      date: newApptForm.date,
      time: newApptForm.time,
      status: 'upcoming',
      reason: newApptForm.reason || 'Consulta General',
      isUrgent: newApptForm.isUrgent
    };

    setAppointments([newAppt, ...appointments]);
    setShowAddAppt(false);
    // Reset form
    setNewApptForm({
      petName: '',
      petType: 'Perro',
      breed: '',
      ownerName: '',
      phone: '',
      email: '',
      vetId: 'dr-doe',
      date: '2026-07-05',
      time: '12:00 PM',
      reason: '',
      isUrgent: false
    });
  };

  const handleRescheduleAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRescheduleAppt) return;

    setAppointments(prev => prev.map(appt => {
      if (appt.id === showRescheduleAppt.id) {
        return {
          ...appt,
          date: showRescheduleAppt.date,
          time: showRescheduleAppt.time
        };
      }
      return appt;
    }));
    setShowRescheduleAppt(null);
  };

  const handleCancelAppt = (id: string) => {
    setAppointments(prev => prev.map(appt => {
      if (appt.id === id) {
        return { ...appt, status: 'cancelled' };
      }
      return appt;
    }));
  };

  const handlePrioritizeUrgency = (id: string) => {
    setAppointments(prev => prev.map(appt => {
      if (appt.id === id) {
        return { ...appt, isUrgent: true };
      }
      return appt;
    }));
  };

  // CRM Helpers
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.ownerName || !newClientForm.petName) return;

    const newClient = {
      id: `c-${Date.now()}`,
      ownerName: newClientForm.ownerName,
      phone: newClientForm.phone || 'N/A',
      email: newClientForm.email || 'N/A',
      joinedDate: new Date().toISOString().split('T')[0],
      pets: [{
        name: newClientForm.petName,
        type: newClientForm.petType,
        breed: newClientForm.petBreed || 'Desconocido',
        age: newClientForm.petAge || '1 año',
        photo: selectedPetPhoto,
        medicalNote: newClientForm.medicalNote || 'Ninguna'
      }]
    };

    setClients([newClient, ...clients]);
    setShowAddClient(false);
    // Reset
    setNewClientForm({
      ownerName: '',
      phone: '',
      email: '',
      petName: '',
      petType: 'Perro',
      petBreed: '',
      petAge: '',
      medicalNote: ''
    });
  };

  const filteredClients = clients.filter(c => {
    const q = crmSearch.toLowerCase();
    const matchesOwner = c.ownerName.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
    const matchesPets = c.pets.some(p => p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q));
    return matchesOwner || matchesPets;
  });

  // POS Helpers
  const handleAddToCart = (product: any) => {
    if (product.stock <= 0 && product.category !== 'servs') return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as any[]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Deduct stock for actual physical goods
    setPosCatalog(prev => prev.map(p => {
      const inCart = cart.find(item => item.id === p.id);
      if (inCart && p.category !== 'servs') {
        return { ...p, stock: Math.max(0, p.stock - inCart.qty) };
      }
      return p;
    }));

    // Create printable transaction record
    const ticket = {
      ticketNumber: `ZBR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      clientName: checkoutForm.clientName || 'Público General',
      items: [...cart],
      total: cartTotal,
      paymentMethod: checkoutForm.paymentMethod,
      requiresInvoice: checkoutForm.requiresInvoice,
      rfc: checkoutForm.requiresInvoice ? checkoutForm.rfc : null,
      taxEmail: checkoutForm.requiresInvoice ? checkoutForm.taxEmail : null
    };

    setSalesHistory([ticket, ...salesHistory]);
    setSelectedReceipt(ticket);
    setCart([]);
    setShowCheckoutSheet(false);
    // Reset checkout form
    setCheckoutForm({
      clientName: '',
      paymentMethod: 'Efectivo',
      requiresInvoice: false,
      rfc: '',
      taxEmail: '',
      amountPaid: 0
    });
  };

  // Stock Add Helper
  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddStock) return;

    setPosCatalog(prev => prev.map(p => {
      if (p.id === showAddStock.id) {
        return { ...p, stock: p.stock + addStockAmount };
      }
      return p;
    }));
    setShowAddStock(null);
  };

  // Chat Internal Send Helper
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      sender: 'receptionist',
      text: chatInput,
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prev: any) => ({
      ...prev,
      [selectedDoctorId]: [...(prev[selectedDoctorId] || []), newMessage]
    }));
    setChatInput('');

    // Simulate doctor quick professional response
    setTimeout(() => {
      const replies = [
        '¡Entendido! Lo recibo enseguida.',
        'Gracias por avisar Laura, pídele que espere 5 minutos por favor.',
        'Perfecto, ya voy terminando con mi paciente actual.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      setChats((prev: any) => ({
        ...prev,
        [selectedDoctorId]: [...(prev[selectedDoctorId] || []), {
          sender: 'vet',
          text: randomReply,
          time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col font-sans" id="receptionist-root">
      
      {/* HEADER BAR */}
      {!hideHeader && (
        <div className="bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between shadow-3xs" id="receptionist-header">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-500/10">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-black text-slate-800 tracking-tight">Consola de Recepción</h2>
                <span className="text-[8px] bg-pink-100 text-pink-700 font-extrabold px-1.5 py-0.5 rounded-full uppercase">Operación & Caja</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Laura Pérez • Caja Central Abierta</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Urgent Trigger Alert Badge */}
            {appointments.some(a => a.status === 'upcoming' && a.isUrgent) && (
              <button 
                onClick={() => {
                  setActiveTab('appointments');
                  setShowEmergencyTriage(true);
                }}
                className="bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full flex items-center space-x-1.5 animate-pulse text-rose-600 font-bold text-[10px] cursor-pointer hover:bg-rose-100"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                <span>ALERTA DE URGENCIAS</span>
              </button>
            )}

            <button 
              onClick={onExitRole}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200 transition-all cursor-pointer"
            >
              Salir de Consola
            </button>
          </div>
        </div>
      )}

      {/* NAVIGATION TABS - Bottom Nav Bar on Mobile/Tablet */}
      <div 
        className="bg-white border-t border-slate-200 md:border-t-0 md:border-b md:border-slate-100 fixed bottom-0 left-0 right-0 md:static z-40 flex justify-around md:justify-start md:space-x-4 overflow-x-auto scrollbar-none py-1 md:py-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:shadow-none" 
        id="receptionist-tabs"
      >
        {(['appointments', 'crm', 'pos', 'inventory', 'chat'] as const).map((tab) => {
          const tabLabelMap = {
            appointments: 'Citas',
            crm: 'CRM',
            pos: 'POS',
            inventory: 'Stock',
            chat: 'Chat'
          };
          const tabIconMap = {
            appointments: <Calendar className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />,
            crm: <Users className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />,
            pos: <ShoppingBag className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />,
            inventory: <Package className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />,
            chat: <MessageSquare className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />
          };
          
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-initial py-1 md:py-3.5 font-bold text-[8.5px] md:text-xs uppercase tracking-wider md:border-b-2 flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-2 transition-all cursor-pointer ${isActive ? 'text-pink-600 md:border-pink-500 font-black' : 'text-slate-400 md:border-transparent hover:text-slate-600'}`}
              id={`tab-btn-${tab}`}
            >
              {tabIconMap[tab]}
              <span>{tabLabelMap[tab]}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN VIEW AREA */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-5 pb-24 md:p-6" id="receptionist-viewport">
        
        {/* ======================= CITAS Y CALENDARIO TAB ======================= */}
        {activeTab === 'appointments' && (
          <div className="max-w-6xl mx-auto space-y-6" id="appointments-panel">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">Agenda Global Hospitalaria</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Control centralizado de citas y triage inmediato de urgencias.</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowEmergencyTriage(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center space-x-1.5 shadow-md shadow-rose-500/10 cursor-pointer transition-colors"
                >
                  <AlertTriangle className="h-4 w-4 animate-bounce" />
                  <span>Ingresar Urgencia</span>
                </button>
                <button
                  onClick={() => setShowAddAppt(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center space-x-1.5 shadow-md shadow-pink-500/10 cursor-pointer transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agendar Nueva Cita</span>
                </button>
              </div>
            </div>

            {/* Quick Urgent Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="appointments-kpis">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs flex items-center space-x-4">
                <div className="p-3 bg-pink-50 text-pink-500 rounded-xl">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Programadas</span>
                  <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">
                    {appointments.filter(a => a.status === 'upcoming').length} Activas
                  </h4>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Atendidas Hoy</span>
                  <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">
                    {appointments.filter(a => a.status === 'completed').length} Completas
                  </h4>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl shadow-3xs flex items-center space-x-4">
                <div className="p-3 bg-rose-500 text-white rounded-xl animate-pulse">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500">Urgencias en Fila</span>
                  <h4 className="text-lg font-extrabold text-rose-700 mt-0.5">
                    {appointments.filter(a => a.status === 'upcoming' && a.isUrgent).length} Prioritarias
                  </h4>
                </div>
              </div>
            </div>

            {/* Centralized Appointments List */}
            <div className="bg-white rounded-[24px] border border-slate-150 shadow-2xs overflow-hidden" id="appointments-table-container">
              <div className="border-b border-slate-100 px-5 py-4 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Lista Central de Consultas</span>
                <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Filtrado: Hoy</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9.5px] uppercase tracking-wider text-slate-400 bg-slate-50/20">
                      <th className="py-3 px-5">Paciente y Mascota</th>
                      <th className="py-3 px-5">Propietario / Contacto</th>
                      <th className="py-3 px-5">Veterinario Asignado</th>
                      <th className="py-3 px-5">Fecha y Hora</th>
                      <th className="py-3 px-5">Motivo de Consulta</th>
                      <th className="py-3 px-5">Prioridad</th>
                      <th className="py-3 px-5 text-right">Acciones de Recepción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((appt) => (
                      <tr 
                        key={appt.id} 
                        className={`text-xs hover:bg-slate-50/70 transition-colors ${appt.isUrgent && appt.status === 'upcoming' ? 'bg-rose-50/35' : ''}`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shadow-inner border border-slate-200/50">
                              {appt.petType === 'Perro' ? '🐶' : appt.petType === 'Gato' ? '🐱' : '🦜'}
                            </div>
                            <div>
                              <h5 className="font-extrabold text-slate-800 leading-none">{appt.petName}</h5>
                              <p className="text-[10px] text-slate-400 mt-1">{appt.petType} • {appt.breed}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div>
                            <h5 className="font-bold text-slate-700">{appt.ownerName}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 flex items-center space-x-1">
                              <Phone className="h-2.5 w-2.5 inline" /> <span>{appt.phone}</span>
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center space-x-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="font-semibold text-slate-600">{appt.vetName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div>
                            <span className="font-extrabold text-slate-700 block">{appt.time}</span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">{appt.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-slate-500 max-w-[150px] truncate">
                          {appt.reason}
                        </td>
                        <td className="py-4 px-5">
                          {appt.isUrgent && appt.status === 'upcoming' ? (
                            <span className="text-[9px] font-black uppercase bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full animate-pulse border border-rose-200">
                              🚨 Urgencia
                            </span>
                          ) : appt.status === 'completed' ? (
                            <span className="text-[9px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              Cerrada
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                              Estándar
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-right space-x-1.5">
                          {appt.status === 'upcoming' ? (
                            <>
                              {!appt.isUrgent && (
                                <button
                                  onClick={() => handlePrioritizeUrgency(appt.id)}
                                  className="text-[10px] font-bold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md border border-rose-100 cursor-pointer"
                                  title="Priorizar como urgencia"
                                >
                                  Priorizar
                                </button>
                              )}
                              <button
                                onClick={() => setShowRescheduleAppt(appt)}
                                className="text-[10px] font-bold text-slate-500 hover:bg-slate-100 px-2 py-1 rounded-md border border-slate-200 cursor-pointer"
                              >
                                Reagendar
                              </button>
                              <button
                                onClick={() => handleCancelAppt(appt.id)}
                                className="text-[10px] font-bold text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-md cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">Sin acciones</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= CRM / PACIENTES TAB ======================= */}
        {activeTab === 'crm' && (
          <div className="max-w-6xl mx-auto space-y-6" id="crm-panel">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">Directorio CRM de Propietarios y Mascotas</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Búsqueda avanzada integrada y registro veloz en ventanilla.</p>
              </div>
              <button
                onClick={() => setShowAddClient(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center space-x-1.5 shadow-md shadow-pink-500/10 cursor-pointer transition-colors self-start sm:self-auto"
              >
                <UserPlus className="h-4 w-4" />
                <span>Alta Rápida Cliente</span>
              </button>
            </div>

            {/* COMBINED ADVANCED SEARCH BAR */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-3xs flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre del dueño, teléfono, correo o nombre de la mascota..."
                  value={crmSearch}
                  onChange={(e) => setCrmSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all outline-none"
                />
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase shrink-0">
                🔍 Búsqueda Combinada Activa
              </div>
            </div>

            {/* CUSTOMER DIRECTORY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="crm-results">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-white rounded-3xl border border-slate-150 p-5 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-800 tracking-tight">{client.ownerName}</h4>
                      <div className="space-y-1 mt-2 text-[10.5px] text-slate-500">
                        <p className="flex items-center space-x-1.5">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <span>{client.phone}</span>
                        </p>
                        <p className="flex items-center space-x-1.5">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span>{client.email}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[8px] bg-slate-100 text-slate-600 font-bold uppercase px-2 py-0.5 rounded">
                      Cliente desde: {client.joinedDate}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-3.5 space-y-3">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-pink-600">Mascotas Registradas</h5>
                    
                    {client.pets.map((pet, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={pet.photo} 
                            alt={pet.name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-xl object-cover shadow-inner border border-white"
                          />
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-extrabold text-slate-800 text-xs">{pet.name}</span>
                              <span className="text-[9px] bg-pink-100 text-pink-700 font-semibold px-1.5 rounded-full">{pet.type}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{pet.breed} • {pet.age}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 block font-bold">Nota Médica:</span>
                          <span className="text-[9px] text-slate-500 italic block">{pet.medicalNote}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => {
                        // Quick populate sales client
                        setCheckoutForm(prev => ({ ...prev, clientName: client.ownerName }));
                        setCart([]);
                        setActiveTab('pos');
                      }}
                      className="text-[10px] font-bold text-pink-600 hover:bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                    >
                      Nueva Venta POS
                    </button>
                    <button
                      onClick={() => {
                        setNewApptForm(prev => ({
                          ...prev,
                          ownerName: client.ownerName,
                          phone: client.phone,
                          email: client.email,
                          petName: client.pets[0]?.name || '',
                          petType: client.pets[0]?.type || 'Perro',
                          breed: client.pets[0]?.breed || ''
                        }));
                        setShowAddAppt(true);
                        setActiveTab('appointments');
                      }}
                      className="text-[10px] font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                    >
                      Agendar Cita
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= PUNTO DE VENTA (POS) TAB ======================= */}
        {activeTab === 'pos' && (
          <div className="max-w-6xl mx-auto space-y-6" id="pos-panel">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">POS Móvil de Clínica</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Liquida medicamentos, consultas y productos sin demoras.</p>
              </div>
              {salesHistory.length > 0 && (
                <button
                  onClick={() => setSelectedReceipt(salesHistory[0])}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-full flex items-center space-x-1 border border-slate-250 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Ver Último Ticket</span>
                </button>
              )}
            </div>

            {/* TWO-COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="pos-grid">
              
              {/* LEFT COLUMN: CATALOG */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar en el catálogo de medicamentos o tienda..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    />
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pb-1">
                    {(['all', 'meds', 'food', 'accs', 'servs'] as const).map((cat) => {
                      const labels = { all: 'Todos', meds: 'Medicamentos', food: 'Alimentos', accs: 'Accesorios', servs: 'Servicios' };
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${isActive ? 'bg-pink-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                        >
                          {labels[cat]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" id="pos-catalog-grid">
                  {posCatalog
                    .filter(p => {
                      const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || p.desc.toLowerCase().includes(catalogSearch.toLowerCase());
                      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
                      return matchesSearch && matchesCategory;
                    })
                    .map((prod) => {
                      const isLowStock = prod.stock <= 3 && prod.category !== 'servs';
                      return (
                        <div key={prod.id} className="bg-white rounded-2xl border border-slate-150 p-4 shadow-3xs flex flex-col justify-between hover:border-pink-300 transition-all group">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded ${
                                prod.category === 'meds' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                prod.category === 'food' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                prod.category === 'accs' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                'bg-purple-50 text-purple-600 border border-purple-100'
                              }`}>
                                {prod.category === 'meds' ? 'Fármaco' : prod.category === 'food' ? 'Alimento' : prod.category === 'accs' ? 'Accesorio' : 'Servicio'}
                              </span>
                              
                              {prod.category !== 'servs' && (
                                <span className={`text-[9px] font-bold ${isLowStock ? 'text-rose-500 bg-rose-50 px-1.5 rounded animate-pulse' : 'text-slate-400'}`}>
                                  Stock: {prod.stock} {prod.unit}
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs font-black text-slate-800 leading-tight mt-2.5 group-hover:text-pink-600 transition-colors line-clamp-2 h-8">{prod.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{prod.desc}</p>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                            <span className="text-xs font-black text-slate-800">${prod.price} MXN</span>
                            <button
                              onClick={() => handleAddToCart(prod)}
                              disabled={prod.stock === 0 && prod.category !== 'servs'}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all ${
                                prod.stock === 0 && prod.category !== 'servs' 
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                  : 'bg-pink-500 text-white hover:bg-pink-600'
                              }`}
                            >
                              <Plus className="h-3 w-3" />
                              <span>Agregar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* RIGHT COLUMN: CART */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl border border-slate-150 p-5 shadow-2xs space-y-4 sticky top-4" id="pos-cart">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                      <ShoppingBag className="h-4 w-4 text-pink-500" />
                      <span>Carrito de Ventas</span>
                    </span>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-extrabold px-2 py-0.5 rounded-full">{cart.reduce((acc, i) => acc + i.qty, 0)} Items</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-10 space-y-3" id="cart-empty-state">
                      <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100 shadow-inner">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-400">El carrito está vacío</div>
                      <p className="text-[10px] text-slate-400 px-5 leading-normal">Selecciona productos de la lista de la izquierda para comenzar la venta en mostrador.</p>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items List */}
                      <div className="divide-y divide-slate-50 max-h-[220px] overflow-y-auto pr-1" id="cart-items">
                        {cart.map((item) => (
                          <div key={item.id} className="py-2.5 flex items-start justify-between">
                            <div className="flex-1 pr-2">
                              <h5 className="text-[11px] font-extrabold text-slate-800 leading-snug line-clamp-2">{item.name}</h5>
                              <p className="text-[9.5px] text-slate-400 mt-0.5">${item.price} c/u</p>
                            </div>

                            <div className="flex items-center space-x-2.5">
                              {/* Quantity Control */}
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                <button 
                                  onClick={() => handleUpdateCartQty(item.id, -1)}
                                  className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-200 font-bold"
                                >
                                  -
                                </button>
                                <span className="px-2 text-[11px] font-bold text-slate-700">{item.qty}</span>
                                <button 
                                  onClick={() => handleUpdateCartQty(item.id, 1)}
                                  className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-200 font-bold"
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-slate-300 hover:text-rose-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Totals & Checkout Button */}
                      <div className="border-t border-slate-100 pt-4 space-y-3">
                        <div className="flex justify-between text-xs font-extrabold text-slate-800">
                          <span>Total a Liquidar:</span>
                          <span className="text-pink-600 font-black text-sm">${cartTotal} MXN</span>
                        </div>

                        {/* Customer Quick Link display if any */}
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-[10px]">
                          <div>
                            <span className="text-slate-400 block font-bold">Cliente asignado:</span>
                            <span className="font-extrabold text-slate-700">{checkoutForm.clientName || 'Venta Libre'}</span>
                          </div>
                          {checkoutForm.clientName ? (
                            <button 
                              onClick={() => setCheckoutForm(p => ({ ...p, clientName: '' }))}
                              className="text-slate-400 hover:text-slate-600 text-[9px] underline font-bold"
                            >
                              Remover
                            </button>
                          ) : (
                            <button 
                              onClick={() => setActiveTab('crm')}
                              className="text-pink-600 hover:text-pink-700 text-[9px] font-extrabold"
                            >
                              Asociar Dueño
                            </button>
                          )}
                        </div>

                        {/* Liquidar Button */}
                        <button
                          onClick={() => {
                            setCheckoutForm(prev => ({ ...prev, amountPaid: cartTotal }));
                            setShowCheckoutSheet(true);
                          }}
                          className="w-full bg-[#3db5d7] hover:bg-[#32a3c3] text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-cyan-500/15 flex items-center justify-center space-x-2 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Cobrar Ahora (Bottom Sheet)</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================= CONTROL DE INVENTARIO TAB ======================= */}
        {activeTab === 'inventory' && (
          <div className="max-w-6xl mx-auto space-y-6" id="inventory-panel">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">Control de Inventario y Almacén</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Gestión de stock, alertas de reabastecimiento y directorio de proveedores oficiales.</p>
              </div>
            </div>

            {/* Inventory Alarm Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="inventory-alerts">
              
              {/* LOW STOCK CARD */}
              <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-3xs space-y-4">
                <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                  <span className="text-[11px] font-bold text-rose-600 flex items-center space-x-1.5">
                    <AlertTriangle className="h-4 w-4 text-rose-500 animate-pulse" />
                    <span>Alertas de Bajo Stock (¡Acción Requerida!)</span>
                  </span>
                  <span className="text-[9px] bg-rose-100 text-rose-700 font-extrabold px-2 py-0.2 rounded">Critico</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {posCatalog
                    .filter(p => p.stock <= 4 && p.category !== 'servs')
                    .map(p => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <h5 className="font-extrabold text-slate-800 leading-none">{p.name}</h5>
                          <p className="text-[9.5px] text-slate-400 mt-1">Categoría: {p.category === 'meds' ? 'Fármaco' : 'Alimento'}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100/50">
                            Solo {p.stock} pzs
                          </span>
                          <button
                            onClick={() => {
                              setShowAddStock(p);
                              setAddStockAmount(15);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[9.5px] px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            Pedir Stock
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* SUPPLIERS DIRECTORY */}
              <div className="bg-white p-5 rounded-3xl border border-slate-150 shadow-3xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center space-x-1.5">
                    <Building2 className="h-4 w-4 text-pink-500" />
                    <span>Directorio de Proveedores y Distribución</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {supplierList.map(sup => (
                    <div key={sup.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <h5 className="font-extrabold text-slate-800 text-[11px]">{sup.name}</h5>
                        <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 rounded uppercase font-bold">Verificado</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                        <p>👤 {sup.contact}</p>
                        <p>📞 {sup.phone}</p>
                        <p className="col-span-2">✉️ {sup.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* General Stock Table */}
            <div className="bg-white rounded-3xl border border-slate-150 shadow-2xs overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Almacén General de Fármacos e Insumos</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9.5px] uppercase tracking-wider text-slate-400 bg-slate-50/30">
                      <th className="py-3 px-5">Insumo / Producto</th>
                      <th className="py-3 px-5">Categoría</th>
                      <th className="py-3 px-5">Precio Costo</th>
                      <th className="py-3 px-5">Stock Actual</th>
                      <th className="py-3 px-5">Estado</th>
                      <th className="py-3 px-5 text-right">Reabastecer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {posCatalog
                      .filter(p => p.category !== 'servs')
                      .map((p) => {
                        const status = p.stock === 0 ? 'out' : p.stock <= 4 ? 'low' : 'ok';
                        return (
                          <tr key={p.id} className="text-xs hover:bg-slate-50/50 transition-colors">
                            <td className="py-3.5 px-5 font-bold text-slate-800">{p.name}</td>
                            <td className="py-3.5 px-5 uppercase text-[9.5px] text-slate-400 font-bold">{p.category}</td>
                            <td className="py-3.5 px-5 font-semibold text-slate-600">${p.price} MXN</td>
                            <td className="py-3.5 px-5 font-black text-slate-700">{p.stock} {p.unit}s</td>
                            <td className="py-3.5 px-5">
                              {status === 'out' ? (
                                <span className="text-[8px] font-black uppercase bg-rose-100 text-rose-600 px-2 py-0.5 rounded">Agotado</span>
                              ) : status === 'low' ? (
                                <span className="text-[8px] font-black uppercase bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Bajo</span>
                              ) : (
                                <span className="text-[8px] font-black uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Óptimo</span>
                              )}
                            </td>
                            <td className="py-3.5 px-5 text-right">
                              <button
                                onClick={() => {
                                  setShowAddStock(p);
                                  setAddStockAmount(10);
                                }}
                                className="text-[10px] font-bold text-pink-500 hover:bg-pink-50 border border-pink-100 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
                              >
                                + Registrar Entrada
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= CHAT INTERNO TAB ======================= */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-150 shadow-xs flex flex-col md:grid md:grid-cols-12 h-[500px] overflow-hidden" id="chat-panel">
            
            {/* Doctors sidebar */}
            <div className="md:col-span-4 border-r border-slate-100 bg-slate-50/50 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">Médicos Consultores</h4>
                <p className="text-[9.5px] text-slate-400 mt-0.5">Canal de aviso de entrada rápido.</p>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100/60 p-2 space-y-1">
                {doctorsList.map(doc => {
                  const isActive = selectedDoctorId === doc.id;
                  const chatLogs = chats[doc.id] || [];
                  const lastMessage = chatLogs[chatLogs.length - 1];
                  
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center space-x-3 ${isActive ? 'bg-pink-500 text-white shadow-md shadow-pink-500/10' : 'hover:bg-slate-100'}`}
                    >
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center text-xs shadow-inner`}>
                          {doc.name.substring(4, 6)}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${doc.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h5 className="font-extrabold text-xs truncate leading-none">{doc.name}</h5>
                        </div>
                        <p className={`text-[9.5px] truncate mt-1 ${isActive ? 'text-pink-100' : 'text-slate-400'}`}>{lastMessage ? lastMessage.text : doc.specialty}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Body */}
            <div className="md:col-span-8 flex flex-col h-full bg-white">
              
              {/* Doctor Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800">{doctorsMap[selectedDoctorId]}</h4>
                    <p className="text-[9.5px] text-slate-400 mt-0.5">Enlace en Tiempo Real para Avisar Paciente</p>
                  </div>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/20" id="chat-history">
                {(chats[selectedDoctorId] || []).map((msg: any, idx: number) => {
                  const isMe = msg.sender === 'receptionist';
                  return (
                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${isMe ? 'bg-pink-500 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-slate-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendChatMessage} className="p-3.5 border-t border-slate-100 flex space-x-2">
                <input
                  type="text"
                  placeholder="Escribe un mensaje rápido (ej. 'Rocky en sala de espera, listo para consulta'...)"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* ======================= MODALES ======================== */}
      {/* ======================================================== */}

      {/* AGENDA NUEVA CITA MODAL */}
      {showAddAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-add-appt">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full border border-slate-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Agendar Cita Global</h3>
              <button onClick={() => setShowAddAppt(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mascota (Nombre)</label>
                  <input
                    type="text"
                    required
                    placeholder="Luna"
                    value={newApptForm.petName}
                    onChange={(e) => setNewApptForm(prev => ({ ...prev, petName: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de Mascota</label>
                  <select
                    value={newApptForm.petType}
                    onChange={(e) => setNewApptForm(prev => ({ ...prev, petType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  >
                    <option value="Perro">🐶 Perro</option>
                    <option value="Gato">🐱 Gato</option>
                    <option value="Ave">🦜 Ave</option>
                    <option value="Otro">🐰 Otro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Raza o Variedad</label>
                <input
                  type="text"
                  placeholder="Siamés / Husky"
                  value={newApptForm.breed}
                  onChange={(e) => setNewApptForm(prev => ({ ...prev, breed: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                />
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-pink-600 block">Información del Propietario</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Propietario</label>
                    <input
                      type="text"
                      required
                      placeholder="Lucas Williams"
                      value={newApptForm.ownerName}
                      onChange={(e) => setNewApptForm(prev => ({ ...prev, ownerName: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Celular / Teléfono</label>
                    <input
                      type="tel"
                      placeholder="444-123-4567"
                      value={newApptForm.phone}
                      onChange={(e) => setNewApptForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Veterinario</label>
                  <select
                    value={newApptForm.vetId}
                    onChange={(e) => setNewApptForm(prev => ({ ...prev, vetId: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  >
                    <option value="dr-doe">Dr. Roberto Díaz</option>
                    <option value="dr-vance">Dra. Amanda Vargas</option>
                    <option value="dr-sato">Dr. Kenji Sato</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Fecha</label>
                  <input
                    type="date"
                    value={newApptForm.date}
                    onChange={(e) => setNewApptForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Hora</label>
                  <input
                    type="text"
                    value={newApptForm.time}
                    onChange={(e) => setNewApptForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Motivo o Síntomas</label>
                <textarea
                  placeholder="Describir síntomas..."
                  value={newApptForm.reason}
                  onChange={(e) => setNewApptForm(prev => ({ ...prev, reason: e.target.value }))}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <input
                  type="checkbox"
                  id="urgentApptCheck"
                  checked={newApptForm.isUrgent}
                  onChange={(e) => setNewApptForm(prev => ({ ...prev, isUrgent: e.target.checked }))}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
                />
                <label htmlFor="urgentApptCheck" className="text-[11px] font-bold text-rose-600 cursor-pointer uppercase flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3 animate-pulse" />
                  <span>Marcar como URGENCIA INMEDIATA (Prioriza fila)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-pink-500/15 cursor-pointer transition-colors"
              >
                Confirmar y Registrar en Agenda
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REAGENDAR CITA MODAL */}
      {showRescheduleAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-reschedule">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Reagendar Consulta</h3>
              <button onClick={() => setShowRescheduleAppt(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRescheduleAppt} className="space-y-4">
              <div>
                <span className="text-[9px] font-bold uppercase text-slate-400">Paciente:</span>
                <p className="text-xs font-extrabold text-slate-800">{showRescheduleAppt.petName} ({showRescheduleAppt.petType}) • {showRescheduleAppt.ownerName}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nueva Fecha</label>
                <input
                  type="date"
                  required
                  value={showRescheduleAppt.date}
                  onChange={(e) => setShowRescheduleAppt({ ...showRescheduleAppt, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nueva Hora</label>
                <input
                  type="text"
                  required
                  value={showRescheduleAppt.time}
                  onChange={(e) => setShowRescheduleAppt({ ...showRescheduleAppt, time: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Guardar Reagendación
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ALERTA TRIAGE DE URGENCIAS MODAL */}
      {showEmergencyTriage && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-emergency">
          <div className="bg-white rounded-[32px] p-6 max-w-md w-full border border-rose-200 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-sm font-black text-rose-600 uppercase tracking-widest">Protocolo de Emergencia</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Línea Crítica del Hospital Zeebra</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              Cualquier paciente prioritario o en riesgo inmediato se prioriza en la parte superior de la agenda. Notifica inmediatamente al médico de turno mediante el chat interno.
            </p>

            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl space-y-1">
              <span className="text-[9px] font-black text-rose-500 uppercase">Número telefónico de emergencia:</span>
              <p className="text-sm font-extrabold text-rose-700 tracking-wide">{emergencyPhoneText}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  // Prepopulate urgent mock appt
                  setNewApptForm(prev => ({
                    ...prev,
                    petName: 'Rocky (Urgente)',
                    ownerName: 'Dueño Desconocido / Triage',
                    reason: 'Urgencia por Accidente o Crisis',
                    isUrgent: true
                  }));
                  setShowAddAppt(true);
                  setShowEmergencyTriage(false);
                }}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3 rounded-full cursor-pointer shadow-md shadow-rose-500/10"
              >
                Registrar Fila Urgente
              </button>
              <button
                onClick={() => setShowEmergencyTriage(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-full cursor-pointer border border-slate-250"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTRO RÁPIDO CRM CLIENTE MODAL */}
      {showAddClient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-add-client">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full border border-slate-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Alta de Cliente y Mascota (CRM)</h3>
              <button onClick={() => setShowAddClient(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              
              {/* Propietario Form */}
              <div className="space-y-2">
                <span className="text-[9.5px] font-black uppercase text-pink-600 block">Datos del Dueño</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Diana Prince"
                      value={newClientForm.ownerName}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, ownerName: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Celular / Tel</label>
                    <input
                      type="tel"
                      required
                      placeholder="444-555-1122"
                      value={newClientForm.phone}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="diana@justice.org"
                    value={newClientForm.email}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              {/* Mascota Form */}
              <div className="border-t border-slate-100 pt-3.5 space-y-3">
                <span className="text-[9.5px] font-black uppercase text-pink-600 block">Perfil de la Mascota</span>
                
                {/* Photo Selector */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Seleccionar Foto (Ficha Médica)</label>
                  <div className="flex space-x-2">
                    {PET_PHOTOS.map((pic, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPetPhoto(pic)}
                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedPetPhoto === pic ? 'border-pink-500 scale-105 shadow-inner' : 'border-transparent opacity-60'}`}
                      >
                        <img src={pic} alt="pet avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Nombre Mascota</label>
                    <input
                      type="text"
                      required
                      placeholder="Oliver"
                      value={newClientForm.petName}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, petName: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Especie</label>
                    <select
                      value={newClientForm.petType}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, petType: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    >
                      <option value="Perro">🐶 Perro</option>
                      <option value="Gato">🐱 Gato</option>
                      <option value="Ave">🦜 Ave</option>
                      <option value="Otro">🐰 Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Raza</label>
                    <input
                      type="text"
                      placeholder="Mestizo / Beagle"
                      value={newClientForm.petBreed}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, petBreed: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Edad Aproximada</label>
                    <input
                      type="text"
                      placeholder="10 meses / 4 años"
                      value={newClientForm.petAge}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, petAge: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Nota Médica o Alergias</label>
                  <input
                    type="text"
                    placeholder="Ninguna / Alergia al pollo"
                    value={newClientForm.medicalNote}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, medicalNote: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg cursor-pointer transition-colors"
              >
                Completar Registro & Guardar CRM
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REGISTRAR ENTRADA DE STOCK MODAL */}
      {showAddStock && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="modal-add-stock">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Entrada de Inventario</h3>
              <button onClick={() => setShowAddStock(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStockSubmit} className="space-y-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Producto Seleccionado</span>
                <p className="text-xs font-black text-slate-800">{showAddStock.name}</p>
                <p className="text-[10px] text-slate-400 mt-1">Stock Actual: {showAddStock.stock} {showAddStock.unit}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Cantidad a Añadir</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={addStockAmount}
                  onChange={(e) => setAddStockAmount(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Proveedor del Pedido</label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
                >
                  {supplierList.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Registrar Ingreso de Stock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORMULARIO DE COBRO FLOTANTE (BOTTOM SHEET) */}
      {showCheckoutSheet && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-40 flex items-end justify-center animate-fade-in" id="checkout-bottom-sheet">
          <div className="bg-white rounded-t-[36px] w-full max-w-lg border-t border-slate-100 shadow-2xl p-6 space-y-5 animate-slide-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Cobro de Transacción (Caja Central)</h3>
              </div>
              <button 
                onClick={() => setShowCheckoutSheet(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              
              {/* Summary Items in sheet */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[9px] font-black uppercase text-slate-400">Resumen del Cobro:</span>
                <div className="divide-y divide-slate-100 max-h-[120px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="py-1.5 flex justify-between text-xs">
                      <span className="text-slate-600 truncate max-w-[200px]">{item.name} <span className="text-slate-400 font-normal">x{item.qty}</span></span>
                      <span className="font-bold text-slate-700">${item.price * item.qty} MXN</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-slate-200 text-xs font-extrabold text-slate-800">
                  <span>Total Neto:</span>
                  <span className="text-pink-600 text-sm font-black">${cartTotal} MXN</span>
                </div>
              </div>

              {/* Client field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre del Cliente (Mostrador / CRM)</label>
                <input
                  type="text"
                  placeholder="Ej. Lucas Williams"
                  value={checkoutForm.clientName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, clientName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Método de Pago</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Efectivo', 'Tarjeta de Crédito', 'Transferencia'].map((method) => {
                    const isSel = checkoutForm.paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: method })}
                        className={`py-2 px-1.5 rounded-lg border text-[10.5px] font-bold transition-all cursor-pointer ${isSel ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                      >
                        {method === 'Tarjeta de Crédito' ? '💳 Tarjeta' : method === 'Efectivo' ? '💵 Efectivo' : '🏦 Transf.'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Facturacion Electronica (CFDI) */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cfdiInvoiceCheck"
                    checked={checkoutForm.requiresInvoice}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, requiresInvoice: e.target.checked })}
                    className="rounded border-slate-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
                  />
                  <label htmlFor="cfdiInvoiceCheck" className="text-[10.5px] font-bold text-slate-600 cursor-pointer uppercase">
                    Solicitar Factura Electrónica (CFDI México)
                  </label>
                </div>

                {checkoutForm.requiresInvoice && (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-150 animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">RFC del Cliente</label>
                      <input
                        type="text"
                        required={checkoutForm.requiresInvoice}
                        placeholder="XAXX010101000"
                        value={checkoutForm.rfc}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, rfc: e.target.value.toUpperCase() })}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Correo de Facturación</label>
                      <input
                        type="email"
                        required={checkoutForm.requiresInvoice}
                        placeholder="factura@cliente.com"
                        value={checkoutForm.taxEmail}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, taxEmail: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-emerald-500/15 flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
              >
                <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                <span>Liquidar Venta y Emitir Comprobante</span>
              </button>

            </form>
          </div>
        </div>
      )}

      {/* RECEIPT / COMPROBANTE VIEWER LIGHTBOX */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xs z-50 flex items-center justify-center p-4 animate-fade-in" id="receipt-viewer">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full border border-slate-150 shadow-2xl space-y-4">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider">Recibo Digital Emitido</span>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Simulated Receipt Look */}
            <div className="bg-slate-50 rounded-2xl p-4 font-mono text-[10.5px] text-slate-600 space-y-3.5 border border-dashed border-slate-300">
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800 tracking-tight uppercase">zeebra Hospital Veterinario</h4>
                <p className="text-[9px] text-slate-400">RFC: ZBR2510303A0 • San Luis Potosí</p>
                <p className="text-[9px] text-slate-400">Tel: (444) 837-2832</p>
              </div>

              <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1">
                <p><strong>FOLIO:</strong> {selectedReceipt.ticketNumber}</p>
                <p><strong>FECHA:</strong> {selectedReceipt.date}</p>
                <p><strong>CLIENTE:</strong> {selectedReceipt.clientName}</p>
                <p><strong>PAGO:</strong> {selectedReceipt.paymentMethod}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>DESCRIPCION</span>
                  <span>TOTAL</span>
                </div>
                {selectedReceipt.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-slate-500">
                    <span className="truncate max-w-[150px]">{item.name} x{item.qty}</span>
                    <span>${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-slate-300 pt-2 flex justify-between font-extrabold text-slate-800 text-xs">
                <span>TOTAL MXN:</span>
                <span>${selectedReceipt.total}</span>
              </div>

              {selectedReceipt.requiresInvoice && (
                <div className="bg-emerald-50 border border-emerald-100 rounded p-2 text-[9px] text-emerald-800 text-center leading-normal">
                  📄 <strong>Factura CFDI Solicitada con Éxito</strong><br />
                  Se enviará el XML/PDF al RFC {selectedReceipt.rfc} mediante el correo {selectedReceipt.taxEmail}.
                </div>
              )}

              <p className="text-center text-[9px] text-slate-400 pt-1.5 italic">¡Gracias por confiar en zeebra!</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => {
                  alert('Comprobante enviado exitosamente por correo electrónico y cargado en el sistema.');
                  setSelectedReceipt(null);
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-[11px] py-2.5 rounded-full flex items-center justify-center space-x-1 cursor-pointer transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Enviar Email</span>
              </button>
              <button 
                onClick={() => {
                  alert('Simulación de impresión completada. Impresora Térmica POS Activa.');
                  setSelectedReceipt(null);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] py-2.5 rounded-full flex items-center justify-center space-x-1 cursor-pointer border border-slate-250 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Imprimir Ticket</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
