import React from 'react';
import { BookOpen, Calendar, CheckSquare, Flame, Home, Timer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type TabType = 'home' | 'planner' | 'focus' | 'progress' | 'subjects';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  pendingTasksCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount = 0,
}) => {
  const { t } = useLanguage();

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: t.home,
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'planner',
      label: t.planner,
      icon: <CheckSquare className="w-5 h-5" />,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      id: 'focus',
      label: t.focus,
      icon: <Timer className="w-5 h-5" />,
    },
    {
      id: 'progress',
      label: t.progress,
      icon: <Flame className="w-5 h-5" />,
    },
    {
      id: 'subjects',
      label: t.subjects,
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f15]/95 backdrop-blur-lg border-t border-[#1e2330] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-gray-400 hover:text-gray-200 font-medium'
              }`}
            >
              {/* Highlight background pill for active state */}
              {isActive && (
                <span className="absolute inset-0 bg-amber-400/10 rounded-xl border border-amber-400/20 -z-10" />
              )}

              <div className="relative">
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[9px] font-black leading-tight shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
