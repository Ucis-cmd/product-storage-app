import mysql from "mysql2/promise"; // Importing mysql2/promise
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const connection = await mysql.createConnection({
  // Using await to create the connection
  host: "localhost",
  database: "products",
  user: "root",
  password: "root",
});

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
  console.log("DATABASE CONNECTED"); // Removed the connection callback
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/all", async (req, res) => {
  // Using async for asynchronous route handler
  try {
    const sql_query = `SELECT * FROM products`;
    const [rows, fields] = await connection.execute(sql_query);
    res.send(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/edit/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  try {
    const updateFields = Object.keys(updatedData)
      .map((key) => `\`${key}\` = ?`)
      .join(", ");
    const updateValues = Object.values(updatedData);
    const sql_query = `UPDATE products SET ${updateFields} WHERE id = ?`;
    const finalValues = [...updateValues, productId];

    const [rows, fields] = await connection.execute(sql_query, finalValues);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/add", async (req, res) => {
  const newData = req.body;
  try {
    const newDataFields = Object.keys(newData)
      .map((key) => `\`${key}\``)
      .join(", ");
    const newDataValues = Object.values(newData);
    const placeholders = newDataValues.map(() => "?").join(", ");

    const sql_query = `INSERT INTO products (${newDataFields}) VALUES (${placeholders})`;
    const [rows, fields] = await connection.execute(sql_query, newDataValues);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const sql_query = `DELETE FROM products WHERE id = ?`;
    const [rows, fields] = await connection.execute(sql_query, [productId]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
  }
});

process.on("SIGINT", async () => {
  await connection.end();
  process.exit();
});
