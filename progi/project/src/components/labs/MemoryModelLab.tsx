import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

interface MemoryLevel {
  name: string;
  size: string;
  accessTime: string;
  cost: string;
  color: string;
  utilization: number;
}

export default function MemoryModelLab() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [accessPattern, setAccessPattern] = useState<string>('sequential');
  const [currentAccess, setCurrentAccess] = useState<number>(-1);
  const [stats, setStats] = useState({
    totalAccesses: 0,
    cacheHits: 0,
    cacheMisses: 0,
    averageTime: 0
  });

  const memoryLevels: MemoryLevel[] = [
    {
      name: 'Регистры',
      size: '1 КБ',
      accessTime: '0.5 нс',
      cost: 'Очень высокая',
      color: 'bg-red-500',
      utilization: 0
    },
    {
      name: 'Кэш L1',
      size: '64 КБ',
      accessTime: '1 нс',
      cost: 'Высокая',
      color: 'bg-orange-500',
      utilization: 0
    },
    {
      name: 'Кэш L2',
      size: '256 КБ',
      accessTime: '4 нс',
      cost: 'Средняя',
      color: 'bg-yellow-500',
      utilization: 0
    },
    {
      name: 'Кэш L3',
      size: '8 МБ',
      accessTime: '12 нс',
      cost: 'Средняя',
      color: 'bg-green-500',
      utilization: 0
    },
    {
      name: 'ОЗУ',
      size: '16 ГБ',
      accessTime: '60 нс',
      cost: 'Низкая',
      color: 'bg-blue-500',
      utilization: 0
    },
    {
      name: 'SSD',
      size: '1 ТБ',
      accessTime: '100 мкс',
      cost: 'Очень низкая',
      color: 'bg-purple-500',
      utilization: 0
    }
  ];

  const [levels, setLevels] = useState(memoryLevels);

  const simulateMemoryAccess = async () => {
    setIsSimulating(true);
    setStats({ totalAccesses: 0, cacheHits: 0, cacheMisses: 0, averageTime: 0 });

    const accessCount = 20;
    let totalTime = 0;
    let hits = 0;
    let misses = 0;

    for (let i = 0; i < accessCount; i++) {
      setCurrentAccess(i);
      
      // Симулируем поиск данных в иерархии памяти
      let found = false;
      let accessTime = 0;
      
      for (let levelIndex = 0; levelIndex < levels.length; levelIndex++) {
        setLevels(prev => prev.map((level, idx) => ({
          ...level,
          utilization: idx === levelIndex ? 100 : level.utilization
        })));

        await new Promise(resolve => setTimeout(resolve, 300));

        // Вероятность нахождения данных зависит от уровня и паттерна доступа
        let hitProbability = 0;
        
        switch (accessPattern) {
          case 'sequential':
            hitProbability = levelIndex === 0 ? 0.9 : levelIndex === 1 ? 0.8 : 0.3;
            break;
          case 'random':
            hitProbability = levelIndex === 0 ? 0.1 : levelIndex === 1 ? 0.2 : 0.4;
            break;
          case 'locality':
            hitProbability = levelIndex === 0 ? 0.95 : levelIndex === 1 ? 0.85 : 0.5;
            break;
        }

        if (Math.random() < hitProbability || levelIndex === levels.length - 1) {
          found = true;
          accessTime = parseFloat(levels[levelIndex].accessTime);
          
          if (levelIndex <= 2) { // Кэш-попадание
            hits++;
          } else { // Кэш-промах
            misses++;
          }
          break;
        }
      }

      totalTime += accessTime;
      
      setStats({
        totalAccesses: i + 1,
        cacheHits: hits,
        cacheMisses: misses,
        averageTime: totalTime / (i + 1)
      });

      // Сброс подсветки
      setLevels(prev => prev.map(level => ({ ...level, utilization: 0 })));
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setCurrentAccess(-1);
    setIsSimulating(false);
  };

  const reset = () => {
    setLevels(memoryLevels);
    setCurrentAccess(-1);
    setStats({ totalAccesses: 0, cacheHits: 0, cacheMisses: 0, averageTime: 0 });
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Настройки симуляции */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки симуляции</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Паттерн доступа к памяти:
          </label>
          <select
            value={accessPattern}
            onChange={(e) => setAccessPattern(e.target.value)}
            disabled={isSimulating}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sequential">Последовательный доступ</option>
            <option value="random">Случайный доступ</option>
            <option value="locality">Локальность данных</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={simulateMemoryAccess}
            disabled={isSimulating}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Play size={16} />
            <span>Запустить симуляцию</span>
          </button>
          
          <button
            onClick={reset}
            disabled={isSimulating}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={16} />
            <span>Сброс</span>
          </button>
        </div>
      </div>

      {/* Иерархия памяти */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Иерархия памяти</h3>
        
        <div className="space-y-4">
          {levels.map((level, index) => (
            <div key={level.name} className="relative">
              {/* Стрелка между уровнями */}
              {index < levels.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 z-10">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              )}
              
              <div className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                level.utilization > 0 ? 'border-yellow-400 shadow-lg' : 'border-gray-200'
              }`}>
                {/* Индикатор активности */}
                {level.utilization > 0 && (
                  <div className="absolute top-2 right-2">
                    <Zap className="text-yellow-500 animate-pulse" size={20} />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{level.name}</h4>
                    <div className={`w-full h-2 rounded-full mt-2 ${level.color} opacity-70`}></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Объем</div>
                    <div className="font-semibold">{level.size}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Время доступа</div>
                    <div className="font-semibold">{level.accessTime}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Стоимость</div>
                    <div className="font-semibold">{level.cost}</div>
                  </div>
                </div>
                
                {/* Полоса загрузки */}
                {level.utilization > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${level.utilization}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      {stats.totalAccesses > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Статистика симуляции</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded border">
              <div className="text-2xl font-bold text-blue-600">{stats.totalAccesses}</div>
              <div className="text-sm text-gray-600">Всего обращений</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="text-2xl font-bold text-green-600">{stats.cacheHits}</div>
              <div className="text-sm text-gray-600">Попадания в кэш</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="text-2xl font-bold text-red-600">{stats.cacheMisses}</div>
              <div className="text-sm text-gray-600">Промахи кэша</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="text-2xl font-bold text-purple-600">
                {stats.averageTime.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Среднее время (нс)</div>
            </div>
          </div>
          
          {stats.totalAccesses > 0 && (
            <div className="mt-4 text-center">
              <div className="text-lg">
                Эффективность кэша: {' '}
                <span className="font-bold text-blue-600">
                  {((stats.cacheHits / stats.totalAccesses) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Информация о паттернах доступа */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Паттерны доступа к памяти:</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li><strong>Последовательный:</strong> Данные читаются подряд, высокая эффективность кэша</li>
          <li><strong>Случайный:</strong> Произвольный доступ к данным, низкая эффективность кэша</li>
          <li><strong>Локальность данных:</strong> Повторное обращение к недавно использованным данным</li>
        </ul>
      </div>
    </div>
  );
}