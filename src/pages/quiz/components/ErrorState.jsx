const ErrorState = ({
  title = "Terjadi Kesalahan",
  message = "Terjadi kesalahan yang tidak terduga.",
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onBack}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
