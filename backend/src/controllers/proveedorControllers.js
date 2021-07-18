import Pool from "../database/connection";

// Funcion para crear un proveedor
export const createProveedor = async (req, res) => {
  const { rut, nombre, nombre_contacto, correo, direccion, telefono } =
    req.body;
  try {
    const consulta = await Pool.query(
      "INSERT INTO proveedor (rut, nombre, nombre_contacto, correo, direccion, telefono) VALUES ($1,$2,$3,$4,$5,$6)",
      [rut, nombre, nombre_contacto, correo, direccion, telefono]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El proveedor ${nombre} ha sido agregado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para obtener todos los proveedores
export const getAllProveedor = async (req, res) => {
  try {
    const consulta = await Pool.query("SELECT * FROM proveedor");
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

// Funcion que obtiene un proveedor por medio de su id
export const getProveedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM proveedor WHERE id_proveedor = $1",
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
// Funcion para obtener información sobre abastecimientos ordenados por nombre del prov.
export const getAllAbastecer = async (req, res) => {
  try {
    const consulta = await Pool.query(
      "SELECT x.nombre AS proveedor, w.nombre AS producto, y.fecha AS fecha, z.costo_unitario AS precio, z.cantidad AS cantidad, (z.costo_unitario*z.cantidad) AS total FROM proveedor x JOIN abastece y on x.id_proveedor = y.id_proveedor JOIN detalle_abastece z on y.id_abastece = z.id_abastece JOIN producto w on z.id_producto = w.id_producto ORDER BY x.nombre ASC");
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

// Funcion que actuliza la información del proveedor a partir de su id
export const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { rut, nombre, nombre_contacto, correo, direccion, telefono } =
    req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE proveedor SET rut=$1, nombre=$2, nombre_contacto=$3, correo=$4, direccion=$5, telefono=$6 WHERE id_proveedor=$7",
      [rut, nombre, nombre_contacto, correo, direccion, telefono, id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El proveedor ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para eliminar un proveedor de la bd en base a su id
export const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM proveedor WHERE id_proveedor=$1",
      [id]
    );

    // console.log(consultaNombre.rows[0].nombre);
    const consulta = await Pool.query(
      "DELETE FROM proveedor WHERE id_proveedor=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El proveedor ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
