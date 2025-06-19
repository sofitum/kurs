import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { lectureContent } from '../data/lectureContent';

export default function LectureView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateProgress, getModuleProgress } = useProgress();

  const lecture = lectureContent[id!];
  const progress = getModuleProgress(id!);

  useEffect(() => {
    if (!lecture) {
      navigate('/modules');
    }
  }, [lecture, navigate]);

  useEffect(() => {
    // Отмечаем лекцию как завершенную при просмотре
    const timer = setTimeout(() => {
      updateProgress(id!, {
        lectureCompleted: true
      });
    }, 5000); // Через 5 секунд просмотра

    return () => clearTimeout(timer);
  }, [id, updateProgress]);

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Лекция не найдена</h2>
          <button 
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к модулям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок и навигация */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-blue-600" size={24} />
                <span className="text-sm font-medium text-gray-600">Лекция</span>
                {progress.lectureCompleted && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </div>
              <Link 
                to="/modules"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                ← Вернуться к модулям
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {lecture.title}
            </h1>
            <p className="text-gray-600">
              {lecture.description}
            </p>
          </div>

          {/* Содержание лекции */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: lecture.content }}
            />
          </div>

          {/* Навигация к тесту */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Готовы проверить свои знания?
                </h3>
                <p className="text-gray-600">
                  Пройдите тест по материалам лекции, чтобы закрепить полученные знания.
                </p>
              </div>
              <Link
                to={`/test/${id}`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Пройти тест</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}