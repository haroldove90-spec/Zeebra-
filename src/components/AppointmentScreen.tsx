import React from 'react';
import { 
  ChevronLeft, 
  SlidersHorizontal, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  User, 
  Briefcase, 
  Award,
  Users
} from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { DOCTORS } from '../data';

interface AppointmentScreenProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
  onNavigateBack: () => void;
  onBookAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'patientName'>) => void;
  userName: string;
}

export default function AppointmentScreen({
  selectedDoctorId,
  onDoctorChange,
  onNavigateBack,
  onBookAppointment,
  userName
}: AppointmentScreenProps) {
  // Doctor state
  const doctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  // Calendar states
  const [currentYear, setCurrentYear] = React.useState(2021);
  const [currentMonthIndex, setCurrentMonthIndex] = React.useState(5); // June (0-indexed)
  const [selectedDay, setSelectedDay] = React.useState(20); // Sat 20 highlighted in design
  const [selectedTime, setSelectedTime] = React.useState('12:00'); // 12:00 highlighted in design

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  // Generate weekday names for 6 items around the selected month
  // To keep it simple and match the design (Mon 15, Tue 16, Wed 17, Thu 18, Fri 19, Sat 20)
  const daysInView = [
    { name: 'Mon', num: 15 },
    { name: 'Tue', num: 16 },
    { name: 'Wed', num: 17 },
    { name: 'Thu', num: 18 },
    { name: 'Fri', num: 19 },
    { name: 'Sat', num: 20 },
  ];

  const timeSlots = ['10:00', '12:00', '14:00', '16:00', '18:00'];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleBooking = () => {
    const dateString = `${months[currentMonthIndex]} ${selectedDay}, ${currentYear}`;
    onBookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorAvatar: doctor.avatar,
      date: dateString,
      time: selectedTime,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white font-sans min-h-screen" id="screen-appointment">
      {/* Header */}
      <div className="bg-[#3db5d7] text-white relative z-20 transition-colors duration-300 shadow-xs">
        <div className="max-w-4xl mx-auto w-full px-5 py-3.5 flex justify-between items-center">
          <button 
            onClick={onNavigateBack} 
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            id="btn-back"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <span className="text-sm sm:text-base font-bold tracking-wide" id="appointment-title">Appointment</span>
          <div className="relative" id="filter-dropdown-container">
            {/* Quick Doctor Selector via Sliders Icon or dropdown */}
            <select 
              value={doctor.id}
              onChange={(e) => onDoctorChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
              id="doctor-select-hidden"
            >
              {DOCTORS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer" id="btn-sliders">
              <SlidersHorizontal className="h-4.5 w-4.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Card Profile Frame with light blue/teal background */}
      <div className="bg-[#59c3e1] text-white relative" id="doctor-profile-card">
        <div className="max-w-4xl mx-auto w-full px-5 pt-6 pb-6 grid grid-cols-12 gap-6 items-center relative z-10" id="doctor-profile-grid">
          {/* Left Details */}
          <div className="col-span-7 sm:col-span-8 pr-1" id="doctor-details-left">
            <h2 className="text-base sm:text-2xl font-bold tracking-tight leading-tight" id="doc-card-name">
              {doctor.name}
            </h2>
            <p className="text-[11px] sm:text-sm text-cyan-50/90 font-medium tracking-wide mt-0.5" id="doc-card-specialty">
              {doctor.specialty}
            </p>

            {/* Quick stats panel */}
            <div className="mt-4 grid grid-cols-3 gap-1 border-t border-b border-white/20 py-2 text-[10px] sm:text-xs" id="doc-quick-stats">
              <div>
                <span className="text-cyan-50/80 block">Patient</span>
                <span className="font-bold text-[11px] sm:text-sm">{doctor.patients}</span>
              </div>
              <div className="border-l border-white/20 pl-1.5 sm:pl-3">
                <span className="text-cyan-50/80 block">Experience</span>
                <span className="font-bold text-[11px] sm:text-sm">{doctor.experience}</span>
              </div>
              <div className="border-l border-white/20 pl-1.5 sm:pl-3">
                <span className="text-cyan-50/80 block">Rating</span>
                <span className="font-bold text-[11px] sm:text-sm flex items-center">
                  {doctor.rating} <Star className="h-2.5 w-2.5 fill-current text-amber-300 ml-0.5" />
                </span>
              </div>
            </div>

            {/* About Info */}
            <div className="mt-4 sm:mt-5" id="doc-card-about">
              <h3 className="text-[9.5px] sm:text-[11px] font-bold tracking-wider text-cyan-50/90" id="doc-about-label">ABOUT</h3>
              <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed mt-1 line-clamp-4 font-normal" id="doc-about-text">
                {doctor.about}
              </p>
            </div>
          </div>

          {/* Right Portrait Image */}
          <div className="col-span-5 sm:col-span-4 flex justify-end items-end relative h-full" id="doctor-portrait-container">
            <div className="w-[125px] h-[160px] sm:w-[165px] sm:h-[210px] relative rounded-xl overflow-hidden shadow-sm" id="doctor-image-frame">
              <img 
                src={doctor.avatar} 
                alt={doctor.name}
                className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.02]"
                referrerPolicy="no-referrer"
                id="doc-card-avatar"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#59c3e1]/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex-1 flex flex-col bg-slate-50" id="scheduler-container">
        {/* Month Selector Bar */}
        <div className="bg-slate-200/70 border-b border-slate-200/40" id="month-bar">
          <div className="max-w-4xl mx-auto w-full py-2 px-5 flex justify-between items-center text-slate-500 font-sans">
            <button 
              onClick={handlePrevMonth}
              className="w-8 h-8 hover:bg-slate-300/40 rounded-full flex items-center justify-center transition-all cursor-pointer"
              id="btn-prev-month"
            >
              <ChevronLeft className="h-4 w-4 text-cyan-600" />
            </button>
            
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-600" id="label-current-month">
              {months[currentMonthIndex]} {currentYear}
            </span>

            <button 
              onClick={handleNextMonth}
              className="w-8 h-8 hover:bg-slate-300/40 rounded-full flex items-center justify-center transition-all cursor-pointer"
              id="btn-next-month"
            >
              <ChevronRight className="h-4 w-4 text-cyan-600" />
            </button>
          </div>
        </div>

        {/* Days Horizontal Grid Selector */}
        <div className="bg-white border-b border-slate-100" id="calendar-days-container">
          <div className="max-w-4xl mx-auto w-full px-5 py-6">
            <div className="grid grid-cols-6 gap-3 sm:gap-4" id="days-grid">
              {daysInView.map((day) => {
                const isSelected = selectedDay === day.num;
                return (
                  <button
                    key={day.num}
                    onClick={() => setSelectedDay(day.num)}
                    className={`flex flex-col items-center py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#3db5d7] text-white border-[#3db5d7] shadow-sm transform scale-102' 
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                    }`}
                    id={`btn-day-${day.num}`}
                  >
                    <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {day.name}
                    </span>
                    <span className="text-[13.5px] sm:text-base font-bold mt-1">
                      {day.num}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Selector Section with Slider */}
        <div className="border-t border-b border-slate-100 bg-white flex flex-col justify-center" id="time-selector-container">
          <div className="max-w-4xl mx-auto w-full px-5 py-6">
            <div className="flex items-center justify-between" id="time-slider-wrapper">
              <button className="text-cyan-600 hover:bg-cyan-50 rounded-full p-1.5 transition-all cursor-pointer" id="btn-prev-time">
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              
              <div className="flex-1 flex justify-around items-center px-2" id="time-slots-list">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#3db5d7] text-white shadow-sm' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                      id={`btn-time-${time.replace(':', '')}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <button className="text-cyan-600 hover:bg-cyan-50 rounded-full p-1.5 transition-all cursor-pointer" id="btn-next-time">
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Booking action footer */}
        <div className="mt-auto bg-white border-t border-slate-50 shadow-sm" id="appointment-actions-footer">
          <div className="max-w-4xl mx-auto w-full px-5 pb-8 pt-6 flex flex-col items-center">
            {/* Action button: Get Started */}
            <button
              onClick={handleBooking}
              className="w-full sm:max-w-md bg-[#3db5d7] hover:bg-[#32a3c3] text-white font-semibold text-xs sm:text-sm py-3 sm:py-4 rounded-full shadow-[0_4px_14px_rgba(61,181,215,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center tracking-wide"
              id="btn-get-started"
            >
              Get Started
            </button>

            {/* Slider indicators */}
            <div className="flex space-x-1.5 mt-4" id="appointment-page-dots">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full transition-all duration-300" id="dot-2-1"></span>
              <span className="w-2.5 h-1.5 bg-[#3db5d7] rounded-full transition-all duration-300" id="dot-2-2"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full transition-all duration-300" id="dot-2-3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
