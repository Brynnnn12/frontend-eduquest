import React, { useState, useCallback, useMemo } from "react";
import {
  useGetQuizzesQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "../../../api/quizApiSlice";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import QuizFormModal from "./QuizFormModal";
import QuizDeleteModal from "./QuizDeleteModal";

const QuizManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const {
    data: quizzes,

    isLoading,
    error,
  } = useGetQuizzesQuery({ page, limit });
  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const meta = useMemo(() => quizzes?.meta || {}, [quizzes?.meta]);

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      try {
        await updateQuiz({
          id: editingQuiz.id,
          data: values,
        }).unwrap();
        toast.success("Quiz updated successfully!");
        setShowModal(false);
        setEditingQuiz(null);
        resetForm();
      } catch (error) {
        console.error("Error updating quiz:", error);
        toast.error("Failed to update quiz");
      }
    },
    [editingQuiz, updateQuiz]
  );

  const handleEdit = useCallback((quiz) => {
    setEditingQuiz(quiz);
    setShowModal(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setQuizToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await deleteQuiz(quizToDelete).unwrap();
      toast.success("Quiz deleted successfully!");
      setShowDeleteModal(false);
      setQuizToDelete(null);
    } catch {
      toast.error("Failed to delete quiz");
    }
  }, [quizToDelete, deleteQuiz]);

  const columns = useMemo(
    () => [
      {
        key: "question",
        label: "Question",
        render: (quiz) => (
          <div className="max-w-xs truncate" title={quiz.question}>
            {quiz.question}
          </div>
        ),
      },
      {
        key: "options",
        label: "Options",
        render: (quiz) => (
          <div className="text-sm">
            {quiz.options?.map((option, index) => (
              <div key={index} className="truncate max-w-xs">
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "answer",
        label: "Answer",
        render: (quiz) => (
          <span className="font-semibold text-green-600">{quiz.answer}</span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (quiz) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(quiz)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="text-red-600 hover:text-red-900"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Management</h1>
      </div>

      <Table
        columns={columns}
        data={quizzes}
        loading={isLoading}
        error={error}
        emptyMessage="No quizzes found"
      />

      <Pagination
        currentPage={page}
        totalItems={meta.total}
        itemsPerPage={limit}
        onPageChange={setPage}
        className="mt-6"
      />

      {/* Modal */}
      <QuizFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        editingQuiz={editingQuiz}
        onSubmit={handleSubmit}
      />

      {/* Delete Modal */}
      <QuizDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default QuizManagement;
