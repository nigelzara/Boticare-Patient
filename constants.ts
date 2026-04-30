import { Appointment, Medication, HealthMetric, HealthAlert, AppointmentStatus, HealthMetricStatus, AlertLevel, Professional, AppointmentType, VideoCallRecord, Patient } from './types';
import { HeartIcon, PillIcon, GlucoseIcon, CalendarIcon } from './components/Icons';

export const APPOINTMENTS_DATA: Appointment[] = [
  { 
      id: 1, 
      doctorName: 'Dr. Mike Ralph', 
      specialty: 'Cardiologist', 
      status: AppointmentStatus.Upcoming, 
      type: AppointmentType.FollowUp, 
      date: 'Today, June 6, 2025', 
      time: '4:00 PM', 
      duration: 30, 
      notes: 'Follow up on recent Blood Pressure medication changes', 
      avatar: 'https://i.pravatar.cc/150?u=doc1',
      patientName: 'Jane Doe',
      patientId: 'patient1_supabase_id', // Mock Supabase ID
      professionalId: 'pro1_supabase_id', // Mock Supabase ID
      documents: [
          { id: 'doc1', name: 'Blood Test Results.pdf', type: 'pdf', date: 'June 1, 2025' },
          { id: 'doc2', name: 'Cardiology Referral.jpg', type: 'jpg', date: 'May 20, 2025' }
      ]
  },
  { 
      id: 2, 
      doctorName: 'Dr. Lolla Kachi', 
      specialty: 'Endocrinologist', 
      status: AppointmentStatus.Completed, 
      type: AppointmentType.Consultation, 
      date: 'Today, June 4, 2025', 
      time: '8:00 PM', 
      duration: 50, 
      notes: 'Discuss recent test results & treatment options', 
      avatar: 'https://i.pravatar.cc/150?u=doc2',
      patientName: 'Jane Doe',
      patientId: 'patient1_supabase_id', // Mock Supabase ID
      professionalId: 'pro2_supabase_id', // Mock Supabase ID
      documents: []
  },
  { 
      id: 3, 
      doctorName: 'Dr. Danny Joe', 
      specialty: 'Neurologist', 
      status: AppointmentStatus.Canceled, 
      type: AppointmentType.Initial, 
      date: 'Today, June 5, 2025', 
      time: '6:00 PM', 
      duration: 60, 
      notes: 'Initial consultation for migraine symptoms', 
      avatar: 'https://i.pravatar.cc/150?u=doc3',
      patientName: 'Jane Doe',
      patientId: 'patient1_supabase_id', // Mock Supabase ID
      professionalId: 'pro3_supabase_id', // Mock Supabase ID
  },
  { 
      id: 4, 
      doctorName: 'Dr. Hephzibah O', 
      specialty: 'Endocrinologist', 
      status: AppointmentStatus.Rescheduled, 
      type: AppointmentType.Consultation, 
      date: 'Today, June 4, 2025', 
      time: '8:00 PM', 
      duration: 30, 
      notes: 'Discuss recent test results & treatment options', 
      avatar: 'https://i.pravatar.cc/150?u=doc4',
      patientName: 'Jane Doe',
      patientId: 'patient1_supabase_id', // Mock Supabase ID
      professionalId: 'pro4_supabase_id', // Mock Supabase ID
  },
];

export const MEDICATIONS_DATA: Medication[] = [
  { id: 1, name: 'Metformin', dosage: '500mg • Twice daily', percentageLeft: 65, nextDose: 'Next dose at 9:00 PM', isTaken: false },
  { id: 2, name: 'Lisinopril', dosage: '10mg • Once daily', percentageLeft: 25, nextDose: 'Next dose at 8:00 AM', isTaken: false, refillNeeded: 'Refill needed by June 28' },
  { id: 3, name: 'Vitamin C', dosage: '1000IU • Once daily', percentageLeft: 82, nextDose: 'Next dose at 8:00 AM', isTaken: true },
  { id: 4, name: 'Artovastatin', dosage: '20mg • Once daily', percentageLeft: 20, nextDose: 'Next dose at 9:00 PM', isTaken: false, refillNeeded: 'Refill needed by June 28' },
  { id: 5, name: 'Aspirin', dosage: '81mg • Once daily', percentageLeft: 90, nextDose: 'Next dose at 8:00 AM', isTaken: true },
];

