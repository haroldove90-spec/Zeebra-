import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  UserCheck, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Shield, 
  Clock, 
  Database, 
  RefreshCw, 
  FileText, 
  AlertCircle, 
  Filter, 
  BarChart3, 
  PieChart, 
  Download, 
  UserPlus, 
  Percent, 
  Briefcase 
} from 'lucide-react';
import SharedHeader from './SharedHeader';

interface AdminWorkspaceProps {
  onExitRole: () => void;
  userName: string;
  userLocation: string;
}

export default function AdminWorkspace({ onExitRole, userName, userLocation }: AdminWorkspaceProps) {
  // Tabs: 'reports' | 'users' | 'business' | 'backups'
  const [activeTab, setActiveTab] = React.useState<'reports' | 'users' | 'business' | 'backups'>('reports');
  
  // Search query inside Admin Console
  const [searchQuery, setSearchQuery] = React.useState('');

  // 1. STATS & REPORTS STATES
  const [financialPeriod, setFinancialPeriod] = React.useState<'day' | 'week' | 'month'>('month');
  const [selectedRevenueType, setSelectedRevenueType] = React.useState<'all' | 'product' | 'service'>('all');

  // Revenue mock database
  const revenueData = {
    day: {
      total: 14500,
      change: '+8.2%',
      breakdown: [
        { name: 'Consultas Médicas', value: 4800, type: 'service' },
        { name: 'Vacunación Séxtuple', value: 3200, type: 'service' },
        { name: 'Alimento Premium Royal Canin', value: 2500, type: 'product' },
        { name: 'Antiparasitario NexGard', value: 1800, type: 'product' },
        { name: 'Cirugía de Tejidos Blandos', value: 2200, type: 'service' }
      ],
      chart: [
        { label: '08:00', val: 1200 },
        { label: '10:00', val: 3400 },
        { label: '12:00', val: 4500 },
        { label: '14:00', val: 1800 },
        { label: '16:00', val: 2600 },
        { label: '18:00', val: 1000 }
      ]
    },
    week: {
      total: 98400,
      change: '+12.4%',
      breakdown: [
        { name: 'Consultas Médicas', value: 28400, type: 'service' },
        { name: 'Vacunación y Biológicos', value: 18600, type: 'service' },
        { name: 'Medicamentos & Farmacia', value: 21500, type: 'product' },
        { name: 'Alimentos y Accesorios', value: 14900, type: 'product' },
        { name: 'Cirugías & Anestesia', value: 15000, type: 'service' }
      ],
      chart: [
        { label: 'Lun', val: 12500 },
        { label: 'Mar', val: 15400 },
        { label: 'Mié', val: 14200 },
        { label: 'Jue', val: 18100 },
        { label: 'Vie', val: 19800 },
        { label: 'Sáb', val: 18400 }
      ]
    },
    month: {
      total: 412600,
      change: '+15.8%',
      breakdown: [
        { name: 'Consultas Médicas', value: 112000, type: 'service' },
        { name: 'Cirugías Especializadas', value: 94000, type: 'service' },
        { name: 'Farmacia Veterinaria', value: 87500, type: 'product' },
        { name: 'Vacunas y Refuerzos', value: 64600, type: 'service' },
        { name: 'Nutrición Clínica y Sacos', value: 54500, type: 'product' }
      ],
      chart: [
        { label: 'Semana 1', val: 92000 },
        { label: 'Semana 2', val: 104000 },
        { label: 'Semana 3', val: 98000 },
        { label: 'Semana 4', val: 118600 }
      ]
    }
  };

  // Vet performance database
  const [vetsData, setVetsData] = React.useState([
    { id: 'vet1', name: 'Dr. Roberto Díaz', specialty: 'Cirugía', appointments: 124, cancellations: 4, effectiveness: 96.7, rating: 5.0, status: 'Activo' },
    { id: 'vet2', name: 'Dra. Amanda Vargas', specialty: 'Cardiología', appointments: 142, cancellations: 6, effectiveness: 95.9, rating: 4.9, status: 'Activo' },
    { id: 'vet3', name: 'Dr. Kenji Sato', specialty: 'Neurología', appointments: 98, cancellations: 11, effectiveness: 89.9, rating: 4.7, status: 'Activo' }
  ]);

  // Demographic / Pathological reports
  const patientDemographics = {
    species: [
      { name: 'Caninos (Perros)', count: 342, pct: 58, icon: '🐶', color: 'bg-cyan-500' },
      { name: 'Felinos (Gatos)', count: 186, pct: 31, icon: '🐱', color: 'bg-pink-500' },
      { name: 'Aves de Ornato', count: 35, pct: 6, icon: '🦜', color: 'bg-amber-500' },
      { name: 'Exóticos y Otros', count: 28, pct: 5, icon: '🐹', color: 'bg-indigo-500' }
    ],
    breeds: [
      { name: 'Golden Retriever', count: 86, species: 'Canino' },
      { name: 'Siamés', count: 64, species: 'Felino' },
      { name: 'Bulldog Francés', count: 52, species: 'Canino' },
      { name: 'Pug Carlino', count: 41, species: 'Canino' },
      { name: 'Persa', count: 38, species: 'Felino' }
    ],
    diseases: [
      { name: 'Gastroenteritis Infecciosa', cases: 78, threat: 'Moderado', trend: 'Estable' },
      { name: 'Rinotraqueitis Viral Felina', cases: 54, threat: 'Bajo', trend: 'Alza 📈' },
      { name: 'Dermatitis Atópica (Alergias)', cases: 46, threat: 'Bajo', trend: 'Estable' },
      { name: 'Otitis Externa bacteriana', cases: 39, threat: 'Bajo', trend: 'Baja 📉' },
      { name: 'Parvovirus Canino', cases: 14, threat: 'Alto ⚠️', trend: 'Estable' }
    ]
  };

  // 2. USER MANAGEMENT & PERMISSIONS STATES
  const [users, setUsers] = React.useState([
    { id: 'usr-1', name: 'Dr. Roberto Díaz', email: 'roberto.diaz@vetcare.com', role: 'veterinarian', status: 'Activo', phone: '55-1234-5678', accessModules: ['medicine', 'consult', 'patients', 'history'] },
    { id: 'usr-2', name: 'Dra. Amanda Vargas', email: 'amanda.vargas@vetcare.com', role: 'veterinarian', status: 'Activo', phone: '55-8765-4321', accessModules: ['medicine', 'consult', 'patients', 'history'] },
    { id: 'usr-3', name: 'Dr. Kenji Sato', email: 'kenji.sato@vetcare.com', role: 'veterinarian', status: 'Activo', phone: '55-9988-7766', accessModules: ['medicine', 'consult', 'patients', 'history'] },
    { id: 'usr-4', name: 'Laura Pérez', email: 'laura.perez@vetcare.com', role: 'receptionist', status: 'Activo', phone: '55-2233-4455', accessModules: ['appointment', 'patients', 'customer_service'] },
    { id: 'usr-5', name: 'Raúl Mendoza', email: 'raul.mendoza@vetcare.com', role: 'receptionist', status: 'Suspendido', phone: '55-6677-8899', accessModules: ['appointment', 'patients', 'customer_service'] }
  ]);

  // Modal / Input fields for creating a user
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);
  const [newUserName, setNewUserName] = React.useState('');
  const [newUserEmail, setNewUserEmail] = React.useState('');
  const [newUserPhone, setNewUserPhone] = React.useState('');
  const [newUserRole, setNewUserRole] = React.useState<'veterinarian' | 'receptionist'>('veterinarian');
  
  // Selected user for editing permissions
  const [selectedPermissionUser, setSelectedPermissionUser] = React.useState<string | null>(null);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Por favor rellena los campos mínimos (Nombre y Correo)");
      return;
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '55-0000-0000',
      role: newUserRole,
      status: 'Activo',
      accessModules: newUserRole === 'veterinarian' 
        ? ['medicine', 'consult', 'patients', 'history'] 
        : ['appointment', 'patients', 'customer_service']
    };
    setUsers(prev => [...prev, newUser]);
    // If veterinarian, add to vets table too!
    if (newUserRole === 'veterinarian') {
      setVetsData(prev => [
        ...prev,
        { id: newUser.id, name: newUser.name, specialty: 'General', appointments: 0, cancellations: 0, effectiveness: 100, rating: 5.0, status: 'Activo' }
      ]);
    }
    // Reset fields
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setShowAddUserModal(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Activo' ? 'Suspendido' : 'Activo';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    // Also toggle in vetsData if they are a vet
    setVetsData(prev => prev.map(v => {
      if (v.id === userId) {
        return { ...v, status: v.status === 'Activo' ? 'Suspendido' : 'Activo' };
      }
      return v;
    }));
  };

  const handleToggleModulePermission = (userId: string, module: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const hasModule = u.accessModules.includes(module);
        const nextModules = hasModule 
          ? u.accessModules.filter(m => m !== module)
          : [...u.accessModules, module];
        return { ...u, accessModules: nextModules };
      }
      return u;
    }));
  };

  // 3. MASTER CLINIC CONFIGURATION STATES
  const [openingHours, setOpeningHours] = React.useState({
    weekdays: { start: '08:00', end: '20:00', active: true },
    saturday: { start: '09:00', end: '17:00', active: true },
    sunday: { start: '10:00', end: '14:00', active: false }
  });

  const [mexicoTaxIva, setMexicoTaxIva] = React.useState(16); // standard 16% in Mexico

  const [catalogItems, setCatalogItems] = React.useState([
    { id: 'cat-1', name: 'Consulta Médica de Rutina', price: 450, type: 'service' },
    { id: 'cat-2', name: 'Vacunación Triple Felina', price: 650, type: 'service' },
    { id: 'cat-3', name: 'Vacuna Antirrábica', price: 300, type: 'service' },
    { id: 'cat-4', name: 'Cirugía de Esterilización (Canino)', price: 1800, type: 'service' },
    { id: 'cat-5', name: 'Limpieza Dental por Ultrasonido', price: 1200, type: 'service' },
    { id: 'cat-6', name: 'Antiparasitario NexGard Chew', price: 420, type: 'product' },
    { id: 'cat-7', name: 'Saco Alimento Prescripción Urinaria 3kg', price: 950, type: 'product' }
  ]);

  const [newCatalogName, setNewCatalogName] = React.useState('');
  const [newCatalogPrice, setNewCatalogPrice] = React.useState('');
  const [newCatalogType, setNewCatalogType] = React.useState<'product' | 'service'>('service');

  const handleAddCatalogItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatalogName.trim() || !newCatalogPrice) return;
    const newItem = {
      id: `cat-${Date.now()}`,
      name: newCatalogName,
      price: parseFloat(newCatalogPrice),
      type: newCatalogType
    };
    setCatalogItems(prev => [...prev, newItem]);
    setNewCatalogName('');
    setNewCatalogPrice('');
  };

  const handleRemoveCatalogItem = (id: string) => {
    setCatalogItems(prev => prev.filter(item => item.id !== id));
  };

  // 4. BACKUPS & DATA SYNC STATES
  const [backups, setBackups] = React.useState([
    { id: 'bak-1', date: '2026-07-05 08:00 AM', size: '14.8 MB', type: 'Automático', status: 'Completado' },
    { id: 'bak-2', date: '2026-07-04 08:00 AM', size: '14.6 MB', type: 'Automático', status: 'Completado' },
    { id: 'bak-3', date: '2026-07-03 08:00 AM', size: '14.5 MB', type: 'Automático', status: 'Completado' },
    { id: 'bak-4', date: '2026-07-02 05:20 PM', size: '14.4 MB', type: 'Manual', status: 'Completado' }
  ]);
  const [isCreatingBackup, setIsCreatingBackup] = React.useState(false);

  const triggerManualBackup = () => {
    setIsCreatingBackup(true);
    setTimeout(() => {
      const newBackup = {
        id: `bak-${Date.now()}`,
        date: new Date().toLocaleString('es-MX', { hour12: true }),
        size: `${(14.8 + Math.random() * 0.2).toFixed(1)} MB`,
        type: 'Manual',
        status: 'Completado'
      };
      setBackups(prev => [newBackup, ...prev]);
      setIsCreatingBackup(false);
      alert('¡Copia de seguridad del sistema clínico creada y cifrada con éxito en servidores secundarios redundantes!');
    }, 1500);
  };

  // Dynamic values calculation for selected financial period
  const activeFinancial = revenueData[financialPeriod];
  const filteredBreakdown = activeFinancial.breakdown.filter(item => {
    if (selectedRevenueType === 'all') return true;
    return item.type === selectedRevenueType;
  });

  // Filtered users for user tab
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans min-h-screen pb-24 md:pb-12" id="admin-workspace-container">
      
      {/* UNIFIED SHARED HEADER */}
      <SharedHeader 
        userName={userName}
        userLocation={userLocation}
        currentRole="admin"
        onExitRole={onExitRole}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ADMIN LEVEL SUB-NAV TABS - Bottom Nav Bar on Mobile/Tablet */}
      <div 
        className="bg-white border-t border-slate-200 md:border-t-0 md:border-b md:border-slate-200 fixed bottom-0 left-0 right-0 md:sticky md:top-0 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:shadow-3xs" 
        id="admin-sub-tabs"
      >
        <div className="max-w-4xl mx-auto px-4 flex justify-around md:justify-start md:space-x-1.5 py-1.5 md:py-2.5">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 md:flex-initial py-1 md:px-4 md:py-2 rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-1.5 ${
              activeTab === 'reports' ? 'bg-amber-500 text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />
            <span className="text-[8.5px] md:text-xs font-bold">Reportes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 md:flex-initial py-1 md:px-4 md:py-2 rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-1.5 ${
              activeTab === 'users' ? 'bg-amber-500 text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Users className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />
            <span className="text-[8.5px] md:text-xs font-bold">Personal</span>
          </button>

          <button
            onClick={() => setActiveTab('business')}
            className={`flex-1 md:flex-initial py-1 md:px-4 md:py-2 rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-1.5 ${
              activeTab === 'business' ? 'bg-amber-500 text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Settings className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />
            <span className="text-[8.5px] md:text-xs font-bold">Ajustes</span>
          </button>

          <button
            onClick={() => setActiveTab('backups')}
            className={`flex-1 md:flex-initial py-1 md:px-4 md:py-2 rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-1.5 ${
              activeTab === 'backups' ? 'bg-amber-500 text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Database className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" />
            <span className="text-[8.5px] md:text-xs font-bold">Respaldos</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4 pb-20 md:pb-6 flex-1 space-y-6">

        {/* TAB 1: REPORTS AND STATS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fade-in" id="panel-reports-stats">
            
            {/* 1.1 REVENUE BLOCK WITH DYNAMIC FILTERS */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span>Control de Ingresos Financieros</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Analiza el rendimiento monetario global y desglose tributario</p>
                </div>

                {/* Day, Week, Month Filters */}
                <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                  {(['day', 'week', 'month'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setFinancialPeriod(period)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer capitalize ${
                        financialPeriod === period ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {period === 'day' ? 'Hoy' : period === 'week' ? 'Semana' : 'Mes'}
                    </button>
                  ))}
                </div>
              </div>

              {/* STATS HERO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Net Revenue */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Ingreso Neto (Sin IVA)</span>
                  <div className="mt-2">
                    <p className="text-xl sm:text-2xl font-black font-mono">
                      ${(activeFinancial.total / (1 + mexicoTaxIva/100)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 inline" />
                      <span>{activeFinancial.change} vs anterior</span>
                    </p>
                  </div>
                </div>

                {/* Tax Breakdown (Mexico IVA) */}
                <div className="bg-emerald-50 border border-emerald-100 text-slate-800 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-[9px] text-emerald-700 font-extrabold uppercase tracking-wider">Impuestos Gravados (IVA {mexicoTaxIva}%)</span>
                  <div className="mt-2">
                    <p className="text-xl sm:text-2xl font-black font-mono text-emerald-800">
                      ${(activeFinancial.total * (mexicoTaxIva / 100) / (1 + mexicoTaxIva/100)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                    </p>
                    <p className="text-[9px] text-emerald-600 mt-1">Sujeto a facturación SAT México</p>
                  </div>
                </div>

                {/* Total Gross Revenue */}
                <div className="bg-cyan-50 border border-cyan-100 text-slate-800 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-[9px] text-cyan-700 font-extrabold uppercase tracking-wider">Ingreso Bruto Facturado</span>
                  <div className="mt-2">
                    <p className="text-xl sm:text-2xl font-black font-mono text-cyan-800">
                      ${activeFinancial.total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                    </p>
                    <p className="text-[9px] text-cyan-600 mt-1">Total acumulado de caja</p>
                  </div>
                </div>
              </div>

              {/* CHART VISUALIZER (PURE SVG ADVANCED BAR CHART) */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4">Comportamiento del Flujo de Caja</p>
                <div className="h-40 w-full flex items-end justify-between gap-1.5 pt-6 pb-2 px-2 border-b border-slate-200">
                  {activeFinancial.chart.map((pt, i) => {
                    // Calculate relative height compared to max value in current set
                    const maxVal = Math.max(...activeFinancial.chart.map(p => p.val));
                    const heightPct = maxVal > 0 ? (pt.val / maxVal) * 85 : 0;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-7 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-mono shadow-md z-10 transition-transform duration-150 pointer-events-none whitespace-nowrap">
                          ${pt.val.toLocaleString()}
                        </div>
                        {/* Bar */}
                        <div 
                          className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-md transition-all duration-500 group-hover:shadow-xs cursor-pointer"
                          style={{ height: `${Math.max(heightPct, 8)}%` }}
                        />
                        {/* Label */}
                        <span className="text-[8px] font-extrabold text-slate-400 mt-2 font-mono">{pt.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRODUCTS AND SERVICES BREAKDOWN WITH FILTER BUTTONS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Desglose por Concepto de Venta</h4>
                  
                  {/* Category Filter buttons */}
                  <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-lg">
                    {(['all', 'service', 'product'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedRevenueType(type)}
                        className={`px-2 py-0.5 text-[8.5px] font-bold rounded transition-all cursor-pointer ${
                          selectedRevenueType === type ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        {type === 'all' ? 'Todos' : type === 'service' ? 'Servicios' : 'Productos'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {filteredBreakdown.map((item, index) => {
                    const pctOfTotal = ((item.value / activeFinancial.total) * 100).toFixed(1);
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-700">
                          <span className="font-semibold flex items-center space-x-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'service' ? 'bg-cyan-500' : 'bg-pink-500'}`} />
                            <span>{item.name}</span>
                          </span>
                          <span className="font-mono font-bold">${item.value.toLocaleString()} <span className="text-slate-400 font-normal">({pctOfTotal}%)</span></span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${item.type === 'service' ? 'bg-cyan-500' : 'bg-pink-500'}`} 
                            style={{ width: `${pctOfTotal}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 1.2 VETERINARIANS PERFORMANCE MODULE */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-indigo-600" />
                  <span>Rendimiento y Efectividad de Veterinarios</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Auditoría clínica de guardia, consultas atendidas y cancelaciones</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 uppercase tracking-wider text-[8.5px] font-extrabold">
                      <th className="py-2 pr-2">Veterinario</th>
                      <th className="py-2 px-2 text-center">Especialidad</th>
                      <th className="py-2 px-2 text-center">Consultas</th>
                      <th className="py-2 px-2 text-center">Canceladas</th>
                      <th className="py-2 px-2 text-center">Efectividad</th>
                      <th className="py-2 pl-2 text-right">Satisfacción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vetsData.map((v) => (
                      <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 pr-2 font-bold text-slate-800 flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${v.status === 'Activo' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          <span>{v.name}</span>
                        </td>
                        <td className="py-3 px-2 text-center text-slate-500">{v.specialty}</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700 font-mono">{v.appointments}</td>
                        <td className="py-3 px-2 text-center text-rose-500 font-mono">{v.cancellations}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${
                            v.effectiveness >= 95 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {v.effectiveness}%
                          </span>
                        </td>
                        <td className="py-3 pl-2 text-right text-amber-500 font-bold font-mono">
                          ★ {v.rating.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.3 DEMOGRAPHICS & PATIENTS PATHOLOGIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Patient Species Demographics */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800 flex items-center space-x-1.5">
                    <span className="w-1.5 h-3.5 bg-cyan-500 rounded-full" />
                    <span>Demografía de Pacientes (Por Especie)</span>
                  </h4>
                  <p className="text-[9.5px] text-slate-500 mt-0.5">Especies registradas y razas más comunes</p>
                </div>

                <div className="space-y-3 pt-1">
                  {patientDemographics.species.map((sp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-700 items-center">
                        <span className="font-semibold flex items-center space-x-2">
                          <span className="text-sm">{sp.icon}</span>
                          <span>{sp.name}</span>
                        </span>
                        <span className="font-mono font-bold text-slate-600">
                          {sp.count} masc. <span className="text-slate-400">({sp.pct}%)</span>
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${sp.color}`} style={{ width: `${sp.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Top Razas Atendidas</span>
                  <div className="flex flex-wrap gap-1.5">
                    {patientDemographics.breeds.map((b, i) => (
                      <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        {b.name} ({b.species}): <strong className="text-slate-800 font-mono">{b.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pathological Reports (Common Diseases) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800 flex items-center space-x-1.5">
                    <span className="w-1.5 h-3.5 bg-rose-500 rounded-full" />
                    <span>Reporte Patológico (Enfermedades Comunes)</span>
                  </h4>
                  <p className="text-[9.5px] text-slate-500 mt-0.5">Epidemiología clínica y recurrencia de diagnósticos</p>
                </div>

                <div className="space-y-2 pt-1">
                  {patientDemographics.diseases.map((d, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                      <div className="text-left">
                        <h5 className="text-[11px] font-extrabold text-slate-800">{d.name}</h5>
                        <p className="text-[9px] text-slate-400 mt-0.5">Gravedad: <span className="font-bold text-slate-600">{d.threat}</span></p>
                      </div>
                      <div className="text-right flex items-center space-x-3">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-700">{d.cases}</span>
                          <span className="text-[8.5px] block text-slate-400 font-bold uppercase leading-none mt-0.5">Casos</span>
                        </div>
                        <span className="text-[9.5px] font-bold bg-white px-2 py-0.5 rounded-md shadow-3xs border border-slate-100 text-slate-600">{d.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STAFF & USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fade-in" id="panel-users-control">
            
            {/* Header with action */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-amber-500" />
                    <span>Control de Cuentas de Personal</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Crea, edita, suspende personal y gestiona accesos por perfil</p>
                </div>

                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Dar de Alta Cuenta</span>
                </button>
              </div>

              {/* LIST / TABLE OF USERS */}
              <div className="space-y-3">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Ningún usuario clínico coincide con la búsqueda
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <div 
                      key={u.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        u.status === 'Suspendido' ? 'bg-slate-50/50 border-slate-200 opacity-80' : 'bg-white border-slate-150 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center space-x-3 text-left">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-xs ${
                            u.role === 'veterinarian' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-pink-50 border-pink-100 text-pink-600'
                          }`}>
                            {u.role === 'veterinarian' ? 'VET' : 'REC'}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-[12px] font-black text-slate-800">{u.name}</h4>
                              <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.2 rounded border ${
                                u.status === 'Activo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                              }`}>
                                {u.status}
                              </span>
                            </div>
                            <p className="text-[9.5px] text-slate-400 mt-0.5 font-mono">{u.email} • {u.phone}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                          <button
                            onClick={() => setSelectedPermissionUser(selectedPermissionUser === u.id ? null : u.id)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                          >
                            Permisos {selectedPermissionUser === u.id ? '▲' : '▼'}
                          </button>
                          
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg cursor-pointer transition-colors ${
                              u.status === 'Activo' 
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100/60' 
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100/60'
                            }`}
                          >
                            {u.status === 'Activo' ? 'Suspender' : 'Reactivar'}
                          </button>
                        </div>
                      </div>

                      {/* PERMISSIONS MATRIX DROPDOWN */}
                      {selectedPermissionUser === u.id && (
                        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3 text-left animate-slide-down">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Matriz de Permisos del Módulo</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'appointment', label: 'Coordinar Citas' },
                              { id: 'medicine', label: 'Escribir Recetas' },
                              { id: 'consult', label: 'Acceso IA Consultor' },
                              { id: 'patients', label: 'Ver Pacientes Hoy' },
                              { id: 'customer_service', label: 'Atención Clientes' },
                              { id: 'history', label: 'Consultar Historial' }
                            ].map((mod) => {
                              const isAllowed = u.accessModules.includes(mod.id);
                              return (
                                <label 
                                  key={mod.id} 
                                  className={`flex items-center space-x-2 p-2 rounded-xl border text-[10px] font-bold cursor-pointer transition-all ${
                                    isAllowed 
                                      ? 'bg-amber-50/40 border-amber-300 text-amber-800' 
                                      : 'bg-white border-slate-150 text-slate-400'
                                  }`}
                                >
                                  <input 
                                    type="checkbox" 
                                    checked={isAllowed}
                                    onChange={() => handleToggleModulePermission(u.id, mod.id)}
                                    className="accent-amber-500 h-3 w-3"
                                  />
                                  <span>{mod.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ADD USER MODAL */}
            {showAddUserModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <form 
                  onSubmit={handleAddUser}
                  className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 animate-scale-up text-left"
                >
                  <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <UserPlus className="h-4 w-4 text-amber-500" />
                    <span>Registrar Nuevo Personal</span>
                  </h3>

                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Ej. Dr. Andrés Montes"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Ej. andres.montes@vetcare.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Teléfono Celular</label>
                      <input 
                        type="text" 
                        value={newUserPhone}
                        onChange={(e) => setNewUserPhone(e.target.value)}
                        placeholder="Ej. 55-9876-5432"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Rol de Cargo</label>
                      <select 
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-400"
                      >
                        <option value="veterinarian">Veterinario Clínico</option>
                        <option value="receptionist">Recepcionista</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-full cursor-pointer transition-colors text-center"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-full cursor-pointer transition-colors text-center"
                    >
                      Guardar Personal
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: BUSINESS CONFIGURATION */}
        {activeTab === 'business' && (
          <div className="space-y-6 animate-fade-in" id="panel-business-config">
            
            {/* 3.1 OPENING HOURS CONFIG */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Horarios de Atención y Disponibilidad</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Controla la agenda y bloqueos de citas por día del negocio</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {/* Weekdays */}
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">Lunes a Viernes</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center space-x-1 font-mono text-xs">
                    <input 
                      type="time" 
                      value={openingHours.weekdays.start} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, weekdays: { ...prev.weekdays, start: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                    <span className="text-slate-400">a</span>
                    <input 
                      type="time" 
                      value={openingHours.weekdays.end} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, weekdays: { ...prev.weekdays, end: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                  </div>
                </div>

                {/* Saturday */}
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">Sábados</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center space-x-1 font-mono text-xs">
                    <input 
                      type="time" 
                      value={openingHours.saturday.start} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, saturday: { ...prev.saturday, start: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                    <span className="text-slate-400">a</span>
                    <input 
                      type="time" 
                      value={openingHours.saturday.end} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, saturday: { ...prev.saturday, end: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                  </div>
                </div>

                {/* Sunday */}
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">Domingos</span>
                    <button 
                      type="button"
                      onClick={() => setOpeningHours(prev => ({ ...prev, sunday: { ...prev.sunday, active: !prev.sunday.active } }))}
                      className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        openingHours.sunday.active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-500 border-rose-200'
                      }`}
                    >
                      {openingHours.sunday.active ? 'Cerrar' : 'Abrir'}
                    </button>
                  </div>
                  <div className={`flex items-center space-x-1 font-mono text-xs transition-opacity ${openingHours.sunday.active ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                    <input 
                      type="time" 
                      value={openingHours.sunday.start} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, sunday: { ...prev.sunday, start: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                    <span className="text-slate-400">a</span>
                    <input 
                      type="time" 
                      value={openingHours.sunday.end} 
                      onChange={(e) => setOpeningHours(prev => ({ ...prev, sunday: { ...prev.sunday, end: e.target.value } }))}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 PRICES CATALOGUE & SERVICES WITH MEXICO IVA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <span>Catálogo de Precios Base y Servicios</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Define las tarifas de cobro predeterminadas en el consultorio</p>
                </div>

                {/* Mexico IVA Impuestos config */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Impuesto IVA:</span>
                  <div className="flex items-center space-x-1 font-mono text-xs text-slate-800">
                    <input 
                      type="number" 
                      value={mexicoTaxIva} 
                      onChange={(e) => setMexicoTaxIva(parseFloat(e.target.value) || 0)}
                      className="w-10 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center font-bold"
                    />
                    <span className="font-bold">%</span>
                  </div>
                  <span className="text-[8px] bg-slate-200 text-slate-600 px-1 py-0.2 rounded font-extrabold">México</span>
                </div>
              </div>

              {/* Dynamic catalogue list with delete/add action */}
              <div className="space-y-3">
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1" id="catalogue-items-list">
                  {catalogItems.map((item) => {
                    const priceWithTax = item.price * (1 + mexicoTaxIva / 100);
                    return (
                      <div key={item.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/25 flex justify-between items-center text-left hover:bg-slate-50 transition-colors">
                        <div>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded mr-2 ${
                            item.type === 'service' ? 'bg-cyan-50 text-cyan-600 border border-cyan-150' : 'bg-pink-50 text-pink-600 border border-pink-150'
                          }`}>
                            {item.type === 'service' ? 'Servicio' : 'Producto'}
                          </span>
                          <span className="text-[11.5px] font-extrabold text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[11px] font-mono font-bold text-slate-800">${item.price.toFixed(2)} Base</span>
                            <span className="text-[9px] block text-emerald-600 font-mono font-bold leading-none mt-0.5">
                              ${priceWithTax.toFixed(2)} c/IVA
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveCatalogItem(item.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Eliminar del catálogo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Inline form to add item to catalogue */}
                <form onSubmit={handleAddCatalogItem} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-3 border-t border-slate-100 text-left">
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Concepto</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ej. Ecografía Abdominal"
                      value={newCatalogName}
                      onChange={(e) => setNewCatalogName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Precio Base (MXN)</label>
                    <input 
                      type="number"
                      required
                      placeholder="450"
                      value={newCatalogPrice}
                      onChange={(e) => setNewCatalogPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs outline-none font-mono focus:border-amber-400"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider">Tipo</label>
                    <select
                      value={newCatalogType}
                      onChange={(e) => setNewCatalogType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs outline-none focus:border-amber-400"
                    >
                      <option value="service">Servicio</option>
                      <option value="product">Producto</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Añadir
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: DATABASE BACKUPS MONITOR */}
        {activeTab === 'backups' && (
          <div className="space-y-6 animate-fade-in" id="panel-backups-sync">
            
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-sm space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                    <Database className="h-4 w-4 text-emerald-600" />
                    <span>Copias de Seguridad de Base de Datos</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Supervisa y descarga los respaldos automáticos en la nube</p>
                </div>

                <button
                  onClick={triggerManualBackup}
                  disabled={isCreatingBackup}
                  className="bg-slate-950 hover:bg-slate-850 disabled:opacity-50 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isCreatingBackup ? 'animate-spin' : ''}`} />
                  <span>{isCreatingBackup ? 'Creando Backup...' : 'Crear Backup Manual'}</span>
                </button>
              </div>

              {/* CLOUD DB TELEMETRY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10.5px] font-extrabold text-emerald-800 uppercase tracking-wider">Servicio de Backup Automático: ACTIVO</span>
                  </div>
                  <p className="text-[10px] text-emerald-700/80 mt-1 leading-relaxed">
                    Copias automatizadas configuradas cada 24 horas (08:00 AM CST) guardadas en Google Cloud Storage cifrado.
                  </p>
                </div>

                <div className="p-3.5 bg-cyan-50 border border-cyan-100 rounded-xl">
                  <span className="text-[10.5px] font-extrabold text-cyan-800 uppercase tracking-wider block">Integridad de la Base de Datos</span>
                  <div className="flex items-center space-x-2 mt-1.5">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    <span className="text-[10px] text-cyan-800/90 font-bold">100% Sincronizado, Cero Errores Clínicos detectados.</span>
                  </div>
                </div>
              </div>

              {/* LIST OF BACKUPS */}
              <div className="space-y-3">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Historial de Respaldos Recientes</span>
                <div className="space-y-2">
                  {backups.map((b) => (
                    <div key={b.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-3">
                        <Database className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="font-mono font-bold text-slate-800">{b.date}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">Tipo: <span className="font-bold text-slate-600">{b.type}</span> • Tamaño: <span className="font-mono text-slate-600">{b.size}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                          {b.status}
                        </span>
                        <button
                          onClick={() => alert(`Simulación: Descargando archivo comprimido de base de datos SQL / Firestore (${b.size})...`)}
                          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                          title="Descargar Respaldo"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
