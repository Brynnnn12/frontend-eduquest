import { useCallback } from "react";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../constants/appConstants";

/**
 * Custom hook untuk handling CRUD operations dengan error handling dan toast notifications
 * @param {Object} mutationTriggers - RTK Query mutation trigger functions
 * @param {string} entityType - Type of entity (QUIZ, MISSION, etc.)
 * @returns {Object} - Handlers untuk CRUD operations
 */
const useEntityOperations = (mutationTriggers, entityType) => {
  const { createTrigger, updateTrigger, deleteTrigger } = mutationTriggers;

  const handleCreate = useCallback(
    async (data, options = {}) => {
      try {
        const result = await createTrigger(data).unwrap();
        toast.success(
          TOAST_MESSAGES.SUCCESS[`${entityType}_CREATED`] ||
            "Created successfully!"
        );
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        console.error(`Failed to create ${entityType.toLowerCase()}:`, error);
        toast.error(
          TOAST_MESSAGES.ERROR[`${entityType}_CREATE_FAILED`] ||
            "Failed to create"
        );
        options.onError?.(error);
        throw error;
      }
    },
    [createTrigger, entityType]
  );

  const handleUpdate = useCallback(
    async (id, data, options = {}) => {
      try {
        const result = await updateTrigger({ id, ...data }).unwrap();
        toast.success(
          TOAST_MESSAGES.SUCCESS[`${entityType}_UPDATED`] ||
            "Updated successfully!"
        );
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        console.error(`Failed to update ${entityType.toLowerCase()}:`, error);
        toast.error(
          TOAST_MESSAGES.ERROR[`${entityType}_UPDATE_FAILED`] ||
            "Failed to update"
        );
        options.onError?.(error);
        throw error;
      }
    },
    [updateTrigger, entityType]
  );

  const handleDelete = useCallback(
    async (id, options = {}) => {
      try {
        const result = await deleteTrigger(id).unwrap();
        toast.success(
          TOAST_MESSAGES.SUCCESS[`${entityType}_DELETED`] ||
            "Deleted successfully!"
        );
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        console.error(`Failed to delete ${entityType.toLowerCase()}:`, error);
        toast.error(
          TOAST_MESSAGES.ERROR[`${entityType}_DELETE_FAILED`] ||
            "Failed to delete"
        );
        options.onError?.(error);
        throw error;
      }
    },
    [deleteTrigger, entityType]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useEntityOperations;
