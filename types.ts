
import React from 'react';

export type UserRole = 'patient' | 'professional';
export type ProfessionalTitle = 'Doctor' | 'Pharmacist';

export enum Page {
  // Patient Pages
  Dashboard = 'Dashboard',
  HealthMetrics = 'Health Metrics',
  Medications = 'Medications',
  Appointments = 'Appointments',
  MyDoctors = 'My Doctors',
  ChatBot = 'Chat Bot',
  Settings = 'Settings',
  HelpSupport = 'Help & Support',
  VideoCall = 'Video Call',
  ScheduleAppointment = 'Schedule Appointment',
  PersonalChat = 'Personal Chat',
  // Professional Pages
  ProfessionalDashboard = 'Professional Dashboard',
  PatientList = 'Patient List',
  ProfessionalSchedule = 'Professional Schedule',
}

export enum AppointmentStatus {
  Upcoming = 'Upcoming',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Rescheduled = 'Rescheduled',
}

export enum AppointmentType {
    CheckUp = 'Check-up',
    FollowUp = 'Follow-up',
    Consultation = 'Consultation',
    Initial = 'Initial',
}

export interface Document {
    id: string;
    name: string;
    type: 'pdf' | 'jpg' | 'png';
    date: string;
}

export interface Appointment {
  id: number;
  doctorName: string; 
  patientName: string;
  specialty: string;
  status: AppointmentStatus;
  type: AppointmentType;
  date: string;
  time: string;
  duration: number;
  notes: string;
  avatar: string; 
  summary?: string;
  documents?: Document[];
  patientId: string;
  professionalId: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  percentageLeft: number;
  nextDose: string;
  isTaken: boolean;
  refillNeeded?: string;
}

export interface PrescriptionRefillRequest {
    id: number;
    patientName: string;
    drugName: string;
    dosage: string;
    timeAgo: string;
    patientId: string;
    professionalId: string;
    isEditing?: boolean;
    editedDrugName?: string;
    editedDosage?: string;
}

export enum HealthMetricStatus {
  Normal = 'Normal',
  Warning = 'Warning',
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: HealthMetricStatus;
  trend: string;
  trendDirection: 'up' | 'down' | 'stable';
  history: HistoricalDataPoint[];
}

export enum AlertLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface HealthAlert {
  id: number;
  title: string;
  description: string;
  level: AlertLevel;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Professional {
    id: number;
    name: string;
    specialty: string;
    avatar: string;
    rating: number;
    professionalTitle?: ProfessionalTitle;
    lastMessage?: string; 
    lastMessageTime?: string;
    unread?: boolean;
    supabaseId: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    status: 'Stable' | 'Critical' | 'Recovering';
    lastVisit: string;
    avatar: string;
    supabaseId: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai' | 'professional' | 'patient';
  text: string;
  imageUrl?: string;
  sources?: Array<{ title: string; uri: string }>;
  timestamp: string;
  isRead?: boolean;
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role?: UserRole;
    professionalTitle?: ProfessionalTitle;
    specialty?: string;
    supabaseId?: string;
}

export interface BoticareNotification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning';
    timestamp: string;
    read: boolean;
}

export interface AvailabilitySlot {
    id?: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isEnabled: boolean;
}

export interface VideoCallRecord {
    id: string;
    professionalName: string;
    professionalAvatar: string;
    date: string;
    time: string;
    duration: string;
}

export interface Symptom {
    id: string;
    name: string;
    date: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    description: string;
}

export interface NewAppointmentDetails {
    consultationType: 'video' | 'chat';
    professional: Professional;
    date: string;
    time: string;
    notes: string;
}
