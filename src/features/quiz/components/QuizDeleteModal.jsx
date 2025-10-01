import React from "react";
import Modal from "../../../components/Modal";

const QuizDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Quiz"
      onConfirm={onConfirm}
      confirmText="Delete"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to delete this quiz? This action cannot be undone.
      </p>
    </Modal>
  );
};

export default QuizDeleteModal;
