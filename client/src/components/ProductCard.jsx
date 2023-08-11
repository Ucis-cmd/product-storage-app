import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import styles from "./ProductCard.module.css";

const ProductCard = ({
  name,
  quantity,
  desc,
  id,
  image,
  onShowModal,
  setModalData,
  onEdit,
  onDelete,
}) => {
  const setDataHandler = () => {
    setModalData({ name, quantity, desc, image, id });
    onShowModal();
  };

  const editHandler = (event) => {
    event.stopPropagation();
    onEdit();
    setModalData({ name, quantity, desc, image, id });
  };

  const deleteHandler = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const quantityStyles = quantity === 0 ? styles["red-color"] : "";

  return (
    <Card className={styles["card-container"]} onClick={setDataHandler}>
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "10rem", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {desc}
          <br />
          <strong className={quantityStyles}>Quantity: {quantity}</strong>
        </Card.Text>
        <div className="d-flex justify-content-between gap-2">
          <Button variant="primary" className="w-50" onClick={editHandler}>
            Edit
          </Button>
          <Button variant="danger" className="w-50" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
