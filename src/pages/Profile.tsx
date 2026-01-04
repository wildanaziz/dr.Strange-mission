import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import SchoolInfoSection from '../components/profile/SchoolInfoSection';
import UniversityChoices from '../components/profile/UniversityChoices';
import PasswordSection from '../components/profile/PasswordSection';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || 'Laksana Aura Ibrahim',
    username: 'laksantuygegeming',
    email: user?.email || 'laksanaaura@gmail.com',
    phone: '081234567890',
    gender: 'Laki-laki',
    grade: '12',
  });

  // School Information State
  const [schoolInfo, setSchoolInfo] = useState({
    province: 'Jawa Timur',
    city: 'Kota Malang',
    school: 'SMA Wibu Jaya',
    curriculum: 'Merdeka',
    major: 'IPA',
  });

  // University Choices State
  const [universityChoices, setUniversityChoices] = useState({
    choice1: {
      university: 'INSTITUT TEKNOLOGI BANDUNG',
      major: 'Fakultas Teknik Mesin dan Dirgantara',
    },
    choice2: {
      university: 'UNIVERSITAS BRAWIJAYA',
      major: 'Teknik Komputer',
    },
  });

  // Loading state for save operation
  const [isSaving, setIsSaving] = useState(false);

  // Handler for personal info changes
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for school info changes
  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for university choices changes
  const handleUniversityChange = (
    choice: 'choice1' | 'choice2',
    field: 'university' | 'major',
    value: string
  ) => {
    setUniversityChoices((prev) => ({
      ...prev,
      [choice]: { ...prev[choice], [field]: value },
    }));
  };

  // Handler for password change
  const handlePasswordChange = (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    // TODO: Implement password change logic with API
    console.log('Password change requested');
  };

  // Handler for avatar edit
  const handleEditAvatar = () => {
    // TODO: Implement avatar upload logic
    console.log('Edit avatar clicked');
  };

  // Handler for logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handler for saving profile
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement save logic with API
      console.log('Saving profile...', {
        personalInfo,
        schoolInfo,
        universityChoices,
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message or notification
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <DashboardNavbar />

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          {/* Profile Header with Avatar */}
          <ProfileHeader
            name={personalInfo.fullName.split(' ').slice(0, 2).join(' ')}
            major={universityChoices.choice2.major}
            university="Universitas Brawijaya"
            onEditAvatar={handleEditAvatar}
          />

          {/* Personal Information Form */}
          <PersonalInfoForm
            data={personalInfo}
            onChange={handlePersonalInfoChange}
          />

          {/* School Information Section */}
          <SchoolInfoSection
            data={schoolInfo}
            onChange={handleSchoolInfoChange}
          />

          {/* University Choices */}
          <UniversityChoices
            choice1={universityChoices.choice1}
            choice2={universityChoices.choice2}
            onChange={handleUniversityChange}
          />

          {/* Change Password Section */}
          <PasswordSection onPasswordChange={handlePasswordChange} />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-4 text-primary hover:bg-primary-light/50 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar Akun</span>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
