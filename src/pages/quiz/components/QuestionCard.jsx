const QuestionCard = ({
  currentQuestion,
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  isLastQuestion,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {currentQuestion + 1}. {question}
        </h2>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
              }`}
            >
              <span className="font-semibold mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${
            selectedAnswer !== null
              ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? "Selesai" : "Selanjutnya"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
