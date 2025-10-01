import React from "react";
import Modal from "../../../components/Modal";

const ProgressDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Progress"
      onConfirm={onConfirm}
      confirmText="Delete"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to delete this progress record? This action cannot
        be undone and will remove the user's progress for this mission.
      </p>
    </Modal>
  );
};

export default ProgressDeleteModal;
