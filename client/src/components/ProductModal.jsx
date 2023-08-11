import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ProductModal = ({
  name,
  quantity,
  desc,
  image,
  onClose,
  onEdit,
}) => {
  const editHandler = () => {
    onClose();//hide this modal
    onEdit(); //Open edit modal
    // + keep data on app, to be used by editModal
  };

  return (
    <Modal show={true} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {desc}
        <br />
        {`Quantity: ${quantity}`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={editHandler}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
