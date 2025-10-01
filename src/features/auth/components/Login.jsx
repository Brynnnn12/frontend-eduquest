import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../../api/authApiSlice";
import { setCredentials } from "../slices/authSlice";
import LoginForm from "../forms/LoginForm";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      const result = await login(values).unwrap();
      // Handle different user response formats from backend
      let userData;
      if (typeof result.user === "string") {
        userData = { name: result.user };
      } else {
        userData = result.user;
      }

      dispatch(
        setCredentials({
          user: userData,
          token: result.accessToken,
        })
      );
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("accessToken", result.accessToken);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
