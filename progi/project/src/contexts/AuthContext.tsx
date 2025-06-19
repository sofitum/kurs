import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  registrationDate: string;
  course?: string;
  group?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  uploadAvatar: (file: File) => Promise<string>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  course?: string;
  group?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Симуляция входа
    const mockUser: User = {
      id: '1',
      name: 'Александр Смирнов',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      bio: 'Студент 3 курса, изучаю архитектуру ЭВМ',
      registrationDate: new Date().toISOString(),
      course: '3',
      group: 'ВМК-301'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      bio: '',
      registrationDate: new Date().toISOString(),
      course: userData.course,
      group: userData.group
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    // Симуляция загрузки файла - в реальном приложении здесь был бы запрос к серверу
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      uploadAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}