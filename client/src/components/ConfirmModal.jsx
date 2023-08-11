import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmModal = ({ id, onDelete, onClose }) => {
  const deleteHandler = () => {
    onDelete(id);
    onClose();
  };
  return (
    <Modal show={true} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
