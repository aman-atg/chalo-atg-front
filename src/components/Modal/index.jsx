import PropTypes from "prop-types";
import React, { useRef } from "react";

import useCloseOnOutside from "../../hooks/useCloseOnOutside";

const Modal = ({
  children,
  closeModal,
  isOpen,
  closeOnBackground,
  contentClass,
  modalClass,
}) => {
  const popUpRef = useRef();

  console.log({ modalClass });
  useCloseOnOutside(popUpRef, () => {
    closeOnBackground && closeModal();
  });

  return (
    isOpen && (
      <div className={`Modal ${modalClass}`}>
        <div className={`Modal-backdrop ${isOpen ? "active" : ""}`}>
          <div
            className={`Modal-content ${
              contentClass ? contentClass : modalClass + "-content"
            }`}
            ref={popUpRef}
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  closeOnBackground: PropTypes.bool,
  contentClass: PropTypes.string,
  modalClass: PropTypes.string,
};
