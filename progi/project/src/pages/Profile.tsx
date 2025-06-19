import React, { useState, useRef } from 'react';
import { User, Calendar, BookOpen, Trophy, Edit3, Upload, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

export default function Profile() {
  const { user, updateProfile, uploadAvatar } = useAuth();
  const { progress, getOverallProgress, getCompletedModules } = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    university: user?.university || '',
    course: user?.course || '',
    group: user?.group || ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const moduleNames = {
    intro: 'Введение в архитектуру ЭВМ',
    'analog-digital': 'Аналоговые и цифровые вычислители',
    hierarchy: 'Иерархическая организация компьютера',
    'architecture-organization': 'Архитектура и организация компьютера',
    'digital-elements': 'Элементы и узлы цифрового компьютера',
    cpu: 'Центральный процессор',
    memory: 'Запоминающие устройства',
    'computing-systems': 'Вычислительные системы'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const avatarUrl = await uploadAvatar(file);
        updateProfile({ avatar: avatarUrl });
      } catch (error) {
        console.error('Ошибка загрузки аватара:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Боковая панель с информацией о пользователе */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {/* Аватар */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div 
                    className="w-32 h-32 rounded-full overflow-hidden mx-auto cursor-pointer group"
                    onClick={handleAvatarClick}
                  >
                    <img 
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <h1 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h1>
                <p className="text-gray-600">{user.bio || 'Студент курса архитектуры ЭВМ'}</p>
              </div>

              {/* Статистика */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Общий прогресс:</span>
                  <span className="font-semibold text-lg">{getOverallProgress()}%</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Завершено модулей:</span>
                  <span className="font-semibold">{getCompletedModules()} из 8</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Дата регистрации:</span>
                  <span className="font-semibold">{formatDate(user.registrationDate)}</span>
                </div>
              </div>

              {/* Кнопка редактирования */}
              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Редактировать профиль</span>
              </button>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-8">
            {/* Прогресс обучения */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BookOpen className="mr-2" size={20} />
                Прогресс по модулям
              </h2>

              <div className="space-y-4">
                {progress.map((moduleProgress) => {
                  const moduleName = moduleNames[moduleProgress.moduleId as keyof typeof moduleNames] || moduleProgress.moduleId;
                  const progressPercentage = (
                    (moduleProgress.lectureCompleted ? 50 : 0) + 
                    (moduleProgress.testCompleted ? 50 : 0)
                  );

                  return (
                    <div key={moduleProgress.moduleId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{moduleName}</h3>
                        <span className="text-sm font-semibold">{progressPercentage}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className={`${moduleProgress.lectureCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                            📖 Лекция {moduleProgress.lectureCompleted ? '✓' : '○'}
                          </span>
                          <span className={`${moduleProgress.testCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                            📝 Тест {moduleProgress.testCompleted ? '✓' : '○'}
                          </span>
                        </div>
                        
                        {moduleProgress.testScore && (
                          <span className={`font-medium ${getScoreColor(moduleProgress.testScore)}`}>
                            Результат: {moduleProgress.testScore}%
                          </span>
                        )}
                      </div>

                      {moduleProgress.completionDate && (
                        <div className="mt-2 text-xs text-gray-500">
                          Завершено: {formatDate(moduleProgress.completionDate)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="mr-2" size={20} />
                Информация об обучении
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Университет</h3>
                  <p className="text-gray-900">{user.university || 'Не указано'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Курс</h3>
                  <p className="text-gray-900">{user.course ? `${user.course} курс` : 'Не указано'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Группа</h3>
                  <p className="text-gray-900">{user.group || 'Не указано'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Email</h3>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно редактирования */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Редактирование профиля</h2>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    О себе
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Университет
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Курс
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Группа
                    </label>
                    <input
                      type="text"
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}