import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";

import Container from "react-bootstrap/Container";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import EditModal from "./components/EditModal";
import ConfirmModal from "./components/ConfirmModal";

import { useEffect, useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [modalData, setModalData] = useState({
    name: "",
    desc: "",
    image: "",
    quantity: 0,
    id: null,
  });
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const data = await getData();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const startEditHandler = () => {
    setIsEditing(true);
  };

  const stopEditHandler = () => {
    if (isNewItem) {
      setModalData({
        name: "",
        desc: "",
        image: "",
        quantity: 0,
        id: null,
      });
      setIsNewItem(false);
    }
    setIsEditing(false);
  };

  const addNewItemHandler = () => {
    setModalData({
      name: "",
      desc: "",
      image: "",
      quantity: 0,
      id: null,
    });
    setIsEditing(true);
    setIsNewItem(true);
  };

  const saveHandler = async ({ data, id }) => {
    try {
      if (!isNewItem) {
        await axios.put(`http://localhost:5000/edit/${id}`, data);
        console.log("Product updated");
      } else {
        await axios.post("http://localhost:5000/add", data);
        console.log("Product added");
      }
      fetchData();
      stopEditHandler();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log("Product deleted");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-end p-2">
        <img
          src="plus.svg"
          className="add-icon"
          title="Add item"
          onClick={addNewItemHandler}
          alt="add"
        ></img>
      </div>
      <div className="grid-container">
        {products.map((product) => (
          <ProductCard
            name={product.name}
            quantity={product.quantity}
            desc={product.desc}
            onShowModal={showModalHandler}
            onEdit={startEditHandler}
            image={product.image}
            id={product.id}
            key={product.id}
            setModalData={setModalData}
            onDelete={setDeleteId}
          ></ProductCard>
        ))}
        {showModal && (
          <ProductModal
            name={modalData.name}
            image={modalData.image}
            desc={modalData.desc}
            quantity={modalData.quantity}
            onEdit={startEditHandler}
            onClose={hideModalHandler}
          />
        )}
        {isEditing && (
          <EditModal
            name={modalData.name}
            image={modalData.image}
            desc={modalData.desc}
            quantity={modalData.quantity}
            id={modalData.id}
            isNewItem={isNewItem}
            onClose={stopEditHandler}
            onSave={saveHandler}
          />
        )}
        {deleteId && (
          <ConfirmModal
            id={deleteId}
            onDelete={deleteHandler}
            onClose={setDeleteId.bind(this, null)}
          />
        )}
      </div>
    </Container>
  );
}

export default App;
