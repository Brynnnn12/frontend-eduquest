import React, { useState, useCallback } from "react";

/**
 * Higher-Order Component untuk modal management
 * @param {React.Component} WrappedComponent - Component yang akan di-wrap
 * @param {Object} config - Konfigurasi modal
 * @returns {React.Component} - Component dengan modal functionality
 */
const withModal = (WrappedComponent, config = {}) => {
  const {
    modalComponent: ModalComponent,
    modalProps = {},
    triggerProp = "onOpen",
  } = config;

  const WithModalComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const { onSubmit } = props;

    const openModal = useCallback((data = null) => {
      setModalData(data);
      setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
      setIsOpen(false);
      setModalData(null);
    }, []);

    const handleSubmit = useCallback(
      async (data) => {
        if (onSubmit) {
          await onSubmit(data, { modalData });
        }
        closeModal();
      },
      [onSubmit, modalData, closeModal]
    );

    const triggerProps = {
      [triggerProp]: openModal,
    };

    return (
      <>
        <WrappedComponent {...props} {...triggerProps} isModalOpen={isOpen} />

        {ModalComponent && isOpen && (
          <ModalComponent
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            data={modalData}
            {...modalProps}
            {...props.modalProps}
          />
        )}
      </>
    );
  };

  WithModalComponent.displayName = `withModal(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithModalComponent;
};

export default withModal;
