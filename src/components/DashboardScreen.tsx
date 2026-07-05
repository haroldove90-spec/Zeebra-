import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  CalendarCheck, 
  Pill, 
  Stethoscope, 
  ClipboardList, 
  MessageSquareCode, 
  UserCheck, 
  PhoneCall, 
  Building2, 
  ChevronDown,
  User,
  Sparkles,
  Lock,
  Shield,
  Heart,
  Activity,
  AlertCircle,
  Clock,
  Plus,
  Trash2,
  Download,
  Send,
  Printer,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PlusCircle,
  Calendar
} from 'lucide-react';
import { MenuItem, UserRole } from '../types';
import { MENU_ITEMS } from '../data';
import VeterinaryWorkspace from './VeterinaryWorkspace';
import ReceptionistWorkspace from './ReceptionistWorkspace';
import ClientWorkspace from './ClientWorkspace';
import AdminWorkspace from './AdminWorkspace';
import SharedHeader from './SharedHeader';

// Component to dynamically render lucide icons based on string names
export const MenuItemIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'CalendarCheck': return <CalendarCheck className={className} id="icon-calendar-check" />;
    case 'Pill': return <Pill className={className} id="icon-pill" />;
    case 'Stethoscope': return <Stethoscope className={className} id="icon-stethoscope" />;
    case 'ClipboardList': return <ClipboardList className={className} id="icon-clipboard-list" />;
    case 'MessageSquareCode': return <MessageSquareCode className={className} id="icon-message" />;
    case 'UserCheck': return <UserCheck className={className} id="icon-user-check" />;
    case 'PhoneCall': return <PhoneCall className={className} id="icon-phone-call" />;
    case 'Building2': return <Building2 className={className} id="icon-building" />;
    default: return <Stethoscope className={className} id="icon-default" />;
  }
};

interface DashboardScreenProps {
  userName: string;
  userLocation: string;
  onNavigateToCalendar: () => void;
  onMenuItemClick: (itemId: string) => void;
  onLocationChange: (loc: string) => void;
  onUserChange: (name: string) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  isRoleEntered: boolean;
  onExitRole: () => void;
}

