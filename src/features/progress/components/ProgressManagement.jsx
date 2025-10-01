import React, { useState, useCallback, useMemo } from "react";
import {
  useGetProgressesQuery,
  useDeleteProgressMutation,
} from "../../../api/progressApiSlice";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import ProgressDeleteModal from "./ProgressDeleteModal";

const ProgressManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [progressToDelete, setProgressToDelete] = useState(null);

  const {
    data: progressesData,
    isLoading,
    error,
  } = useGetProgressesQuery({ page, limit });
  const [deleteProgress] = useDeleteProgressMutation();

  const progresses = progressesData?.data || [];
  const meta = progressesData?.meta || {};

  const handleDelete = useCallback((id) => {
    setProgressToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await deleteProgress(progressToDelete).unwrap();
      toast.success("Progress deleted successfully!");
      setShowDeleteModal(false);
      setProgressToDelete(null);
    } catch {
      toast.error("Failed to delete progress");
    }
  }, [progressToDelete, deleteProgress]);

  const columns = useMemo(
    () => [
      {
        key: "user",
        label: "User",
        render: (progress) => (
          <div>
            <div className="font-medium">
              {progress.user?.name || "Unknown"}
            </div>
            <div className="text-sm text-gray-500">ID: {progress.user_id}</div>
          </div>
        ),
      },
      {
        key: "mission",
        label: "Mission",
        render: (progress) => (
          <div>
            <div className="font-medium">
              {progress.mission?.title || "Unknown"}
            </div>
            <div className="text-sm text-gray-500">
              ID: {progress.mission_id}
            </div>
          </div>
        ),
      },
      {
        key: "score",
        label: "Score",
        render: (progress) => (
          <span className="font-semibold">{progress.score || 0}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (progress) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              progress.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {progress.status}
          </span>
        ),
      },
      {
        key: "completed_at",
        label: "Completed At",
        render: (progress) => (
          <span className="text-sm">
            {progress.completed_at
              ? new Date(progress.completed_at).toLocaleDateString()
              : "-"}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (progress) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(progress.id)}
              className="text-red-600 hover:text-red-900"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Progress Management
        </h1>
      </div>

      <Table
        columns={columns}
        data={progresses}
        loading={isLoading}
        error={error}
        emptyMessage="No progress records found"
      />

      <Pagination
        currentPage={page}
        totalItems={meta.total}
        itemsPerPage={limit}
        onPageChange={setPage}
        className="mt-6"
      />

      {/* Delete Modal */}
      <ProgressDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProgressManagement;
