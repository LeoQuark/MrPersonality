import Pool from "../database/connection";

// Funcion para obtener el producto mas vendido
export const getProductoMV = async (req, res) => {
    try {
        const consulta = await Pool.query(
        'SELECT x.id_producto AS ID_PR, y.nombre AS NOMBRE_PRODUCTO, MAX(x.cantidad) AS MAX_CANTIDAD FROM detalle_compra x JOIN producto y ON x.id_producto = y.id_producto JOIN compra b on x.id_compra = b.id_compra WHERE date_part(year,fecha) GROUP BY x.id_producto, y.nombre HAVING MAX(x.cantidad) = (SELECT MAX(cantidad) AS CANTIDAD_VENDIDA FROM detalle_compra)');
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

// Funcion para obtener el total de ventas (en un mes o año)
export const getTotalVentas = async (req, res) => {
  try {
      const consulta = await Pool.query(
      'SELECT SUM(z.precio * y.cantidad) AS TOTAL_VENTAS FROM compra x JOIN detalle_compra y on x.id_compra = y.id_compra JOIN producto z on y.id_producto = z.id_producto WHERE --date_part(year, fecha) ');
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

