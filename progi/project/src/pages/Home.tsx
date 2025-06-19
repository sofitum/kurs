import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Monitor, Zap, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Интерактивный курс по архитектуре ЭВМ
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Освойте устройство компьютера через практические задания, симуляторы и интерактивные лекции. 
              Идеально для студентов и начинающих IT-специалистов.
            </p>
            <Link 
              to="/modules"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Начать обучение
            </Link>
          </div>

          {/* Анимированная схема архитектуры */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="grid grid-cols-2 gap-8 relative">
                {/* CPU */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center animate-pulse-slow">
                  <Cpu size={32} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">CPU</div>
                </div>

                {/* Memory */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center animate-pulse-slow delay-200">
                  <Monitor size={32} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">Memory</div>
                </div>

                {/* I/O */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center animate-pulse-slow delay-400">
                  <Zap size={32} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">I/O</div>
                </div>

                {/* Bus */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center animate-pulse-slow delay-600">
                  <Users size={32} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">Bus</div>
                </div>

                {/* Соединительные линии */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <line 
                      x1="50%" y1="25%" 
                      x2="50%" y2="75%" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeOpacity="0.5"
                      className="animate-pulse"
                    />
                    <line 
                      x1="25%" y1="50%" 
                      x2="75%" y2="50%" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeOpacity="0.5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Особенности курса
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Cpu className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Интерактивные лекции</h3>
              <p className="text-gray-600">
                Подробные материалы с анимациями и интерактивными элементами
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Monitor className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Симуляторы</h3>
              <p className="text-gray-600">
                Практические задания с симуляторами процессора и сборки ПК
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Zap className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Тестирование</h3>
              <p className="text-gray-600">
                Проверка знаний с детальной обратной связью и объяснениями
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Отслеживание прогресса</h3>
              <p className="text-gray-600">
                Персональный профиль с детальной статистикой обучения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы изучить архитектуру компьютеров?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам студентов, которые уже изучают современные технологии
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/modules"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Начать изучение
            </Link>
            <Link 
              to="/labs"
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Попробовать лабораторные
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}