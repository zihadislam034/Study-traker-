import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { WelcomePage } from './pages/WelcomePage';
import { AuthPage } from './pages/AuthPage';
import { StudentOnboardingPage } from './pages/StudentOnboardingPage';
import { InspirationPage } from './pages/InspirationPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlannerPage } from './pages/PlannerPage';
import { FocusPage } from './pages/FocusPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { BottomNav, TabType } from './components/common/BottomNav';
import { Header } from './components/common/Header';
import { StorageService } from './services/storage';
import { InstallAppModal } from './components/common/InstallAppModal';

const MainAppContent: React.FC = () => {
  const { user, currentScreen, setCurrentScreen } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const forceRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    const handleStorageUpdate = () => {
      forceRefresh();
    };
    window.addEventListener('focusforge_storage_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('focusforge_storage_updated', handleStorageUpdate);
    };
  }, []);

  // Screen routing for onboarding / auth journey
  if (currentScreen === 'welcome') {
    return (
      <>
        <WelcomePage onOpenInstallModal={() => setIsInstallModalOpen(true)} />
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </>
    );
  }

  if (currentScreen === 'auth') {
    return (
      <>
        <AuthPage />
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </>
    );
  }

  if (currentScreen === 'student_info') {
    return <StudentOnboardingPage />;
  }

  if (currentScreen === 'inspiration') {
    return <InspirationPage />;
  }

  // Returning or completed authenticated users
  if (!user) {
    return (
      <>
        <WelcomePage onOpenInstallModal={() => setIsInstallModalOpen(true)} />
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </>
    );
  }

  const userData = StorageService.getUserData(user.id);
  const analytics = StorageService.getAnalytics(user.id);
  const todayStr = new Date().toISOString().split('T')[0];
  const pendingTasksCount = userData.tasks.filter((t) => t.scheduledDate === todayStr && !t.completed).length;

  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#f3f4f6] flex flex-col selection:bg-amber-400/30 selection:text-amber-300">
      {/* Top Header */}
      <Header
        onOpenSettings={() => setCurrentTab('settings' as TabType)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        streakCount={analytics.streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4 pb-20">
        {currentTab === 'home' && (
          <DashboardPage
            key={refreshKey}
            onNavigateTab={setCurrentTab}
            onOpenSettings={() => setCurrentTab('settings' as TabType)}
            onDataChanged={forceRefresh}
          />
        )}

        {currentTab === 'planner' && (
          <PlannerPage key={refreshKey} onDataChanged={forceRefresh} />
        )}

        {currentTab === 'focus' && (
          <FocusPage key={refreshKey} onDataChanged={forceRefresh} />
        )}

        {currentTab === 'progress' && (
          <ProgressPage key={refreshKey} onDataChanged={forceRefresh} />
        )}

        {currentTab === 'subjects' && (
          <SubjectsPage key={refreshKey} onDataChanged={forceRefresh} />
        )}

        {currentTab === ('settings' as TabType) && (
          <SettingsPage
            key={refreshKey}
            onDataChanged={forceRefresh}
            onOpenInspiration={() => setCurrentScreen('inspiration')}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingTasksCount={pendingTasksCount}
      />

      {/* Android APK / App Install Dialog */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
