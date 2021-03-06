import Pool from "../database/connection";
import path from "path";
import fs from "fs-extra";

// Funcion para crear productos
//datos (nombre, descripcion, empaque, intereses, ffee, precio, imagen, categoria, talla, color, tipo, cantidad, costo_unitario, recibido, id_proveedor)
export const createProduct = async (req, res) => {
  const {
    nombre,
    descripcion,
    empaque,
    intereses,
    ffee,
    precio,
    categoria,
    talla,
    color,
    tipo,
    cantidad,
    costo_unitario,
    fecha,
    recibido,
    id_admin,
    id_proveedor,
  } = req.body;
  //El objeto entregado por req.file contine toda la info del archivo subido (fieldname,originalname,encoding,mimetype,des tination,size,path,etc)
  const { path } = req.file;
  try {
    //insertar categoria
    const insert_categoria = await Pool.query(
      "INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [categoria]
    );
    //Obtener el id_categoria del dato ingresado
    const id_categoria = await Pool.query(
      "SELECT id_categoria FROM categoria WHERE nombre=$1",
      [categoria]
    );
    //insert talla
    const insert_talla = await Pool.query(
      "INSERT INTO talla (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [talla]
    );
    //obtener el id_talla del dato ingresado
    const id_talla = await Pool.query(
      "SELECT id_talla FROM talla WHERE nombre=$1",
      [talla]
    );
    //insert color
    const insert_color = await Pool.query(
      "INSERT INTO color (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [color]
    );
    //Obtener id_color
    const id_color = await Pool.query(
      "SELECT id_color FROM color WHERE nombre=$1",
      [color]
    );
    //insert tipo
    const insert_tipo = await Pool.query(
      "INSERT INTO tipo (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [tipo]
    );
    //Obtener id_tipo
    const id_tipo = await Pool.query(
      "SELECT id_tipo FROM tipo WHERE nombre=$1",
      [tipo]
    );
    //consulta para conocer el stock actual****
    const stock = await Pool.query(
      "SELECT stock FROM producto WHERE nombre=$1",
      [nombre]
    );

    // console.log(stock);
    const stockReal = (stock) => {
      if (stock.rows[0] != null) {
        return stock.rows[0].stock;
      }
      if (stock.rowCount == 0) {
        return 0;
      }
    };
    // console.log(stockReal(stock));
    // agregar producto
    const insert_producto = await Pool.query(
      "INSERT INTO producto (nombre, descripcion, stock, empaque, intereses_tarjeta, ffee_traslado, precio, imagen, id_categoria, id_talla, id_color, id_tipo, id_admin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [
        nombre,
        descripcion,
        stockReal(stock) + cantidad,
        empaque,
        intereses,
        ffee,
        precio,
        path,
        id_categoria.rows[0].id_categoria,
        id_talla.rows[0].id_talla,
        id_color.rows[0].id_color,
        id_tipo.rows[0].id_tipo,
        id_admin,
      ]
    );
    //obtener id_producto
    const id_producto = await Pool.query(
      "SELECT id_producto FROM producto WHERE nombre=$1",
      [nombre]
    );
    //insert detalle_abastece
    const insert_detalle_abastece = await Pool.query(
      "INSERT INTO detalle_abastece (cantidad, costo_unitario, fecha, recibido, id_producto, id_proveedor) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        cantidad,
        costo_unitario,
        fecha,
        recibido,
        id_producto.rows[0].id_producto,
        id_proveedor,
      ]
    );
    if (insert_producto && insert_detalle_abastece) {
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
    //consulta retorna toda la info del producto, falta que retorne toda la infor de todos los Productos
    const consulta = await Pool.query(
      "SELECT producto.id_producto AS id_producto, producto.nombre AS nombre, producto.descripcion AS descripcion, producto.stock AS stock, producto.empaque AS empaque, producto.intereses_tarjeta AS intereses_tarjeta, producto.ffee_traslado AS ffee_traslado, categoria.nombre AS categoria, producto.precio AS precio, producto.imagen AS imagen,talla.nombre AS talla, color.nombre AS color, tipo.nombre AS tipo, (producto.precio - x.costo_unitario - producto.empaque - producto.intereses_tarjeta - producto.ffee_traslado) AS margen, ((producto.precio - x.costo_unitario - producto.empaque - producto.intereses_tarjeta - producto.ffee_traslado)/(x.costo_unitario + producto.empaque + producto.intereses_tarjeta + producto.ffee_traslado)) as rentabilidad, proveedor.nombre AS proveedor, producto.imagen AS imagen FROM producto JOIN categoria on producto.id_categoria = categoria.id_categoria JOIN talla on producto.id_talla = talla.id_talla JOIN color on producto.id_color = color.id_color JOIN tipo on producto.id_tipo = tipo.id_tipo JOIN detalle_abastece x on x.id_producto = producto.id_producto JOIN proveedor on x.id_proveedor = proveedor.id_proveedor"
    );
    // console.log(consulta);
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
      "SELECT * FROM producto JOIN categoria on producto.id_categoria = categoria.id_categoria JOIN talla on producto.id_talla = talla.id_talla JOIN color on producto.id_color = color.id_color JOIN tipo on producto.id_tipo = tipo.id_tipo WHERE id_producto = $1",
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
// Funcion que actualiza un producto y proveedor x id (PARA CUANDO SE MUESTREN SOLO LOS PRODUCTOS)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    empaque,
    intereses,
    ffee,
    precio,
    categoria,
    talla,
    color,
    tipo,
  } = req.body;
  try {
    //insertar categoria
    const insert_categoria = await Pool.query(
      "INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [categoria]
    );
    //Obtener el id_categoria del dato ingresado
    const id_categoria = await Pool.query(
      "SELECT id_categoria FROM categoria WHERE nombre=$1",
      [categoria]
    );
    //insert talla
    const insert_talla = await Pool.query(
      "INSERT INTO talla (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [talla]
    );
    //obtener el id_talla del dato ingresado
    const id_talla = await Pool.query(
      "SELECT id_talla FROM talla WHERE nombre=$1",
      [talla]
    );
    //insert color
    const insert_color = await Pool.query(
      "INSERT INTO color (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [color]
    );
    //Obtener id_color
    const id_color = await Pool.query(
      "SELECT id_color FROM color WHERE nombre=$1",
      [color]
    );
    //insert tipo
    const insert_tipo = await Pool.query(
      "INSERT INTO tipo (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [tipo]
    );
    //Obtener id_tipo
    const id_tipo = await Pool.query(
      "SELECT id_tipo FROM tipo WHERE nombre=$1",
      [tipo]
    );

    const consulta = await Pool.query(
      "UPDATE producto SET nombre=$1, descripcion=$2, empaque=$3, intereses=$4, ffee=$5, precio=$6, id_categoria=$7, id_talla=$8, id_color=$9, id_tipo=$10 WHERE id_producto=$11",
      [
        nombre,
        descripcion,
        empaque,
        intereses,
        ffee,
        precio,
        id_categoria.rows[0].id_categoria,
        id_talla.rows[0].id_talla,
        id_color.rows[0].id_color,
        id_tipo.rows[0].id_tipo,
        id,
      ]
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

// Funcion que actualiza detalle_abastece x id (PARA CUANDO SE MUESTREN LOS PRODUCTOS EN LOS PROVEEDORES)
export const updateDetalle_abastece = async (req, res) => {
  const { nombre, cantidad, costo_unitario, recibido, proveedor, id_producto } =
    req.body;
  const { id } = req.params;
  try {
    const cantidad_ = await Pool.query(
      "SELECT cantidad FROM detalle_abastece WHERE id_detalle_abastece=$1",
      [id]
    );

    //insert proveedor
    const insert_proveedor = await Pool.query(
      "INSERT INTO proveedor (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [proveedor]
    );
    //Obtener id_proveedor
    const id_proveedor = await Pool.query(
      "SELECT id_proveedor FROM tipo WHERE nombre=$1",
      [proveedor]
    );

    const update_detalle_abastece = await Pool.query(
      "UPDATE detalle_abastece SET cantidad=$1, costo_unitario=$2, recibido=$3, id_proveedor=$4, WHERE id_detalle_abastece=$5",
      [
        cantidad,
        costo_unitario,
        recibido,
        id_proveedor.rows[0].id_proveedor,
        id,
      ]
    );
    const update_producto = await Pool.query(
      "UPDATE producto SET stock=$1, WHERE id_producto=$2",
      [stock + cantidad - cantidad_.rows[0].cantidad, id_producto]
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
    const consultaProducto = await Pool.query(
      "SELECT * FROM producto WHERE id_producto=$1",
      [id]
    );

    const producto = consultaProducto.rows[0];

    //Eliminar la imagen del producto de nuestro backend
    if (producto.imagen) {
      await fs.unlink(path.resolve(producto.imagen));
    }

    const consulta = await Pool.query(
      "DELETE FROM producto WHERE id_producto=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El producto ${producto.nombre} ha sido eliminado de la BD.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
