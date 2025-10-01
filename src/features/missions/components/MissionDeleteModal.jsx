import React from "react";
import Modal from "../../../components/Modal";

const MissionDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Mission"
      onConfirm={onConfirm}
      confirmText="Delete"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to delete this mission? This action cannot be
        undone.
      </p>
    </Modal>
  );
};

export default MissionDeleteModal;
