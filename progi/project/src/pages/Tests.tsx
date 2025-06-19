import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, Trophy } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function Tests() {
  const { progress, getModuleProgress } = useProgress();

  const tests = [
    {
      id: 'intro',
      title: 'Введение в архитектуру ЭВМ',
      questions: 5,
      timeLimit: '10 мин',
      difficulty: 'Начальный'
    },
    {
      id: 'analog-digital',
      title: 'Аналоговые и цифровые вычислители',
      questions: 5,
      timeLimit: '10 мин',
      difficulty: 'Начальный'
    },
    {
      id: 'hierarchy',
      title: 'Иерархическая организация компьютера',
      questions: 5,
      timeLimit: '12 мин',
      difficulty: 'Средний'
    },
    {
      id: 'architecture-organization',
      title: 'Архитектура и организация компьютера',
      questions: 5,
      timeLimit: '12 мин',
      difficulty: 'Средний'
    },
    {
      id: 'digital-elements',
      title: 'Элементы и узлы цифрового компьютера',
      questions: 5,
      timeLimit: '15 мин',
      difficulty: 'Средний'
    },
    {
      id: 'cpu',
      title: 'Центральный процессор',
      questions: 5,
      timeLimit: '15 мин',
      difficulty: 'Продвинутый'
    },
    {
      id: 'memory',
      title: 'Запоминающие устройства',
      questions: 5,
      timeLimit: '15 мин',
      difficulty: 'Продвинутый'
    },
    {
      id: 'computing-systems',
      title: 'Вычислительные системы',
      questions: 5,
      timeLimit: '18 мин',
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

  const getTestStatus = (testId: string) => {
    const moduleProgress = getModuleProgress(testId);
    
    if (!moduleProgress.lectureCompleted) {
      return { 
        icon: Clock, 
        color: 'text-gray-400', 
        text: 'Недоступен',
        description: 'Сначала изучите лекцию'
      };
    } else if (moduleProgress.testCompleted) {
      return { 
        icon: CheckCircle, 
        color: 'text-green-600', 
        text: 'Завершен',
        description: `Результат: ${moduleProgress.testScore}%`
      };
    } else {
      return { 
        icon: FileText, 
        color: 'text-blue-600', 
        text: 'Доступен',
        description: 'Готов к прохождению'
      };
    }
  };

  const getOverallStats = () => {
    const completedTests = progress.filter(p => p.testCompleted).length;
    const totalTests = tests.length;
    const averageScore = progress
      .filter(p => p.testScore !== undefined)
      .reduce((sum, p) => sum + (p.testScore || 0), 0) / Math.max(1, progress.filter(p => p.testScore !== undefined).length);

    return { completedTests, totalTests, averageScore: Math.round(averageScore) };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Тесты и задания
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Проверьте свои знания с помощью интерактивных тестов по каждому модулю курса
            </p>
          </div>

          {/* Общая статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.completedTests}/{stats.totalTests}
              </div>
              <div className="text-gray-600">Тестов завершено</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-green-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.averageScore || 0}%
              </div>
              <div className="text-gray-600">Средний балл</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Math.round((stats.completedTests / stats.totalTests) * 100)}%
              </div>
              <div className="text-gray-600">Прогресс</div>
            </div>
          </div>

          {/* Список тестов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const status = getTestStatus(test.id);
              const moduleProgress = getModuleProgress(test.id);
              const StatusIcon = status.icon;

              return (
                <div 
                  key={test.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Заголовок и статус */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                        {test.title}
                      </h3>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <div className="flex items-center space-x-1">
                          <StatusIcon size={16} className={status.color} />
                          <span className={`text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Метаданные теста */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Вопросов: {test.questions}</span>
                        <span>Время: {test.timeLimit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                          {test.difficulty}
                        </span>
                        {moduleProgress.testScore && (
                          <span className={`text-sm font-semibold ${
                            moduleProgress.testScore >= 90 ? 'text-green-600' :
                            moduleProgress.testScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {moduleProgress.testScore}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Описание статуса */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">{status.description}</p>
                    </div>

                    {/* Кнопка действия */}
                    <div className="flex space-x-2">
                      {moduleProgress.lectureCompleted ? (
                        <Link
                          to={`/test/${test.id}`}
                          className={`flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${
                            moduleProgress.testCompleted
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {moduleProgress.testCompleted ? 'Пройти еще раз' : 'Начать тест'}
                        </Link>
                      ) : (
                        <div className="flex-1">
                          <Link
                            to={`/lecture/${test.id}`}
                            className="block w-full py-2 px-4 rounded-lg text-center text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                          >
                            Изучить лекцию
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Информационный блок */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 Рекомендации по прохождению тестов
            </h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Внимательно изучите лекционный материал перед прохождением теста</li>
              <li>• Для получения отличной оценки необходимо набрать 90% и выше</li>
              <li>• Тесты можно проходить несколько раз для улучшения результата</li>
              <li>• Обращайте внимание на объяснения к неправильным ответам</li>
              <li>• Ваш лучший результат автоматически сохраняется в профиле</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}