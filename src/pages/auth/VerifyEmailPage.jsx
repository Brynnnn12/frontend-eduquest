import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../../api/authApiSlice";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { data, error, isLoading } = useVerifyEmailQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      navigate("/login");
      return;
    }

    if (error) {
      toast.error(error.message || "Verification failed");
      navigate("/login");
    } else if (data) {
      toast.success("Email verified successfully");
      navigate("/login");
    }
  }, [token, navigate, data, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Verifying your email...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmailPage;
