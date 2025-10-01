import { FaTrophy, FaCheck, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

const QuizResults = ({
  score,
  totalQuestions,
  correctAnswers,
  scoreMessage,
  questions,
  answers,
  onBackToDashboard,
  onTryAgain,
}) => {
  // Debug: Log results data only when component mounts or data changes
  useEffect(() => {
    console.log("QuizResults - Questions:", questions);
    console.log("QuizResults - Answers:", answers);
    if (questions.length > 0) {
      console.log("First question structure:", questions[0]);
    }
  }, [questions, answers]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center">
            <FaTrophy
              className={`text-6xl mx-auto mb-4 ${scoreMessage.color}`}
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Kuis Selesai!
            </h1>
            <p className={`text-xl font-semibold ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
          </div>

          {/* Score Summary */}
          <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">Total Poin</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Jawaban Benar</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBackToDashboard}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Kembali ke Dashboard
            </button>
            <button
              onClick={onTryAgain}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Detail Jawaban
          </h2>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers.find(
                (a) => a.questionId === question.id
              );
              const isCorrect = userAnswer?.isCorrect;
              const correctAnswerText =
                userAnswer?.correctAnswer || question.answer;

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isCorrect ? (
                        <FaCheck size={12} />
                      ) : (
                        <FaTimes size={12} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Jawaban kamu:{" "}
                        <span
                          className={
                            isCorrect
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {userAnswer?.selectedAnswerText || "Tidak tersedia"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">
                          Jawaban benar:{" "}
                          <span className="font-semibold">
                            {correctAnswerText || "Tidak tersedia"}
                          </span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {question.explanation || "Penjelasan tidak tersedia"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
