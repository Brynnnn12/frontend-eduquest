import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";

const MissionFormModal = ({ isOpen, onClose, editingMission, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    subject: Yup.string().required("Subject is required"),
    level: Yup.string().required("Level is required"),
    points: Yup.number()
      .min(0, "Points must be 0 or greater")
      .integer("Points must be an integer")
      .required("Points is required"),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingMission ? "Edit Mission" : "Create Mission"}
      onConfirm={() => {
        document.getElementById("mission-form").requestSubmit();
      }}
      confirmText="Save"
      cancelText="Cancel"
    >
      <Formik
        initialValues={{
          title: editingMission?.title || "",
          description: editingMission?.description || "",
          subject: editingMission?.subject || "",
          level: editingMission?.level || "",
          points: editingMission?.points || "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form id="mission-form" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <Field
                name="subject"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <Field
                name="level"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              <Field
                name="points"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="points"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default MissionFormModal;
