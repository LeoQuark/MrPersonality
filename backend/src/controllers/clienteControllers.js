import Pool from "../database/connection";

// Funcion para agregar un cliente
export const createCliente = async (req, res) => {
  const { nombre, correo, direccion, telefono } = req.body;
  try {
    const consulta = await Pool.query(
      "INSERT INTO cliente (nombre, correo, direccion, telefono) VALUES ($1,$2,$3,$4)",
      [nombre, correo, direccion, telefono]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El cliente ${nombre} ha sido agregado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para obtener todos los clientes
export const getAllCliente = async (req, res) => {
  try {
    const consulta = await Pool.query("SELECT * FROM cliente");
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

// Funcion que obtiene un cliente por medio de su id
export const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM cliente WHERE id_cliente = $1",
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

// Funcion que actuliza la información del cliente a partir de su id
export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, direccion, telefono } = req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE cliente SET nombre=$1, correo=$2, direccion=$3, telefono=$4 WHERE id_cliente=$5",
      [nombre, correo, direccion, telefono, id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El cliente ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para eliminar un cliente de la bd en base a su id
export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM cliente WHERE id_cliente=$1",
      [id]
    );

    // console.log(consultaNombre.rows[0].nombre);
    const consulta = await Pool.query(
      "DELETE FROM cliente WHERE id_cliente=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El cliente ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
