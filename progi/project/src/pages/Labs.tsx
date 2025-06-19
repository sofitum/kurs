import React, { useState } from 'react';
import { Cpu, Monitor, Zap, HardDrive } from 'lucide-react';
import PCBuilderLab from '../components/labs/PCBuilderLab';
import CPUSimulatorLab from '../components/labs/CPUSimulatorLab';
import LogicCircuitsLab from '../components/labs/LogicCircuitsLab';
import MemoryModelLab from '../components/labs/MemoryModelLab';

export default function Labs() {
  const [activeTab, setActiveTab] = useState('pc-builder');

  const labs = [
    {
      id: 'pc-builder',
      title: 'Сборка ПК',
      description: 'Интерактивный симулятор сборки компьютера',
      icon: Monitor,
      component: PCBuilderLab
    },
    {
      id: 'cpu-simulator',
      title: 'Симулятор CPU',
      description: 'Изучение работы процессора и ассемблера',
      icon: Cpu,
      component: CPUSimulatorLab
    },
    {
      id: 'logic-circuits',
      title: 'Логические схемы',
      description: 'Создание и анализ цифровых схем',
      icon: Zap,
      component: LogicCircuitsLab
    },
    {
      id: 'memory-model',
      title: 'Модель памяти',
      description: 'Изучение иерархии памяти компьютера',
      icon: HardDrive,
      component: MemoryModelLab
    }
  ];

  const ActiveComponent = labs.find(lab => lab.id === activeTab)?.component || PCBuilderLab;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Лабораторные работы
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Практические задания с интерактивными симуляторами для изучения архитектуры компьютеров
            </p>
          </div>

          {/* Табы */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {labs.map((lab) => {
              const IconComponent = lab.icon;
              return (
                <button
                  key={lab.id}
                  onClick={() => setActiveTab(lab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === lab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{lab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Описание активной лабораторной */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              {React.createElement(labs.find(lab => lab.id === activeTab)?.icon || Monitor, {
                size: 24,
                className: "text-blue-600"
              })}
              <h2 className="text-2xl font-semibold text-gray-900">
                {labs.find(lab => lab.id === activeTab)?.title}
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              {labs.find(lab => lab.id === activeTab)?.description}
            </p>
          </div>

          {/* Активная лабораторная работа */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}