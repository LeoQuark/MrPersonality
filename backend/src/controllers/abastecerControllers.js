import Pool from "../database/connection";

// Funcion para agregar una compra
export const createAbastecer = async (req, res) => {
  const { cantidad, costo_unitario, fecha, id_producto, id_proveedor } = req.body;
  try {
    const id_abastece = await Pool.query(
      "INSERT INTO abastece (fecha, id_proveedor) VALUES ($1,$2) RETURNING id_abastece",
      [fecha, id_proveedor]
    );
    const consulta = await Pool.query(
      "INSERT INTO detalle_abastece (cantidad, costo_unitario, id_abastece, id_producto) VALUES ($1,$2,$3,$4)",
      [cantidad, costo_unitario, id_abastece, id_producto]
    );
    if (consulta) {
      res.status(200).json({
        msg: `La compra ha sido agregada correctamente`,
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