export const HEALTH_METRICS_DATA: HealthMetric[] = [
    { 
        id: 'hr', 
        name: 'Heart Rate', 
        value: '72', 
        unit: 'bpm', 
        status: HealthMetricStatus.Normal, 
        trend: '0% stable', 
        trendDirection: 'stable',
        history: [
            { date: 'Mon', value: 70 },
            { date: 'Tue', value: 72 },
            { date: 'Wed', value: 75 },
            { date: 'Thu', value: 71 },
            { date: 'Fri', value: 73 },
            { date: 'Sat', value: 72 },
            { date: 'Sun', value: 70 },
        ]
    },
    { 
        id: 'bp', 
        name: 'Blood Pressure', 
        value: '120', 
        unit: 'mmHg', 
        status: HealthMetricStatus.Normal, 
        trend: '0% stable', 
        trendDirection: 'stable',
        history: [
            { date: 'Mon', value: 118 },
            { date: 'Tue', value: 120 },
            { date: 'Wed', value: 122 },
            { date: 'Thu', value: 119 },
            { date: 'Fri', value: 121 },
            { date: 'Sat', value: 120 },
            { date: 'Sun', value: 120 },
        ]
    },
    { 
        id: 'bg', 
        name: 'Blood Glucose', 
        value: '110', 
        unit: 'mg/dL', 
        status: HealthMetricStatus.Warning, 
        trend: '5% increase', 
        trendDirection: 'up',
        history: [
            { date: 'Mon', value: 95 },
            { date: 'Tue', value: 98 },
            { date: 'Wed', value: 102 },
            { date: 'Thu', value: 105 },
            { date: 'Fri', value: 108 },
            { date: 'Sat', value: 110 },
            { date: 'Sun', value: 112 },
        ]
    },
];

export const HEALTH_ALERTS_DATA: HealthAlert[] = [
    { id: 1, title: 'Elevated Blood Glucose', description: 'Your blood glucose level has been above normal for the past 3 readings.', level: AlertLevel.Medium, time: '08:03 AM', icon: GlucoseIcon },
    { id: 2, title: 'Missed Medication', description: 'You missed your morning dose of Lisinopril', level: AlertLevel.High, time: '10:00 AM', icon: PillIcon },
    { id: 3, title: 'Upcoming Appointment', description: 'Reminder: You have a video consultation with Dr Ralph Mike tomorrow at 08:00 PM', level: AlertLevel.Low, time: '08:00 PM', icon: CalendarIcon },
];

export const PROFESSIONALS_DATA: Professional[] = [
  { id: 1, name: 'Dr. Mike Ralph', specialty: 'Cardiologist', avatar: 'https://i.pravatar.cc/150?u=doc1', rating: 5, supabaseId: 'pro1_supabase_id' },
  { id: 2, name: 'Pharm Will Otto', specialty: 'Neurologist', avatar: 'https://i.pravatar.cc/150?u=doc5', rating: 4, supabaseId: 'pro5_supabase_id' },
  { id: 3, name: 'Dr. Lolla Kachi', specialty: 'Oncologist', avatar: 'https://i.pravatar.cc/150?u=doc2', rating: 4, supabaseId: 'pro2_supabase_id' },
  { id: 4, name: 'Dr. Danny Joe', specialty: 'Ophthalmologist', avatar: 'https://i.pravatar.cc/150?u=doc3', rating: 5, supabaseId: 'pro3_supabase_id' },
];

export const VIDEO_CALL_HISTORY_DATA: VideoCallRecord[] = [
    { id: '1', professionalName: 'Dr. Mike Ralph', professionalAvatar: 'https://i.pravatar.cc/150?u=doc1', date: 'June 1, 2025', time: '10:00 AM', duration: '24:15' },
    { id: '2', professionalName: 'Dr. Lolla Kachi', professionalAvatar: 'https://i.pravatar.cc/150?u=doc2', date: 'May 20, 2025', time: '02:30 PM', duration: '15:00' },
];

// FIX: Added explicit Patient[] type annotation to ensure strict typing for MOCK_PATIENTS
export const MOCK_PATIENTS: Patient[] = [
    { id: '1', name: 'Jane Doe', age: 34, gender: 'Female', condition: 'Hypertension', status: 'Stable', lastVisit: 'June 6, 2025', avatar: 'https://i.pravatar.cc/150?u=jane', supabaseId: 'patient1_supabase_id' },
    { id: '2', name: 'John Smith', age: 45, gender: 'Male', condition: 'Type 2 Diabetes', status: 'Critical', lastVisit: 'June 4, 2025', avatar: 'https://i.pravatar.cc/150?u=john', supabaseId: 'patient2_supabase_id' },
    { id: '3', name: 'Alice Johnson', age: 28, gender: 'Female', condition: 'Migraine', status: 'Recovering', lastVisit: 'May 20, 2025', avatar: 'https://i.pravatar.cc/150?u=alice', supabaseId: 'patient3_supabase_id' },
    { id: '4', name: 'Robert Brown', age: 62, gender: 'Male', condition: 'Arthritis', status: 'Stable', lastVisit: 'June 1, 2025', avatar: 'https://i.pravatar.cc/150?u=robert', supabaseId: 'patient4_supabase_id' },
    { id: '5', name: 'Emily Davis', age: 50, gender: 'Female', condition: 'Asthma', status: 'Stable', lastVisit: 'May 15, 2025', avatar: 'https://i.pravatar.cc/150?u=emily', supabaseId: 'patient5_supabase_id' },
];