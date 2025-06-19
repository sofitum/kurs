import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { testQuestions } from '../data/testQuestions';

export default function TestView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Array<{
    questionIndex: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }>>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = testQuestions[id!] || [];
  const score = userAnswers.length > 0 ? Math.round((userAnswers.filter(a => a.isCorrect).length / questions.length) * 100) : 0;

  useEffect(() => {
    if (!questions.length) {
      navigate('/modules');
    }
  }, [questions, navigate]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer,
      isCorrect
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setShowResult(true);
    setShowAnswer(true);

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        // Тест завершен
        setIsCompleted(true);
        const finalScore = Math.round((([...userAnswers, newAnswer].filter(a => a.isCorrect).length) / questions.length) * 100);
        
        // Обновляем прогресс
        updateProgress(id!, {
          testCompleted: true,
          testScore: finalScore,
          completionDate: new Date().toISOString()
        });
      } else {
        // Переход к следующему вопросу
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowAnswer(false);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setIsCompleted(false);
    setShowAnswer(false);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { message: 'Отлично! Превосходный результат!', color: 'text-green-600' };
    if (score >= 70) return { message: 'Хороший результат!', color: 'text-blue-600' };
    if (score >= 50) return { message: 'Удовлетворительно. Рекомендуем повторить материал.', color: 'text-yellow-600' };
    return { message: 'Неудовлетворительно. Обязательно изучите лекцию еще раз.', color: 'text-red-600' };
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Тест не найден</h2>
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

  if (isCompleted) {
    const scoreData = getScoreMessage(score);
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <div className="mb-6">
                {score >= 70 ? (
                  <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
                ) : (
                  <XCircle size={64} className="text-red-600 mx-auto mb-4" />
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Тест завершен!</h1>
                <p className="text-xl text-gray-600">Ваш результат</p>
              </div>

              <div className="mb-8">
                <div className="text-6xl font-bold text-gray-900 mb-2">{score}%</div>
                <div className={`text-lg font-medium ${scoreData.color} mb-4`}>
                  {scoreData.message}
                </div>
                <div className="text-gray-600">
                  Правильных ответов: {userAnswers.filter(a => a.isCorrect).length} из {questions.length}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw size={20} />
                  <span>Пройти еще раз</span>
                </button>
                <button
                  onClick={() => navigate('/modules')}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Вернуться к модулям
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Посмотреть прогресс
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Прогресс */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Вопрос */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Варианты ответов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = "p-4 text-left border border-gray-200 rounded-lg transition-all duration-200 ";
                
                if (showAnswer) {
                  if (index === question.correct) {
                    buttonClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (index === selectedAnswer && index !== question.correct) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += "bg-gray-50 text-gray-600";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "bg-blue-100 border-blue-500 text-blue-800";
                  } else {
                    buttonClass += "hover:bg-gray-50 hover:border-gray-300 cursor-pointer";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showAnswer}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        showAnswer && index === question.correct 
                          ? 'bg-green-600 text-white' 
                          : showAnswer && index === selectedAnswer && index !== question.correct
                          ? 'bg-red-600 text-white'
                          : selectedAnswer === index 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showAnswer && index === question.correct && (
                        <CheckCircle size={20} className="text-green-600" />
                      )}
                      {showAnswer && index === selectedAnswer && index !== question.correct && (
                        <XCircle size={20} className="text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Объяснение */}
            {showResult && (
              <div className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === question.correct 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {selectedAnswer === question.correct ? (
                    <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  ) : (
                    <XCircle size={20} className="text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className={`font-medium mb-1 ${
                      selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {selectedAnswer === question.correct ? 'Правильно!' : 'Неправильно'}
                    </div>
                    <div className="text-gray-700 text-sm">
                      {question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Кнопка следующего вопроса */}
            <div className="flex justify-center">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedAnswer !== null
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}