import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPasswordForm = ({ onSubmit, token, isLoading = false }) => {
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Too short").required("Required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ password: "", passwordConfirmation: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit({ ...values, token })}
    >
      <Form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <Field
            name="password"
            type="password"
            placeholder="New Password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Field
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm Password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage
            name="passwordConfirmation"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
