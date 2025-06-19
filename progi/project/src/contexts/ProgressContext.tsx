import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ModuleProgress {
  moduleId: string;
  lectureCompleted: boolean;
  testScore?: number;
  testCompleted: boolean;
  completionDate?: string;
}

interface ProgressContextType {
  progress: ModuleProgress[];
  updateProgress: (moduleId: string, updates: Partial<ModuleProgress>) => void;
  getModuleProgress: (moduleId: string) => ModuleProgress;
  getOverallProgress: () => number;
  getCompletedModules: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ModuleProgress[]>([]);

  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`progress_${user.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        // Инициализируем прогресс для всех модулей
        const initialProgress = [
          'intro',
          'analog-digital',
          'hierarchy',
          'architecture-organization',
          'digital-elements',
          'cpu',
          'memory',
          'computing-systems'
        ].map(id => ({
          moduleId: id,
          lectureCompleted: false,
          testCompleted: false
        }));
        setProgress(initialProgress);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && progress.length > 0) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(progress));
    }
  }, [progress, user]);

  const updateProgress = (moduleId: string, updates: Partial<ModuleProgress>) => {
    setProgress(prev => {
      const existingIndex = prev.findIndex(p => p.moduleId === moduleId);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...updates };
        return updated;
      } else {
        return [...prev, { moduleId, lectureCompleted: false, testCompleted: false, ...updates }];
      }
    });
  };

  const getModuleProgress = (moduleId: string): ModuleProgress => {
    return progress.find(p => p.moduleId === moduleId) || {
      moduleId,
      lectureCompleted: false,
      testCompleted: false
    };
  };

  const getOverallProgress = (): number => {
    if (progress.length === 0) return 0;
    
    const completedModules = progress.filter(p => p.lectureCompleted && p.testCompleted).length;
    return Math.round((completedModules / progress.length) * 100);
  };

  const getCompletedModules = (): number => {
    return progress.filter(p => p.lectureCompleted && p.testCompleted).length;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      getModuleProgress,
      getOverallProgress,
      getCompletedModules
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}