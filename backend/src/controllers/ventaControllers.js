import Pool from "../database/connection";

// Funcion para agregar una compra
export const createVenta = async (req, res) => {
  const { cantidad, otros_gastos, id_producto,  fecha, tipo_compra, tipo_pago, id_cliente } = req.body;
  try {
    const id_tipo_pago = await Pool.query(
    "INSERT INTO tipo_pago (tipo_pago) VALUES ($1) ON CONFLICT (tipo_pago) DO NOTHING RETURNING id_tipo_pago",
    [tipo_pago]
    );
    const id_tipo_compra = await Pool.query(
    "INSERT INTO tipo_compra (tipo_compra) VALUES ($1) ON CONFLICT (tipo_compra) DO NOTHING RETURNING id_tipo_compra",
    [tipo_compra]
    );
    const id_compra = await Pool.query(
    "INSERT INTO compra (fecha, id_tipo_pago,id_cliente) VALUES ($1,$2,$3) RETURNING id_compra",
    [fecha, id_tipo_pago, id_cliente]
    );
    const consulta = await Pool.query(
      "INSERT INTO detalle_compra (cantidad, otros_gastos, id_producto, id_compra, id_tipo_compra) VALUES ($1,$2,$3,$4,$5)",
      [cantidad, otros_gastos, id_producto, id_compra, id_tipo_compra]
    );
    if (consulta) {
      res.status(200).json({
        msg: `La venta ha sido agregada correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion para obtener información sobre ventas
export const getAllVentas = async (req, res) => {
  try {
    const consulta = await Pool.query(
      "SELECT x.fecha AS fecha, y.nombre AS cliente, w.nombre AS producto, q.cantidad AS cantidad, (q.cantidad*w.precio) AS total, r.tipo_compra AS tipo_compra FROM compra x JOIN cliente y on x.id_cliente = y.id_cliente JOIN tipo_pago z on x.id_tipo_pago = z.id_tipo_pago JOIN detalle_compra q on x.id_compra = q.id_compra JOIN producto w on q.id_producto = w.id_producto JOIN tipo_compra r on q.id_tipo_compra = r.id_tipo_compra ORDER BY fecha DESC");
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