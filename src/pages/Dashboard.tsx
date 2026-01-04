import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import HeroCard from '../components/dashboard/HeroCard';
import ExamGrid from '../components/dashboard/ExamGrid';
import MarketplaceSection from '../components/dashboard/MarketplaceSection';

// ============================================================
// MOCK DATA CONFIGURATION
// ============================================================
// For testing purposes, you can manually toggle this:
// - Set to `true` to force the populated state with exam cards
// - Set to `false` to force the empty state (new user)
// - Set to `null` to use automatic detection based on user data
const FORCE_STATE: boolean | null = false; // null = auto-detect
// ============================================================

// Mock exams data for users who have registered
const registeredExams = [
  {
    id: '1',
    title: 'UTBK #1',
    dateRange: '10 - 15 Oktober 2025',
    duration: '155 menit',
    daysLeft: 1,
    variant: 'yellow' as const,
  },
  {
    id: '2',
    title: 'UTBK #3',
    dateRange: '10 - 15 Oktober 2025',
    duration: '155 menit',
    daysLeft: 3,
    variant: 'blue' as const,
  },
  {
    id: '3',
    title: 'UTBK #13',
    dateRange: '10 - 15 Oktober 2025',
    duration: '155 menit',
    daysLeft: 20,
    variant: 'yellow' as const,
  },
  {
    id: '4',
    title: 'UTBK #17',
    dateRange: '10 - 15 Oktober 2025',
    duration: '155 menit',
    daysLeft: 22,
    variant: 'blue' as const,
  },
];

// Mock packages data for marketplace section
const mockPackages = [
  {
    id: '1',
    name: 'Paket Try Out Gratis',
    title: 'Try-Out UTBK #1',
    originalPrice: 50000,
    discountedPrice: 0,
    dateRange: '10 - 15 Oktober 2025',
  },
  {
    id: '2',
    name: 'Paket Silver UTBK',
    title: 'Try-Out UTBK #2',
    originalPrice: 35000,
    discountedPrice: 15000,
    description: '1 paket Try Out UTBK',
  },
  {
    id: '3',
    name: 'Paket Gold UTBK',
    title: 'Try-Out UTBK #3',
    originalPrice: 50000,
    discountedPrice: 35000,
    description: '3 paket Try Out UTBK',
  },
];

// Hero card data for the ongoing try out section
const heroData = {
  title: 'Try Out Gratis #1',
  dateRange: '10 Oktober 2025 - 15 Oktober 2025',
  duration: '155 menit',
  progress: 0,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  // Determine if user has registered exams
  // For now, we use a simple check: new users (first login) show empty state
  // In production, this would come from an API call to check user's registered exams
  const [userExams, setUserExams] = useState<typeof registeredExams>([]);
  const [hasCheckedExams, setHasCheckedExams] = useState(false);

  useEffect(() => {
    // Simulate checking if user has registered exams
    // In production, replace this with an API call like: api.getUserExams()
    const checkUserExams = () => {
      if (FORCE_STATE !== null) {
        // Use forced state for testing
        setUserExams(FORCE_STATE ? registeredExams : []);
      } else {
        // Auto-detect: New users (created recently) start with empty state
        // Users with some activity get the populated state
        // For demo: Check if user account is older than 1 minute
        if (user?.created_at) {
          const createdAt = new Date(user.created_at);
          const now = new Date();
          const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
          
          // If account is less than 1 minute old, show empty state (new user)
          // Otherwise show populated state (returning user)
          setUserExams(diffMinutes < 1 ? [] : registeredExams);
        } else {
          // Default to empty for new users
          setUserExams([]);
        }
      }
      setHasCheckedExams(true);
    };

    if (user && !hasCheckedExams) {
      checkUserExams();
    }
  }, [user, hasCheckedExams]);

  // Determine display state
  const hasExams = userExams.length > 0;

  // Handler for "Daftar Sekarang" button in hero card
  const handleRegister = () => {
    console.log('Register clicked');
    // TODO: Navigate to registration or open modal
  };

  // Handler for "Mulai Kerjakan" button on exam cards
  const handleStartExam = (examId: string) => {
    console.log('Starting exam:', examId);
    // TODO: Navigate to exam page
    // navigate(`/exam/${examId}`);
  };

  // Handler for "Daftar" button on package cards
  const handlePackageRegister = (packageId: string) => {
    console.log('Registering for package:', packageId);
    // TODO: Navigate to payment or registration
    // navigate(`/package/${packageId}/register`);
  };

  // Show loading state while checking auth
  if (isLoading || !hasCheckedExams) {
    return (
      <div className="min-h-screen bg-primary-light/30">
        <DashboardNavbar />
        <main className="container mx-auto px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-text">Memuat dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-light/30">
      <DashboardNavbar />

      <main className="container mx-auto px-6 py-8 space-y-10">
        {/* Section 1: Hero Card - Try Out Berlangsung */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-2">Try Out Berlangsung</h2>
          <p className="text-neutral-text mb-6">
            Segera selesaikan try out minggu ini!
          </p>
          <HeroCard
            title={heroData.title}
            dateRange={heroData.dateRange}
            duration={heroData.duration}
            progress={heroData.progress}
            onRegister={handleRegister}
          />
        </section>

        {/* Section 2: User's Exams - Paket Kamu/Saya */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">
            {hasExams ? 'Paket Kamu' : 'Paket Saya'}
          </h2>
          <ExamGrid
            exams={userExams}
            onStartExam={handleStartExam}
            onRegister={handleRegister}
          />
        </section>

        {/* Section 3: Marketplace - Try Out yang tersedia */}
        <MarketplaceSection
          packages={mockPackages}
          onRegister={handlePackageRegister}
        />
      </main>
    </div>
  );
};

export default Dashboard;
