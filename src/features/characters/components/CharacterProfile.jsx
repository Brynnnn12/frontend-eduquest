import React from "react";
import {
  useGetCharacterQuery,
  useUpdateCharacterMutation,
} from "../../../api/characterApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CharacterProfile = () => {
  const { data, isLoading, error } = useGetCharacterQuery();
  const [updateCharacter, { isLoading: updating }] =
    useUpdateCharacterMutation();
  const [editMode, setEditMode] = useState(false);

  const character = data || {};

  const initialValues = {
    username: character?.username || "",
    bio: character?.bio || "",
    avatar_url: character?.avatar_url || "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    bio: Yup.string(),
    avatar_url: Yup.string().url("Invalid URL"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);
      await updateCharacter(values).unwrap();
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error loading profile</div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Character Profile
      </h1>

      {!editMode ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={character?.avatar_url || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              {character?.username || "No Username"}
            </h2>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Bio</h3>
            <p className="text-gray-600">
              {character?.bio || "No bio available"}
            </p>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <Field
                  name="bio"
                  as="textarea"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <Field
                  name="avatar_url"
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="avatar_url"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={updating || isSubmitting}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {updating || isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CharacterProfile;
