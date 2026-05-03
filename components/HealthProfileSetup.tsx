
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { UserProfile } from '../types';
import { 
    UserIcon, 
    AlertIcon, 
    MedicationsIcon, 
    UsersIcon, 
    ArrowRightIcon,
    PlusIcon
} from './Icons';

interface HealthProfileSetupProps {
    userProfile: UserProfile;
    onComplete: (updatedProfile: UserProfile) => void;
}

const HealthProfileSetup: React.FC<HealthProfileSetupProps> = ({ userProfile, onComplete }) => {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        height: '',
        heightUnit: 'cm',
        weight: '',
        weightUnit: 'kg',
        bloodType: '',
        medicalHistory: '',
        medicationsList: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });

    const steps = [
        { id: 'basic', label: 'Basic Info', icon: UserIcon },
        { id: 'history', label: 'Medical History', icon: AlertIcon },
        { id: 'medications', label: 'Medications', icon: MedicationsIcon },
        { id: 'emergency', label: 'Emergency Contact', icon: UsersIcon },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // Final submission
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase!
                .from('profiles')
                .update({
                    height: `${formData.height} ${formData.heightUnit}`,
                    weight: `${formData.weight} ${formData.weightUnit}`,
                    blood_type: formData.bloodType,
                    medical_history: formData.medicalHistory,
                    medications_list: formData.medicationsList,
                    emergency_contact_name: formData.emergencyContactName,
                    emergency_contact_phone: formData.emergencyContactPhone,
                    onboarding_completed: true
                })
                .eq('id', userProfile.supabaseId);

            if (error) throw error;

            onComplete({
                ...userProfile,
                height: `${formData.height} ${formData.heightUnit}`,
                weight: `${formData.weight} ${formData.weightUnit}`,
                bloodType: formData.bloodType,
                medicalHistory: formData.medicalHistory,
                medicationsList: formData.medicationsList,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactPhone: formData.emergencyContactPhone,
                onboardingCompleted: true
            });
        } catch (error) {
            console.error("Error saving health profile:", error);
            alert("Failed to save your profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Height</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        name="height"
                                        placeholder="Height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    <select 
                                        name="heightUnit"
                                        value={formData.heightUnit}
                                        onChange={handleInputChange}
                                        className="w-24 px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="cm">cm</option>
                                        <option value="ft">ft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Weight</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        name="weight"
                                        placeholder="Weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    <select 
                                        name="weightUnit"
                                        value={formData.weightUnit}
                                        onChange={handleInputChange}
                                        className="w-24 px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Blood Type</label>
                            <select 
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                            >
                                <option value="">Select your Blood Type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Existing Medical Conditions</label>
                        <textarea 
                            name="medicalHistory"
                            placeholder="Please list any chronic conditions, allergies, or past surgeries..."
                            value={formData.medicalHistory}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Medications</label>
                        <textarea 
                            name="medicationsList"
                            placeholder="List any medications you are currently taking, including dosage..."
                            value={formData.medicationsList}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Name</label>
                                <input 
                                    type="text" 
                                    name="emergencyContactName"
                                    placeholder="Full Name"
                                    value={formData.emergencyContactName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Phone</label>
                                <input 
                                    type="tel" 
                                    name="emergencyContactPhone"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.emergencyContactPhone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Boticare App</h1>
            </div>

            <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
                {/* Header Section */}
                <div className="p-5 md:p-8 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Health Profile Setup</h2>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Please provide your basic health information for personalized experience</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-gray-50/50 dark:bg-gray-800/30 px-4 md:px-8 py-4 flex items-center justify-between overflow-x-auto no-scrollbar gap-2 md:gap-4">
                    {steps.map((s, index) => (
                        <button
                            key={s.id}
                            onClick={() => index < step && setStep(index)}
                            className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                                step === index 
                                    ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400 font-bold scale-105' 
                                    : index < step 
                                        ? 'text-green-500 dark:text-green-400' 
                                        : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <s.icon className={`w-4 md:w-5 h-4 md:h-5 ${step === index ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                            <span className="text-xs md:text-sm">{s.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-8 min-h-[350px] md:min-h-[400px]">
                    {renderStepContent()}
                    
                    <div className="mt-8 md:mt-12 flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={isLoading}
                            className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    {step === steps.length - 1 ? 'Complete Setup' : 'Next'}
                                    <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-5 md:p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        Your data is protected by HIPPA regulations and industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HealthProfileSetup;
