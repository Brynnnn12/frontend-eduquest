const HintSolutionSection = ({
  hint,
  solution,
  showHint,
  showSolution,
  onGetHint,
  onGetSolution,
}) => {
  return (
    <div className="mt-6 space-y-4">
      {/* Hint Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">💡 Hint</span>
          <button
            onClick={onGetHint}
            disabled={showHint}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showHint
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {showHint ? "Hint Ditampilkan" : "Dapatkan Hint"}
          </button>
        </div>
        {showHint && hint && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">{hint}</p>
          </div>
        )}
      </div>

      {/* Solution Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">📝 Solusi</span>
          <button
            onClick={onGetSolution}
            disabled={showSolution}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showSolution
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {showSolution ? "Solusi Ditampilkan" : "Dapatkan Solusi"}
          </button>
        </div>
        {showSolution && solution && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">{solution}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HintSolutionSection;
