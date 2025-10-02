import React, { useState, useCallback, useMemo } from "react";
import {
  useGetQuizzesQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "../../../api/quizApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import TableControls from "../../../components/TableControls";
import QuizFormModal from "./QuizFormModal";
import QuizDeleteModal from "./QuizDeleteModal";
import useAllDataForSearch from "../../../hooks/useAllDataForSearch";
import useClientPagination from "../../../hooks/useClientPagination";
import useEntityOperations from "../../../hooks/useEntityOperations";
import {
  PAGINATION,
  SEARCH_FIELDS,
  MESSAGES,
  API_LIMITS,
} from "../../../constants/appConstants";

const QuizManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  // Load all data for client-side search and pagination
  const {
    data: allQuizzes,
    isLoading,
    error,
  } = useAllDataForSearch(
    useGetQuizzesQuery,
    {},
    SEARCH_FIELDS.QUIZ,
    API_LIMITS.QUIZ_LOAD_LIMIT
  );

  // Use custom pagination hook
  const {
    paginatedData: paginatedQuizzes,
    paginationInfo,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    search,
    isSearching,
  } = useClientPagination(
    allQuizzes,
    PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    SEARCH_FIELDS.QUIZ
  );

  // Use custom entity operations hook
  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const { handleUpdate, handleDelete } = useEntityOperations(
    {
      updateTrigger: updateQuiz,
      deleteTrigger: deleteQuiz,
    },
    "QUIZ"
  );

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleUpdate(editingQuiz.id, values);
      setShowModal(false);
      setEditingQuiz(null);
      resetForm();
    },
    [editingQuiz, handleUpdate]
  );

  const handleEdit = useCallback((quiz) => {
    setEditingQuiz(quiz);
    setShowModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await handleDelete(quizToDelete);
      setShowDeleteModal(false);
      setQuizToDelete(null);
    } catch {
      // Error sudah dihandle di custom hook
    }
  }, [quizToDelete, handleDelete]);

  const handleDeleteClick = useCallback((id) => {
    setQuizToDelete(id);
    setShowDeleteModal(true);
  }, []);

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
              onClick={() => handleDeleteClick(quiz.id)}
              className="text-red-600 hover:text-red-900"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDeleteClick]
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Management</h1>
      </div>

      <TableControls
        searchValue={search}
        onSearchChange={handleSearchChange}
        perPage={paginationInfo.itemsPerPage}
        onPerPageChange={handleItemsPerPageChange}
        totalItems={paginationInfo.totalItems}
        currentPage={paginationInfo.currentPage}
        itemsPerPage={paginationInfo.itemsPerPage}
        searchPlaceholder={MESSAGES.SEARCH_PLACEHOLDER.QUIZ}
        isSearchLoading={false}
        showNoDataMessage={false}
        searchMode="client"
        clientSearchResults={paginatedQuizzes}
        className="mb-6"
      />

      <Table
        columns={columns}
        data={paginatedQuizzes}
        loading={isLoading}
        error={error}
        emptyMessage={MESSAGES.EMPTY_STATE.QUIZ}
        isSearching={isSearching}
        searchQuery={search}
      />

      <Pagination
        currentPage={paginationInfo.currentPage}
        totalItems={paginationInfo.totalItems}
        itemsPerPage={paginationInfo.itemsPerPage}
        onPageChange={handlePageChange}
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
