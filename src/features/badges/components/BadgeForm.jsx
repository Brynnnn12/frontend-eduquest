import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useCreateBadgeMutation,
  useUpdateBadgeMutation,
} from "../../../api/badgeApiSlice";
import toast from "react-hot-toast";

const BadgeForm = ({ badge, onClose }) => {
  const [createBadge] = useCreateBadgeMutation();
  const [updateBadge] = useUpdateBadgeMutation();

  const initialValues = {
    name: badge?.name || "",
    description: badge?.description || "",
    threshold: badge?.threshold || 0,
    icon: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    threshold: Yup.number().min(0, "Threshold must be at least 0"),
    icon: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("threshold", values.threshold);
    if (values.icon) {
      data.append("icon", values.icon);
    }

    try {
      if (badge) {
        await updateBadge({ id: badge.id, formData: data }).unwrap();
        toast.success("Badge updated successfully");
      } else {
        await createBadge(data).unwrap();
        toast.success("Badge created successfully");
      }
      onClose();
    } catch {
      toast.error("Failed to save badge");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {badge ? "Edit Badge" : "Create Badge"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <Field
              type="text"
              name="name"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="w-full p-2 border rounded"
              rows="3"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Threshold</label>
            <Field
              type="number"
              name="threshold"
              className="w-full p-2 border rounded"
              min="0"
            />
            <ErrorMessage
              name="threshold"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Icon</label>
            <input
              type="file"
              name="icon"
              onChange={(event) => {
                setFieldValue("icon", event.currentTarget.files[0]);
              }}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            <ErrorMessage
              name="icon"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {badge ? "Update" : "Create"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BadgeForm;
