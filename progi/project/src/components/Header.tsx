import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/modules', label: 'Модули' },
    { path: '/labs', label: 'Лабораторные' },
    { path: '/tests', label: 'Тесты' }
  ];

  const handleProfileClick = () => {
    if (user) {
      // Если пользователь авторизован, переходим в профиль (через Link)
      return;
    } else {
      // Если не авторизован, открываем модальное окно
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-slate-800 text-white z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Логотип */}
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Архитектура ЭВМ
            </Link>

            {/* Навигация для десктопа */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors relative ${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-white hover:text-blue-400'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Профиль/Авторизация */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogIn size={16} />
                  <span>Войти</span>
                </button>
              )}
            </div>

            {/* Мобильное меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Мобильная навигация */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-700 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-2 hover:bg-slate-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="border-t border-slate-600 mt-4 pt-4">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-slate-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-600 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-600 mt-4 pt-4">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 hover:bg-slate-600 transition-colors"
                  >
                    Войти / Регистрация
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Модальное окно авторизации */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}