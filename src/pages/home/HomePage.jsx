import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to EduQuest</h1>
        <p className="text-xl mb-8">Your journey to knowledge starts here.</p>
        {user ? (
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
