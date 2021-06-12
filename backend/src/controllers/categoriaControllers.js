import Pool from "../database/connection";

// Funcion para agregar una categoria
export const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const consulta = await Pool.query(
      "INSERT INTO categoria (nombre) VALUES ($1)",
      [nombre]
    );

    if (consulta) {
      res.status(200).json({
        msg: `La categoria ${nombre} ha sido agregado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para obtener todas las categorias
export const getAllCategoria = async (req, res) => {
  try {
    const consulta = await Pool.query("SELECT * FROM categoria");
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

// Funcion que obtiene una categoria por medio de su id
export const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM categoria WHERE id_categoria = $1",
      [id]
    );

    if (consulta.rows && consulta.rows.length != 0) {
      res.status(200).json({
        data: consulta.rows,
      });
    } else {
      res.json({ msg: `La categoria con id ${id} no existe` });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que actuliza la información de la categoria a partir de su id
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE categoria SET nombre=$1 WHERE id_categoria=$2",
      [nombre, id]
    );

    console.log(consulta);

    if (consulta.rowCount != 0) {
      res.status(200).json({
        msg: `La categoria ${nombre} ha sido actualizado`,
      });
    } else {
      res.status(400).json({ msg: `La categoria con id ${id} no existe` });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para eliminar una categoria de la bd en base a su id
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM categoria WHERE id_categoria=$1",
      [id]
    );

    // console.log(consultaNombre.rows[0].nombre);
    const consulta = await Pool.query(
      "DELETE FROM categoria WHERE id_categoria=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `La categoria ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
