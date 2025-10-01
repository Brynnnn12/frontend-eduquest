import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../../api/authApiSlice";
import RegisterForm from "../forms/RegisterForm";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values) => {
    try {
      await register(values).unwrap();
      toast.success(
        "Registration successful. Please check your email to verify your account."
      );
      navigate("/login");
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
