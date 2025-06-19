import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function Modules() {
  const { getModuleProgress } = useProgress();

  const modules = [
    {
      id: 'intro',
      title: 'Введение в архитектуру ЭВМ',
      description: 'Основные понятия и термины архитектуры ЭВМ. История развития вычислительной техники. Классификация компьютеров.',
      duration: '45 мин',
      difficulty: 'Начальный'
    },
    {
      id: 'analog-digital',
      title: 'Аналоговые и цифровые вычислители',
      description: 'Принципы работы аналоговых и цифровых вычислительных устройств. Сравнение подходов и областей применения.',
      duration: '60 мин',
      difficulty: 'Начальный'
    },
    {
      id: 'hierarchy',
      title: 'Иерархическая организация компьютера',
      description: 'Уровни иерархии компьютерных систем. Взаимодействие аппаратного и программного обеспечения.',
      duration: '50 мин',
      difficulty: 'Средний'
    },
    {
      id: 'architecture-organization',
      title: 'Архитектура и организация компьютера',
      description: 'Различия между архитектурой и организацией компьютера. Основные компоненты и их взаимодействие.',
      duration: '55 мин',
      difficulty: 'Средний'
    },
    {
      id: 'digital-elements',
      title: 'Элементы и узлы цифрового компьютера',
      description: 'Логические элементы, регистры, счетчики, дешифраторы. Принципы построения цифровых устройств.',
      duration: '70 мин',
      difficulty: 'Средний'
    },
    {
      id: 'cpu',
      title: 'Центральный процессор',
      description: 'Архитектура CPU, принципы конвейеризации команд, параллелизм на уровне инструкций.',
      duration: '80 мин',
      difficulty: 'Продвинутый'
    },
    {
      id: 'memory',
      title: 'Запоминающие устройства',
      description: 'Иерархия памяти, работа кэшей, виртуальная память и методы оптимизации доступа.',
      duration: '75 мин',
      difficulty: 'Продвинутый'
    },
    {
      id: 'computing-systems',
      title: 'Вычислительные системы',
      description: 'Многопроцессорные системы, кластеры, распределенные вычисления. Современные архитектуры.',
      duration: '90 мин',
      difficulty: 'Продвинутый'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Начальный': return 'bg-green-100 text-green-800';
      case 'Средний': return 'bg-yellow-100 text-yellow-800';
      case 'Продвинутый': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleStatus = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    if (progress.lectureCompleted && progress.testCompleted) {
      return { icon: CheckCircle, color: 'text-green-600', text: 'Завершен' };
    } else if (progress.lectureCompleted || progress.testCompleted) {
      return { icon: Clock, color: 'text-yellow-600', text: 'В процессе' };
    } else {
      return { icon: BookOpen, color: 'text-gray-400', text: 'Не начат' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Учебные модули
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Изучите архитектуру компьютеров от основ до современных технологий. 
              Каждый модуль включает теоретическую лекцию и практический тест.
            </p>
          </div>

          {/* Сетка модулей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => {
              const status = getModuleStatus(module.id);
              const progress = getModuleProgress(module.id);
              const progressPercentage = (
                (progress.lectureCompleted ? 50 : 0) + 
                (progress.testCompleted ? 50 : 0)
              );

              return (
                <div 
                  key={module.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Заголовок и статус */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {module.title}
                      </h3>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <div className="flex items-center space-x-1">
                          <status.icon size={16} className={status.color} />
                          <span className={`text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {module.description}
                    </p>

                    {/* Метаданные */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {module.duration}
                      </span>
                    </div>

                    {/* Прогресс бар */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Прогресс</span>
                        <span className="text-xs font-medium text-gray-700">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/lecture/${module.id}`}
                        className={`flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${
                          progress.lectureCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {progress.lectureCompleted ? '✓ Лекция' : 'Лекция'}
                      </Link>
                      <Link
                        to={`/test/${module.id}`}
                        className={`flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${
                          progress.testCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : progress.lectureCompleted
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={(e) => {
                          if (!progress.lectureCompleted) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {progress.testCompleted ? '✓ Тест' : 'Тест'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Информационный блок */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 Как проходить курс
            </h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Начните с изучения лекции по выбранному модулю</li>
              <li>• После завершения лекции станет доступен тест</li>
              <li>• Для получения максимального балла рекомендуется набрать 90% и выше</li>
              <li>• Ваш прогресс автоматически сохраняется в профиле</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}