import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";

import axios from "axios";

const EditModal = ({
  name,
  image,
  desc,
  quantity,
  id,
  onClose,
  isNewItem,
  onSave,
}) => {
  const [data, setData] = useState({
    name,
    desc,
    quantity,
    image,
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={true} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isNewItem ? "Add Item" : "Edit"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          onChange={changeHandler}
        />
        <Form.Label htmlFor="quantity">Quantity</Form.Label>
        <Form.Control
          type="number"
          id="quantity"
          name="quantity"
          defaultValue={quantity}
          onChange={changeHandler}
        />
        <Form.Label htmlFor="image">Image Link</Form.Label>
        <Form.Control
          type="text"
          id="image"
          name="image"
          defaultValue={image}
          onChange={changeHandler}
        />
        <Form.Label htmlFor="desc">Description</Form.Label>
        <Form.Control
          id="desc"
          name="desc"
          as="textarea"
          rows={5}
          defaultValue={desc}
          onChange={changeHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave.bind(this, { data, id })}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
