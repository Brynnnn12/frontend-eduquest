import React, { useMemo, useState } from "react";
import {
  useGetMissionsQuery,
  useCreateMissionMutation,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
} from "../../../api/missionApiSlice";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import MissionFormModal from "./MissionFormModal";
import MissionDeleteModal from "./MissionDeleteModal";

const MissionManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const {
    data: missions,
    isLoading,
    error,
  } = useGetMissionsQuery({ page, limit });
  const [createMission] = useCreateMissionMutation();
  const [updateMission] = useUpdateMissionMutation();
  const [deleteMission] = useDeleteMissionMutation();

  const meta = useMemo(() => missions?.meta || {}, [missions?.meta]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (!user) {
        toast.error("User not found. Please login again.");
        return;
      }

      // Get created_by from user data (handle different backend formats)
      const createdBy =
        typeof user === "string" ? user : user?.id || user?.name;

      if (!createdBy) {
        toast.error("Invalid user data. Please login again.");
        return;
      }

      const dataToSubmit = {
        ...values,
        created_by: createdBy,
        points: parseInt(values.points, 10),
      };
      if (editingMission) {
        await updateMission({
          id: editingMission.id,
          data: dataToSubmit,
        }).unwrap();
        toast.success("Mission updated successfully!");
      } else {
        await createMission(dataToSubmit).unwrap();
        toast.success("Mission created successfully!");
      }
      setShowModal(false);
      setEditingMission(null);
      resetForm();
    } catch (error) {
      console.error("Error saving mission:", error);
      toast.error("Failed to save mission");
    }
  };

  const handleEdit = (mission) => {
    setEditingMission(mission);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setMissionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMission(missionToDelete).unwrap();
      toast.success("Mission deleted successfully!");
      setShowDeleteModal(false);
      setMissionToDelete(null);
    } catch {
      toast.error("Failed to delete mission");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "subject", label: "Subject" },
    { key: "level", label: "Level" },
    {
      key: "actions",
      label: "Actions",
      render: (mission) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(mission)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(mission.id)}
            className="text-red-600 hover:text-red-900"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const openCreateModal = () => {
    setEditingMission(null);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mission Management</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Mission
        </button>
      </div>

      <Table
        columns={columns}
        data={missions}
        loading={isLoading}
        error={error}
        emptyMessage="No missions found"
      />

      <Pagination
        currentPage={page}
        totalItems={meta.total}
        itemsPerPage={limit}
        onPageChange={setPage}
        className="mt-6"
      />

      {/* Modal */}
      <MissionFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        editingMission={editingMission}
        onSubmit={handleSubmit}
      />

      {/* Delete Modal */}
      <MissionDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MissionManagement;
