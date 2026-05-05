import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";

dotenv.config();

const app = express(); //llamadas a express en variable
app.use(cors()); //uso de cors
app.use(express.json()); //uso de archivos json

//-=-=-=-Clientes-=-=-=-
//get listar
app.get("/clientes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get por id
app.get("/clientes/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes WHERE id=?", [
      req.params.id,
    ]);
    //verificacion de que existe cliente(para nosotros)
    if (rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post agregar
app.post("/clientes", async (req, res) => {
  try {
    const { nombre, email } = req.body;

    const id = uuidv4();

    await pool.query(
      "INSERT INTO clientes (id, nombre, email) VALUES (?,?,?)",
      [id, nombre, email],
    );

    res.status(201).json({ id, nombre, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//put actualizar
app.put("/clientes/:id", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    await pool.query("UPDATE clientes SET nombre=?, email=? WHERE id=?", [
      nombre,
      email,
      req.params.id,
    ]);
    res.json({ mensaje: "ACTUALIZACION ACTUALIZADA CON ACTUALIZACION" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete eliminar
app.delete("/clientes/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM clientes WHERE id=?", [req.params.id]);
    res.json({ mensaje: "ELIMINA'O DE AQUÍ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//-=-=-=-Productos-=-=-=-
app.get("/productos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/productos/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id=?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const id = uuidv4();
    await pool.query(
      "INSERT INTO productos (id, nombre, precio, descripcion) VALUES (?,?,?,?)",
      [id, nombre, precio, descripcion],
    );
    res.status(201).json({ id, nombre, precio, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/productos/:id", async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    await pool.query(
      "UPDATE productos SET nombre=?, precio=?, descripcion=? WHERE id=?",
      [nombre, precio, descripcion, req.params.id],
    );
    res.json({ mensaje: "Producto actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/productos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM productos WHERE id=?", [req.params.id]);
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//-=-=-=-Pets-=-=-=-
app.get("/pets", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pets");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/pets/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pets WHERE id=?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Mascota no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const { nombre, edad, raza, peso, idDueño } = req.body;
    const id = uuidv4();
    await pool.query(
      "INSERT INTO pets (id, nombre, edad, raza, peso, idDueño) VALUES (?,?,?,?,?,?)",
      [id, nombre, edad, raza, peso, idDueño],
    );
    res.status(201).json({ id, nombre, edad, raza, peso, idDueño });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/pets/:id", async (req, res) => {
  try {
    const { nombre, edad, raza, peso, idDueño } = req.body;
    await pool.query(
      "UPDATE pets SET nombre=?, edad=?, raza=?, peso=?, idDueño=? WHERE id=?",
      [nombre, edad, raza, peso, idDueño, req.params.id],
    );
    res.json({ mensaje: "Mascota actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/pets/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM pets WHERE id=?", [req.params.id]);
    res.json({ mensaje: "Mascota eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server corriendo ${process.env.PORT}`);
});
