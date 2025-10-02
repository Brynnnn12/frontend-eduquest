import React, { useState, useCallback, useMemo } from "react";
import {
  useGetMissionsQuery,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
} from "../../../api/missionApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import TableControls from "../../../components/TableControls";
import MissionFormModal from "./MissionFormModal";
import MissionDeleteModal from "./MissionDeleteModal";
import useAllDataForSearch from "../../../hooks/useAllDataForSearch";
import useClientPagination from "../../../hooks/useClientPagination";
import useEntityOperations from "../../../hooks/useEntityOperations";
import {
  PAGINATION,
  SEARCH_FIELDS,
  MESSAGES,
  API_LIMITS,
} from "../../../constants/appConstants";

const MissionManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState(null);

  // Load all data for client-side search and pagination
  const {
    data: allMissions,
    isLoading,
    error,
  } = useAllDataForSearch(
    useGetMissionsQuery,
    {},
    SEARCH_FIELDS.MISSION,
    API_LIMITS.MISSION_LOAD_LIMIT
  );

  // Use custom pagination hook
  const {
    paginatedData: paginatedMissions,
    paginationInfo,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    search,
    isSearching,
  } = useClientPagination(
    allMissions,
    PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    SEARCH_FIELDS.MISSION
  );

  // Use custom entity operations hook
  const [updateMission] = useUpdateMissionMutation();
  const [deleteMission] = useDeleteMissionMutation();

  const { handleUpdate, handleDelete } = useEntityOperations(
    {
      updateTrigger: updateMission,
      deleteTrigger: deleteMission,
    },
    "MISSION"
  );

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleUpdate(editingMission.id, values);
      setShowModal(false);
      setEditingMission(null);
      resetForm();
    },
    [editingMission, handleUpdate]
  );

  const handleEdit = useCallback((mission) => {
    setEditingMission(mission);
    setShowModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await handleDelete(missionToDelete);
      setShowDeleteModal(false);
      setMissionToDelete(null);
    } catch {
      // Error sudah dihandle di custom hook
    }
  }, [missionToDelete, handleDelete]);

  const handleDeleteClick = useCallback((id) => {
    setMissionToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "title",
        label: "Title",
        render: (mission) => (
          <div className="max-w-xs truncate" title={mission.title}>
            {mission.title}
          </div>
        ),
      },
      {
        key: "description",
        label: "Description",
        render: (mission) => (
          <div className="max-w-xs truncate" title={mission.description}>
            {mission.description}
          </div>
        ),
      },
      {
        key: "subject",
        label: "Subject",
        render: (mission) => (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {mission.subject}
          </span>
        ),
      },
      {
        key: "level",
        label: "Level",
        render: (mission) => (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            {mission.level}
          </span>
        ),
      },
      {
        key: "points",
        label: "Points",
        render: (mission) => (
          <span className="font-semibold text-purple-600">
            {mission.points}
          </span>
        ),
      },
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
              onClick={() => handleDeleteClick(mission.id)}
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
        <h1 className="text-3xl font-bold text-gray-800">Mission Management</h1>
      </div>

      <TableControls
        searchValue={search}
        onSearchChange={handleSearchChange}
        perPage={paginationInfo.itemsPerPage}
        onPerPageChange={handleItemsPerPageChange}
        totalItems={paginationInfo.totalItems}
        currentPage={paginationInfo.currentPage}
        itemsPerPage={paginationInfo.itemsPerPage}
        searchPlaceholder={MESSAGES.SEARCH_PLACEHOLDER.MISSION}
        isSearchLoading={false}
        showNoDataMessage={false}
        searchMode="client"
        clientSearchResults={paginatedMissions}
        className="mb-6"
      />

      <Table
        columns={columns}
        data={paginatedMissions}
        loading={isLoading}
        error={error}
        emptyMessage={MESSAGES.EMPTY_STATE.MISSION}
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
