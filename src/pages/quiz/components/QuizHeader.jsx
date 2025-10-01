import { FaArrowLeft, FaClock } from "react-icons/fa";

const QuizHeader = ({
  title,
  description,
  subject,
  timeLeft,
  onBack,
  formatTime,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
        >
          <FaArrowLeft />
          <span>Kembali</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaClock />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          📚 {subject}
        </div>
      </div>

      {/* Progress Bar will be added by parent component */}
    </div>
  );
};

export default QuizHeader;
