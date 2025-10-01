import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";

const QuizFormModal = ({ isOpen, onClose, editingQuiz, onSubmit }) => {
  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    options: Yup.array()
      .of(Yup.string().required("Option is required"))
      .min(4, "Must have 4 options")
      .max(4, "Must have exactly 4 options")
      .required("Options are required"),
    answer: Yup.string().required("Answer is required"),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Quiz"
      onConfirm={() => {
        document.getElementById("quiz-form").requestSubmit();
      }}
      confirmText="Save"
      cancelText="Cancel"
    >
      <Formik
        initialValues={{
          question: editingQuiz?.question || "",
          options: editingQuiz?.options || ["", "", "", ""],
          answer: editingQuiz?.answer || "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form id="quiz-form" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <Field
                name="question"
                as="textarea"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              {values.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center">
                    <span className="w-6 text-sm font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <Field
                      name={`options[${index}]`}
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                  <ErrorMessage
                    name={`options[${index}]`}
                    component="div"
                    className="text-red-500 text-sm mt-1 ml-6"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correct Answer
              </label>
              <Field
                name="answer"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the correct answer"
              />
              <ErrorMessage
                name="answer"
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

export default QuizFormModal;
