import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../../api/authApiSlice";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (values) => {
    try {
      await resetPassword(values).unwrap();
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Failed to reset password"
      );
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password
          </p>
        </div>
        <ResetPasswordForm
          onSubmit={handleSubmit}
          token={token}
          isLoading={isLoading}
        />
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

export default ResetPassword;
