
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HealthMetrics from './components/HealthMetrics';
import Medications from './components/Medications';
import Appointments from './components/Appointments';
import MyDoctors from './components/MyDoctors';
import ChatBot from './components/Community';
import PersonalChat from './components/PersonalChat';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import VideoCall from './components/VideoCall';
import Auth from './components/Auth';
import { supabase } from './services/supabaseClient';
import { Page, Professional, UserProfile, BoticareNotification, Patient, Appointment } from './types';

const App: React.FC = () => {
  const [session, setSession] = useState<any | null>(null);
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [videoCallProfessional, setVideoCallProfessional] = useState<Professional | null>(null);
  const [chatRecipient, setChatRecipient] = useState<Patient | Professional | UserProfile | null>(null);
  const [videoCallAppointment, setVideoCallAppointment] = useState<Appointment | null>(null);
  const [notifications, setNotifications] = useState<BoticareNotification[]>([]);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Loading...',
    email: '',
    phone: '',
    avatar: 'https://i.pravatar.cc/150?u=placeholder',
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('boticare-dark-mode');
    return saved ? saved === 'true' : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) { root.classList.add('dark'); } else { root.classList.remove('dark'); }
    localStorage.setItem('boticare-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (error) throw error;
        if (data) {
            setUserProfile({
                name: data.name || 'User',
                email: data.email || '',
                phone: data.phone || '',
                avatar: data.avatar_url || 'https://i.pravatar.cc/150?u=default',
                role: 'patient',
                supabaseId: data.id 
            });
        }
    } catch (err) { console.error("Profile fetch error", err); }
  };

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    if (!session || !supabase) return;
    try {
        const { error } = await supabase.from('profiles')
            .update({ 
                name: updatedProfile.name, 
                phone: updatedProfile.phone, 
                avatar_url: updatedProfile.avatar,
            })
            .eq('id', session.user.id);
        if (error) throw error;
        setUserProfile(updatedProfile);
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
    }
  };


  const handleAddNotification = (msg: string) => {
      const newNotif: BoticareNotification = {
          id: Date.now().toString(),
          message: msg,
          type: 'success',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkNotificationsAsRead = () => {
      setTimeout(() => {
          setNotifications(prev => prev.map(n => ({...n, read: true})));
      }, 2000);
  };
  
  const handleStartVideoCall = (appointment: Appointment, professional: Professional | null = null) => {
    setVideoCallAppointment(appointment);
    setVideoCallProfessional(professional);
    setActivePage(Page.VideoCall);
  };


  const startPersonalChat = (recipient: Patient | Professional | UserProfile) => {
      setChatRecipient(recipient);
      setActivePage(Page.PersonalChat);
  };

  if (!session) {
    return <div className="bg-white text-gray-800 font-sans dark:bg-gray-900 dark:text-gray-200"><Auth /></div>;
  }

  const renderPatientPage = () => {
    switch (activePage) {
        case Page.Dashboard: return <Dashboard />;
        case Page.HealthMetrics: return <HealthMetrics setActivePage={setActivePage} />;
        case Page.Medications: return <Medications />;
        case Page.Appointments: return <Appointments setActivePage={setActivePage} setVideoCallProfessional={handleStartVideoCall} />;
        case Page.MyDoctors: return <MyDoctors onStartChat={startPersonalChat} />;
        case Page.ChatBot: return <ChatBot userProfile={userProfile} />;
        case Page.PersonalChat: return <PersonalChat recipient={chatRecipient} userProfile={userProfile} onClose={() => setActivePage(Page.MyDoctors)} />;
        case Page.Settings: return <Settings userProfile={userProfile} onProfileUpdate={handleUpdateProfile} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
        case Page.HelpSupport: return <HelpSupport />;
        case Page.VideoCall: return <VideoCall appointment={videoCallAppointment} professional={videoCallProfessional} onEndCall={() => setActivePage(Page.Appointments)} />;
        default: return <Dashboard />;
    }
  };

  return (
    <div className="bg-boticare-gray text-gray-800 font-sans dark:bg-gray-900 dark:text-gray-200">
      <Layout 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userProfile={userProfile} 
        notifications={notifications}
        onMarkNotificationsAsRead={handleMarkNotificationsAsRead}
      >
        {renderPatientPage()}
      </Layout>
    </div>
  );
};

export default App;
