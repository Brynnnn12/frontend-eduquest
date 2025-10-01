import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../api/authApiSlice";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values) => {
    try {
      await forgotPassword(values).unwrap();
      setMessage("Reset link sent to your email");
      toast.success("Reset link sent");
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Failed to send reset link"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to receive a reset link
          </p>
        </div>
        {message && <div className="text-center text-green-600">{message}</div>}
        <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
