import Pool from "../database/connection.js";

// Funcion para crear productos
export const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, stock, id_admin } = req.body;
  try {
    const consulta = await Pool.query(
      "INSERT INTO producto (nombre, descripcion,precio,stock,id_admin) VALUES ($1,$2,$3,$4,$5)",
      [nombre, descripcion, precio, stock, id_admin]
    );

    if (consulta) {
      res.status(200).json({
        msg: `producto creado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para obtener todos los productos
export const getAllProduct = async (req, res) => {
  try {
    const consulta = await Pool.query("SELECT * FROM producto");
    // console.log(consulta.rows);
    if (consulta.rows) {
      res.status(200).json({
        data: consulta.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que obtiene un producto por medio de su id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM producto WHERE id_producto = $1",
      [id]
    );

    if (consulta.rows) {
      res.status(200).json({
        data: consulta.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que actuliza la información del admin a partir de su id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE producto SET nombre=$1, descripcion=$2, precio=$3, stock=$4 WHERE id_producto=$5",
      [nombre, descripcion, precio, stock, id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El producto ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para eliminar un producto de la bd en base a su id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM producto WHERE id_producto=$1",
      [id]
    );

    // console.log(consultaNombre.rows[0].nombre);
    const consulta = await Pool.query(
      "DELETE FROM producto WHERE id_producto=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El producto ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
