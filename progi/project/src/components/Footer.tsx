import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О проекте */}
          <div>
            <h3 className="text-lg font-semibold mb-4">О проекте</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Интерактивный курс по архитектуре ЭВМ - современная образовательная платформа 
              для изучения устройства компьютеров.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/modules" className="text-gray-300 hover:text-white transition-colors">
                  Модули
                </Link>
              </li>
              <li>
                <Link to="/labs" className="text-gray-300 hover:text-white transition-colors">
                  Лабораторные
                </Link>
              </li>
              <li>
                <Link to="/tests" className="text-gray-300 hover:text-white transition-colors">
                  Тесты
                </Link>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Помощь
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Обратная связь
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@architecture-course.com</p>
              <p>Телефон: +7 (123) 456-78-90</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Интерактивный курс по архитектуре ЭВМ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}