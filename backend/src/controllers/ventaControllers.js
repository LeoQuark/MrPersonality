import Pool from "../database/connection";

// Funcion para agregar una venta
export const createVenta = async (req, res) => {
  const { cantidad, fecha, entregado, id_producto, tipo_compra, tipo_pago, id_cliente } = req.body;
  try {
    //obtener stock del producto
    const stock_producto = await Pool.query(
      "SELECT cantidad FROM detalle_compra WHERE id_producto=$1",
      [id_producto]
    );
    if(stock_producto.rows[0].stock >= cantidad){
      //insert tipo pago
      const insert_tipopago = await Pool.query(
      "INSERT INTO tipo_pago (tipo_pago) VALUES ($1) ON CONFLICT (tipo_pago) DO NOTHING ",
      [tipo_pago]
      );
      //Obtener el id_tipo_pago
      const id_tipo_pago = await Pool.query(
      "SELECT id_tipo_pago FROM tipo_pago WHERE tipo_pago=$1",
      [tipo_pago]
      );
      //insert tipo compra
      const insert_tipocompra = await Pool.query(
      "INSERT INTO tipo_compra (tipo_compra) VALUES ($1) ON CONFLICT (tipo_compra) DO NOTHING ",
      [tipo_compra]
      );
      //obtener el id_tipo_compra
      const id_tipo_compra = await Pool.query(
      "INSERT INTO compra (tipo_compra) VALUES ($1) WHERE tipo_compra=$1 ",
      [tipo_compra]
      );
      //insertar detalle_compra
      const consulta = await Pool.query(
      "INSERT INTO detalle_compra (cantidad, fecha, entregado, id_producto, id_tipo_compra, id_tipo_pago, id_cliente) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [cantidad, fecha, entregado, id_producto, id_tipo_compra.rows[0].id_tipo_compra, id_tipo_pago.rows[0].id_tipo_pago, id_cliente]
      );
      //update stock
      const update_producto = await Pool.query(
        "INSERT INTO producto (stock) VALUES ($1)",
          [stock_producto[0].stock - cantidad]
      );

      if (consulta) {
        res.status(200).json({
          msg: `La venta ha sido agregada correctamente`,
        });
      }
      
    }
    else{
      //si no hay suficiente stock:((
    }
  }
  catch (error) {
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

// Funcion para eliminar una venta de la bd en base a su id
export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const delete_venta = await Pool.query(
      "SELECT * FROM detalle_compra WHERE id_detalle_compra=$1",
      [id]
    );


    if (delete_venta) {
      res.status(200).json({
        msg: `El producto ${producto.nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};