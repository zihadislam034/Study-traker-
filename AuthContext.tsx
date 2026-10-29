import React, { createContext, useContext, useEffect, useState } from 'react';
import { StudentProfile, UserAccount } from '../types';
import { StorageService } from '../services/storage';

export type ScreenState = 'welcome' | 'auth' | 'student_info' | 'inspiration' | 'main';

interface AuthContextType {
  user: UserAccount | null;
  currentScreen: ScreenState;
  setCurrentScreen: (screen: ScreenState) => void;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, emailOrPhone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: () => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  completeOnboarding: () => void;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => StorageService.getCurrentUser());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    const existing = StorageService.getCurrentUser();
    if (existing) {
      if (!existing.profile?.onboardingCompleted) {
        return 'student_info';
      }
      return 'main';
    }
    return 'welcome';
  });

  useEffect(() => {
    // Sync with storage
    StorageService.setCurrentUser(user);
  }, [user]);

  const login = async (emailOrPhone: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanId = emailOrPhone.trim().toLowerCase();
    const accounts = StorageService.getAccounts();
    const existing = accounts.find((a) => a.emailOrPhone.toLowerCase() === cleanId);

    if (!existing) {
      return { success: false, error: 'errInvalidCredentials' };
    }

    if (existing.passwordHash && existing.passwordHash !== pass) {
      return { success: false, error: 'errInvalidCredentials' };
    }

    setUser(existing);
    if (!existing.profile.onboardingCompleted) {
      setCurrentScreen('student_info');
    } else {
      setCurrentScreen('main');
    }
    return { success: true };
  };

  const signUp = async (name: string, emailOrPhone: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanId = emailOrPhone.trim().toLowerCase();
    const accounts = StorageService.getAccounts();
    if (accounts.some((a) => a.emailOrPhone.toLowerCase() === cleanId)) {
      return { success: false, error: 'errUserExists' };
    }

    const newId = `user_${Date.now()}`;
    const newAccount: UserAccount = {
      id: newId,
      emailOrPhone: cleanId,
      passwordHash: pass,
      profile: {
        fullName: name.trim(),
        department: 'Science',
        academicLevel: 'HSC 2nd Year',
        gender: 'Prefer not to say',
        institutionName: '',
        dailyGoalHours: 5,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      },
    };

    StorageService.saveAccount(newAccount);
    setUser(newAccount);
    setCurrentScreen('student_info');
    return { success: true };
  };

  const quickDemoLogin = () => {
    let demoUser = StorageService.getAccounts().find((a) => a.id === 'demo_student_tanvir');
    if (!demoUser) {
      demoUser = {
        id: 'demo_student_tanvir',
        emailOrPhone: 'student@focusforge.app',
        passwordHash: 'demo1234',
        profile: {
          fullName: 'তানভীর আহমেদ',
          department: 'Science',
          academicLevel: 'HSC 2nd Year',
          gender: 'Male',
          institutionName: 'ঢাকা রেসিডেন্সিয়াল মডেল কলেজ',
          academicBoard: 'Dhaka',
          targetGpa: 5.0,
          dailyGoalHours: 6,
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
        },
      };
      StorageService.saveAccount(demoUser);
    }
    // Seed initial user data if needed
    StorageService.getUserData(demoUser.id);
    setUser(demoUser);
    setCurrentScreen('main');
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    if (!user) return;
    const newProfile: StudentProfile = {
      ...user.profile,
      ...updated,
    };
    const updatedAccount: UserAccount = {
      ...user,
      profile: newProfile,
    };
    setUser(updatedAccount);
    StorageService.saveAccount(updatedAccount);

    // Also update profile in user store data
    const userData = StorageService.getUserData(user.id);
    userData.profile = newProfile;
    StorageService.saveUserData(user.id, userData);
  };

  const completeOnboarding = () => {
    if (!user) return;
    updateProfile({ onboardingCompleted: true });
    setCurrentScreen('inspiration');
  };

  const logout = () => {
    setUser(null);
    StorageService.setCurrentUser(null);
    setCurrentScreen('welcome');
  };

  const deleteAccount = () => {
    if (!user) return;
    StorageService.deleteUserAccount(user.id);
    setUser(null);
    setCurrentScreen('welcome');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentScreen,
        setCurrentScreen,
        login,
        signUp,
        quickDemoLogin,
        updateProfile,
        completeOnboarding,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
