import { useState, useCallback, useMemo } from "react";
import {
  useGetBadgesQuery,
  useDeleteBadgeMutation,
} from "../../../api/badgeApiSlice";
import toast from "react-hot-toast";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import Pagination from "../../../components/Pagination";

const ITEMS_PER_PAGE = 10;

const BadgeList = ({ onEdit }) => {
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [badgeToDelete, setBadgeToDelete] = useState(null);

  const { data, isLoading, error } = useGetBadgesQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });
  const [deleteBadge] = useDeleteBadgeMutation();

  const badges = data?.data?.data || [];
  const total = data?.data?.total || 0;

  const handleDeleteClick = useCallback((badge) => {
    setBadgeToDelete(badge);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!badgeToDelete) return;

    try {
      await deleteBadge(badgeToDelete.id).unwrap();
      toast.success("Badge deleted successfully");
      setShowDeleteModal(false);
      setBadgeToDelete(null);
    } catch {
      toast.error("Failed to delete badge");
    }
  }, [badgeToDelete, deleteBadge]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setBadgeToDelete(null);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "icon",
        label: "Icon",
        render: (badge) => (
          <img
            src={`http://localhost:3000/public/icons/${badge.icon}`}
            alt={badge.name}
            className="w-12 h-12 mx-auto"
          />
        ),
      },
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "threshold", label: "Threshold" },
      {
        key: "actions",
        label: "Actions",
        render: (badge) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => onEdit(badge)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(badge)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, handleDeleteClick]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Badges</h1>

      <Table
        columns={columns}
        data={badges}
        loading={isLoading}
        error={error}
        emptyMessage="No badges found"
      />

      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete the badge "{badgeToDelete?.name}"?
      </Modal>
    </div>
  );
};

export default BadgeList;