export default function DashboardScreen({
  userName,
  userLocation,
  onNavigateToCalendar,
  onMenuItemClick,
  onLocationChange,
  onUserChange,
  currentRole,
  onChangeRole,
  isRoleEntered,
  onExitRole
}: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tempName, setTempName] = React.useState(userName);
  const [restrictedAlert, setRestrictedAlert] = React.useState<{ id: string; label: string; reason: string } | null>(null);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('Para instalar Zeebra Hospital Veterinario en tu dispositivo:\n\n1. En iOS (Safari): Presiona el botón "Compartir" y selecciona "Agregar a inicio".\n2. En Android (Chrome): Presiona los tres puntos arriba a la derecha y selecciona "Instalar aplicación" o "Agregar a la pantalla principal".');
    }
  };

  const locations = ['New York', 'Los Angeles', 'Chicago', 'Madrid', 'London', 'Tokyo'];



  // Portal gateway screen when no role is active/entered yet
  if (!isRoleEntered) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 font-sans min-h-screen px-6 py-8" id="screen-portal">
        <motion.div 
          className="w-full max-w-md bg-white rounded-[32px] p-7 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.05)] text-center space-y-7"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          id="portal-card"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center mx-auto" id="portal-logo-container">
              <img 
                src="https://appdesign.appdesignproyectos.com/zeebra.png" 
                alt="Zeebra" 
                className="h-20 sm:h-24 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none pt-2">
              Selecciona tu perfil de acceso
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5" id="portal-roles-grid">
            {(['admin', 'veterinarian', 'receptionist', 'client'] as UserRole[]).map((r) => {
              let label = "";
              let description = "";
              let iconElement = null;
              let hoverColor = "";
              let badgeColor = "";

              if (r === 'admin') {
                label = "Administrador";
                description = "Consola Total";
                hoverColor = "hover:border-amber-400 hover:bg-amber-50/20";
                badgeColor = "text-amber-500 bg-amber-50 border-amber-100/60";
                iconElement = <Shield className="h-5.5 w-5.5" />;
              } else if (r === 'veterinarian') {
                label = "Veterinario";
                description = "Atención Médica";
                hoverColor = "hover:border-indigo-400 hover:bg-indigo-50/20";
                badgeColor = "text-indigo-500 bg-indigo-50 border-indigo-100/60";
                iconElement = <Stethoscope className="h-5.5 w-5.5" />;
              } else if (r === 'receptionist') {
                label = "Recepcionista";
                description = "Citas y Control";
                hoverColor = "hover:border-pink-400 hover:bg-pink-50/20";
                badgeColor = "text-pink-500 bg-pink-50 border-pink-100/60";
                iconElement = <ClipboardList className="h-5.5 w-5.5" />;
              } else if (r === 'client') {
                label = "Cliente";
                description = "Mi Mascota";
                hoverColor = "hover:border-cyan-400 hover:bg-cyan-50/20";
                badgeColor = "text-[#3db5d7] bg-cyan-50/40 border-cyan-100/60";
                iconElement = <Heart className="h-5.5 w-5.5 fill-current" />;
              }

              return (
                <button
                  key={r}
                  onClick={() => onChangeRole(r)}
                  className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer bg-white border-slate-100 shadow-2xs hover:shadow-xs hover:scale-[1.02] ${hoverColor}`}
                  id={`portal-role-${r}`}
                >
                  <div className={`mb-3 w-12 h-12 rounded-xl flex items-center justify-center border ${badgeColor}`}>
                    {iconElement}
                  </div>
                  <span className="text-[11.5px] font-black tracking-tight text-slate-800 block leading-tight">{label}</span>
                  <span className="text-[8px] block mt-1 font-bold text-slate-400 uppercase tracking-widest leading-none">
                    {description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Install App Button */}
          <div className="pt-1.5 border-t border-slate-50" id="portal-install-section">
            <button
              onClick={handleInstallClick}
              className="w-full bg-[#3db5d7] hover:bg-[#32a3c3] active:bg-[#2a9cbd] text-white font-black text-xs py-3.5 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs cursor-pointer hover:scale-[1.01]"
              id="btn-install-app"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span>Instalar Aplicación Móvil</span>
            </button>
          </div>
          
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider border-t border-slate-50 pt-4" id="portal-footer">
            Entrada de perfil clínica VetCare
          </div>
        </motion.div>
      </div>
    );
  }

  // Permissions helpers
  const isItemLocked = (itemId: string, role: UserRole): boolean => {
    if (role === 'admin') return false; // Admin has total access
    
    if (role === 'veterinarian') {
      // Vets do not schedule appointments directly or handle customer support tickets/external finder
      return itemId === 'appointment' || itemId === 'customer_service' || itemId === 'hospital';
    }
    
    if (role === 'receptionist') {
      // Receptionist cannot prescribe medicine or use the diagnostic clinical AI
      return itemId === 'medicine' || itemId === 'consult' || itemId === 'hospital';
    }
    
    if (role === 'client') {
      // Clients can access everything but with specific owner perspective.
      // (Today's Patients translates into "My Pets")
      return false;
    }
    
    return false;
  };

  const getLockReason = (itemId: string, role: UserRole): string => {
    if (role === 'veterinarian') {
      if (itemId === 'appointment') return "El agendamiento y reserva de citas externas es competencia del área de recepción y de los clientes.";
      if (itemId === 'customer_service') return "El chat de soporte técnico y facturación administrativa es gestionado por la recepción de la clínica.";
      if (itemId === 'hospital') return "El localizador de hospitales 24/7 de guardia externos está optimizado para urgencias fuera del horario de clientes.";
    }
    if (role === 'receptionist') {
      if (itemId === 'medicine') return "Como recepcionista administrativa, no posees firma médica autorizada para prescribir dosis o fármacos.";
      if (itemId === 'consult') return "El asistente de diagnóstico clínico AI está restringido únicamente a veterinarios licenciados y propietarios autorizados.";
      if (itemId === 'hospital') return "Buscador optimizado para derivaciones de emergencia externas de clientes directos.";
    }
    return "";
  };

  const getAdaptiveLabel = (itemId: string, role: UserRole): string => {
    if (role === 'client') {
      switch (itemId) {
        case 'appointment': return 'Agendar Cita';
        case 'medicine': return 'Mis Medicinas';
        case 'doctor': return 'Veterinarios';
        case 'history': return 'Historial Pet';
        case 'consult': return 'AI Vet Consult';
        case 'patients': return 'Mis Mascotas';
        case 'customer_service': return 'Chat Soporte';
        case 'hospital': return 'Hospitales 24/7';
      }
    } else if (role === 'veterinarian') {
      switch (itemId) {
        case 'appointment': return 'Agenda (Bloqueado)';
        case 'medicine': return 'Prescribir';
        case 'doctor': return 'Lista de Vets';
        case 'history': return 'Historial Médico';
        case 'consult': return 'AI Vet Assistant';
        case 'patients': return 'Mis Pacientes';
        case 'customer_service': return 'Soporte Admin';
        case 'hospital': return 'Finder Clínico';
      }
    } else if (role === 'receptionist') {
      switch (itemId) {
        case 'appointment': return 'Agendar Mascota';
        case 'medicine': return 'Fórmulas (Bloqueado)';
        case 'doctor': return 'Asignar Vet';
        case 'history': return 'Logs de Agenda';
        case 'consult': return 'AI Consult (Lock)';
        case 'patients': return 'Cola de Ingreso';
        case 'customer_service': return 'Atender Chat';
        case 'hospital': return 'Urgencias (Lock)';
      }
    } else if (role === 'admin') {
      switch (itemId) {
        case 'appointment': return 'Citas Admin';
        case 'medicine': return 'Control Medicinas';
        case 'doctor': return 'Gestionar Vets';
        case 'history': return 'Logs de Sistema';
        case 'consult': return 'AI Vet Diagnostic';
        case 'patients': return 'Cola Pacientes';
        case 'customer_service': return 'Logs Soporte';
        case 'hospital': return 'Sucursales Vet';
      }
    }
    return '';
  };

  const getAdaptiveIconColor = (itemId: string, isLocked: boolean, baseColor: string): string => {
    if (isLocked) {
      return 'bg-slate-100 text-slate-350 border-slate-200 opacity-60';
    }
    return baseColor;
  };

  const handleNameSave = () => {
    onUserChange(tempName || 'User');
    setIsEditingName(false);
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const adaptiveLabel = getAdaptiveLabel(item.id, currentRole);
    return adaptiveLabel.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (currentRole === 'admin') {
    return (
      <AdminWorkspace 
        onExitRole={onExitRole} 
        userName={userName} 
        userLocation={userLocation} 
      />
    );
  }

  if (currentRole === 'receptionist') {
    return (
      <div className="flex-1 flex flex-col bg-slate-50 font-sans min-h-screen animate-fade-in" id="receptionist-workspace-wrapper">
        <SharedHeader 
          userName={userName} 
          userLocation={userLocation} 
          currentRole="receptionist" 
          onExitRole={onExitRole}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ReceptionistWorkspace onExitRole={onExitRole} hideHeader={true} />
      </div>
    );
  }

  if (currentRole === 'client') {
    return (
      <div className="flex-1 flex flex-col bg-slate-50 font-sans min-h-screen animate-fade-in" id="client-workspace-wrapper">
        <SharedHeader 
          userName={userName} 
          userLocation={userLocation} 
          currentRole="client" 
          onExitRole={onExitRole}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ClientWorkspace onExitRole={onExitRole} hideHeader={true} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans min-h-screen" id="screen-dashboard">
      
      {/* Shared Header Component */}
      <SharedHeader 
        userName={userName}
        userLocation={userLocation}
        currentRole={currentRole}
        onExitRole={onExitRole}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLocationChange={onLocationChange}
      />

      {/* Main Banner Slider Area */}
      <div className="max-w-4xl mx-auto w-full px-5 -mt-4 relative z-25" id="hero-banner-container">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_6px_20px_-5px_rgba(0,0,0,0.12)] border border-slate-100">
          <div className="relative h-[150px] sm:h-[190px] md:h-[230px] w-full" id="banner-image-wrapper">
            <img 
              src="https://appdesign.appdesignproyectos.com/zeebrafoto.jpg" 
              alt="Zeebra Hospital"
              className="w-full h-full object-cover object-center filter contrast-[1.01] brightness-[1.01]"
              referrerPolicy="no-referrer"
              id="banner-image"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            {/* Decorative Sparkle Tag */}
            <div className="absolute top-3 left-3 bg-cyan-500/95 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 backdrop-blur-2xs shadow-xs" id="badge-sparkle">
              <Sparkles className="h-2.5 w-2.5 fill-current" />
              <span className="uppercase tracking-wider">ZEEBRA CERTIFIED</span>
            </div>
            
            {/* Context Badge overlay */}
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[9px] bg-slate-900/75 uppercase tracking-widest px-2 py-0.5 rounded font-extrabold border border-white/10 backdrop-blur-3xs shadow-xs">
                {(currentRole as any) === 'admin' ? 'Administrador General' :
                 (currentRole as any) === 'veterinarian' ? 'Veterinario Clínico' :
                 (currentRole as any) === 'receptionist' ? 'Recepción y Coordinación' :
                 'Cliente / Propietario'}
              </span>
            </div>
          </div>
        </div>
      </div>



      {(currentRole as any) === 'veterinarian' ? null : (
        <div className="max-w-4xl mx-auto w-full px-5 mt-4" id="role-context-banner">
          <div className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-all duration-300 shadow-2xs ${
            (currentRole as any) === 'admin' ? 'bg-amber-50/70 border-amber-100 text-slate-700' :
            (currentRole as any) === 'receptionist' ? 'bg-pink-50/70 border-pink-100 text-slate-700' :
            'bg-cyan-50/70 border-cyan-100 text-slate-700'
          }`}>
            <div className="mt-0.5" id="role-context-icon">
              {(currentRole as any) === 'admin' ? <Shield className="h-4.5 w-4.5 text-amber-600" /> :
               (currentRole as any) === 'receptionist' ? <ClipboardList className="h-4.5 w-4.5 text-pink-600" /> :
               <Heart className="h-4.5 w-4.5 text-cyan-600 fill-current" />}
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider">
                {(currentRole as any) === 'admin' ? 'Consola Administrativa de Turno' :
                 (currentRole as any) === 'receptionist' ? 'Escritorio de Recepción y Control' :
                 'Portal Familiar de Cuidado de Mascotas'}
              </h4>
              <p className="text-[10px] leading-relaxed text-slate-500 mt-1">
                {(currentRole as any) === 'admin' ? 'Tienes autorización total. Puedes auditar logs, simular diagnósticos, monitorear fármacos y observar la telemetría sin restricciones clínicas.' :
                 (currentRole as any) === 'receptionist' ? 'Centro de atención al cliente. Administra las solicitudes de citas y chats de asistencia. La prescripción de medicamentos está legalmente bloqueada para este perfil.' :
                 'Bienvenido al portal para mascotas. Agenda chequeos para tu compañero de cuatro patas, chatea con el veterinario AI, administra sus dosis diarias de medicamentos y localiza centros de emergencias 24/7.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {(currentRole as any) === 'veterinarian' ? (
        <VeterinaryWorkspace onExitRole={onExitRole} />
      ) : (
        <div className="max-w-4xl mx-auto w-full flex-1 px-5 pt-6 pb-4" id="grid-container">
          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm" id="empty-search-state">
              No options found for "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8" id="medical-services-grid">
              {filteredMenuItems.map((item) => {
                const isLocked = isItemLocked(item.id, currentRole);
                const labelText = getAdaptiveLabel(item.id, currentRole);
                const customColor = getAdaptiveIconColor(item.id, isLocked, item.color);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isLocked) {
                        setRestrictedAlert({
                          id: item.id,
                          label: labelText,
                          reason: getLockReason(item.id, currentRole)
                        });
                      } else {
                        onMenuItemClick(item.id);
                      }
                    }}
                    className={`flex flex-col items-center group cursor-pointer text-center relative ${isLocked ? 'opacity-70' : ''}`}
                    id={`btn-grid-${item.id}`}
                  >
                    {/* Styled Icon Wrapper - Responsive scale */}
                    <div className={`w-[52px] h-[52px] sm:w-[68px] sm:h-[68px] rounded-2xl flex items-center justify-center shadow-xs border border-slate-100/50 transition-all duration-200 relative ${customColor} ${!isLocked ? 'group-hover:-translate-y-0.5 group-hover:shadow-md' : 'cursor-not-allowed bg-slate-100/80'}`} id={`icon-wrapper-${item.id}`}>
                      <MenuItemIcon name={item.iconName} className="h-5.5 w-5.5 sm:h-7 sm:w-7 stroke-[1.8]" />
                      
                      {/* Tiny padlock indicator if module is locked */}
                      {isLocked && (
                        <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1 border border-white shadow-xs animate-bounce" id={`lock-badge-${item.id}`}>
                          <Lock className="h-2.5 w-2.5" />
                        </div>
                      )}
                    </div>
                    {/* Label */}
                    <span className={`text-[10px] sm:text-xs font-semibold mt-2 sm:mt-3 leading-tight tracking-tight line-clamp-2 px-1 max-w-[75px] sm:max-w-[100px] ${isLocked ? 'text-slate-400 line-through' : 'text-slate-600 group-hover:text-cyan-600'}`}>
                      {labelText}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* DYNAMIC ROLE PANEL (DELIGHTFUL BUSINESS METRICS / DATA CARD) */}
      <div className="max-w-4xl mx-auto w-full px-5 pb-5" id="dynamic-role-widget">
        {(currentRole as any) === 'admin' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3 animate-fade-in" id="admin-widget">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-600 flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 fill-current" />
                <span>Consola Administrativa General</span>
              </span>
              <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">SERVER LIVE</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center" id="admin-telemetry">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[8px] text-slate-400 block uppercase font-bold">Pacientes Atendidos</span>
                <span className="text-sm font-extrabold text-slate-800">2,410</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[8px] text-slate-400 block uppercase font-bold">Citas de Hoy</span>
                <span className="text-sm font-extrabold text-slate-800">12 Activas</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[8px] text-slate-400 block uppercase font-bold">Vets en Turno</span>
                <span className="text-sm font-extrabold text-slate-800">3 de Guardia</span>
              </div>
            </div>

            <div className="bg-slate-950 text-slate-300 p-2.5 rounded-lg text-[9px] font-mono leading-relaxed" id="admin-log-mini">
              <p className="text-amber-400 font-bold"># VetCare Core Diagnostic Logs:</p>
              <p className="text-slate-400 mt-0.5">DB schema loaded • Firestore Blueprints active • Security rules: Enforced.</p>
            </div>
          </div>
        )}

        {currentRole === 'veterinarian' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3 animate-fade-in" id="vet-widget">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600 flex items-center space-x-1">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Horario Clínico de Guardia</span>
              </span>
              <span className="text-[8px] bg-indigo-100 text-indigo-800 font-extrabold px-1.5 py-0.2 rounded">DR. ROBERTO DÍAZ</span>
            </div>
            
            <div className="flex items-center justify-between bg-indigo-50/30 p-2.5 rounded-xl border border-indigo-100/50" id="vet-next-pet">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-inner">
                  L
                </div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-slate-800">Siguiente Paciente: Luna (Gato)</h5>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">Control de otitis y vacunación • Dueño: Lucas Williams</p>
                </div>
              </div>
              <span className="text-[9.5px] font-extrabold bg-white px-2 py-0.5 rounded border border-indigo-100 text-indigo-700">11:00 AM</span>
            </div>
          </div>
        )}

        {(currentRole as any) === 'receptionist' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3 animate-fade-in" id="recep-widget">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-pink-600 flex items-center space-x-1">
                <ClipboardList className="h-3.5 w-3.5" />
                <span>Mesa de Control de Entrada</span>
              </span>
              <span className="text-[8px] bg-pink-100 text-pink-800 font-extrabold px-1.5 py-0.2 rounded">LAURA PÉREZ</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9.5px]" id="recep-metrics">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <h5 className="font-bold text-slate-700">Check-ins Pendientes</h5>
                <p className="text-slate-400 mt-1">Rocky (Bulldog) • Alergias</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <h5 className="font-bold text-slate-700">Soporte Chat</h5>
                <p className="text-emerald-500 font-bold mt-1">1 Cliente en Línea</p>
              </div>
            </div>
          </div>
        )}

        {(currentRole as any) === 'client' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3 animate-fade-in" id="client-widget">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-cyan-600 flex items-center space-x-1">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Mi Mascota Activa</span>
              </span>
              <span className="text-[8px] bg-cyan-100 text-cyan-800 font-extrabold px-1.5 py-0.2 rounded">SOPHIA MARTINEZ</span>
            </div>

            <div className="flex items-center justify-between" id="client-pet-brief">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-xl shadow-inner border border-cyan-100">
                  🐶
                </div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-slate-800">Max (Golden Retriever)</h5>
                  <p className="text-[9px] text-slate-400 mt-0.5">Próxima vacuna: Séxtuple de Refuerzo (12 Jul)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-extrabold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">Saludable</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action & Navigation */}
      {currentRole !== 'veterinarian' && (
        <div className="max-w-4xl mx-auto w-full px-5 pb-10 pt-2 flex flex-col items-center" id="footer-actions">
          {/* See Calendar Button */}
          <button
            onClick={onNavigateToCalendar}
            className="w-full sm:max-w-md bg-[#3db5d7] hover:bg-[#32a3c3] text-white font-semibold text-xs sm:text-sm py-3.5 sm:py-4 rounded-full shadow-[0_4px_14px_rgba(61,181,215,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center tracking-wide cursor-pointer"
            id="btn-see-calendar"
          >
            See Calendar
          </button>

          {/* Page Slider Dots (Left Page is Active) */}
          <div className="flex space-x-1.5 mt-5" id="page-dots-container">
            <span className="w-2.5 h-1.5 bg-[#3db5d7] rounded-full transition-all duration-300" id="dot-1"></span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full transition-all duration-300" id="dot-2"></span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full transition-all duration-300" id="dot-3"></span>
          </div>
        </div>
      )}

      {/* RESTRICTED MODULE LIGHTBOX OVERLAY */}
      {restrictedAlert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in" id="role-restricted-alert">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-slate-100 shadow-2xl flex flex-col items-center space-y-4 animate-scale-up text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shadow-inner animate-bounce">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Módulo Restringido</h3>
              <h4 className="text-[11px] font-extrabold text-rose-500 mt-1 uppercase tracking-wide">{restrictedAlert.label}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-2 px-1">
                {restrictedAlert.reason}
              </p>
            </div>
            
            {/* Help switch suggestion */}
            <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-500 leading-normal border border-slate-100 w-full text-left">
              💡 <strong>¿Deseas probar esta función?</strong> Tienes autorización para cambiar al rol correspondiente usando el panel de acceso de perfiles en la pantalla de inicio.
            </div>
            
            <button
              onClick={() => setRestrictedAlert(null)}
              className="w-full bg-[#3db5d7] hover:bg-[#32a3c3] text-white font-bold text-xs py-2.5 rounded-full transition-colors cursor-pointer text-center"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
