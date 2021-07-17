import Pool from "../database/connection";
import path from "path";
import fs from "fs-extra";

// Funcion para crear productos
export const createProduct = async (req, res) => {
  const {
    nombre,
    descripcion,
    stock,
    empaque,
    intereses,
    ffee,
    precio,
    categoria,
    talla,
    color,
    tipo,
    id_admin,
  } = req.body;
  //El objeto entregado por req.file contine toda la info del archivo subido (fieldname,originalname,encoding,mimetype,des tination,size,path,etc)
  const { path } = req.file;
  try {
    // console.log(path);
    //EN LA BASE DE DATOS SOLO HAY QUE GUARDAR LA RUTA DEL ARCHIVO, SOLO EL PATH

    //insertar y consultar id/ categoria, talla, color, tipo
    const test = await Pool.query(
      "INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING RETURNING id_categoria",
      [categoria]
    );
    const prueba = await Pool.query(
      "SELECT id_categoria FROM categoria WHERE nombre=$1",
      [categoria]
    );
    console.log(prueba);
    console.log(test);
    const id_talla = await Pool.query(
      "INSERT INTO talla (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING RETURNING id_talla",
      [talla]
    );
    const id_color = await Pool.query(
      "INSERT INTO color (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING RETURNING id_color",
      [color]
    );
    const id_tipo = await Pool.query(
      "INSERT INTO tipo (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING RETURNING id_tipo",
      [tipo]
    );

    //agregar el producto
    const consulta = await Pool.query(
      "INSERT INTO producto (nombre, descripcion, stock, empaque, intereses_tarjeta, ffee_traslado, precio, imagen, id_categoria, id_talla, id_color, id_tipo, id_admin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [
        nombre,
        descripcion,
        stock,
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
    // const consulta = true;
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
    const consulta = await Pool.query(
      "SELECT producto.id_producto AS id_producto, producto.nombre AS nombre, producto.descripcion AS descripcion, producto.stock AS stock, producto.empaque AS empaque, producto.intereses_tarjeta AS intereses_tarjeta, producto.ffee_traslado AS ffee_traslado, (producto.precio - (detalle_abastece.costo_unitario) - producto.empaque - producto.intereses_tarjeta - producto.ffee_traslado ) AS Margen, (producto.precio) AS rentabilidad, producto.precio AS precio, producto.imagen AS imagen FROM producto JOIN categoria on producto.id_categoria = categoria.id_categoria JOIN talla on producto.id_talla = talla.id_talla JOIN color on producto.id_color = color.id_color JOIN tipo on producto.id_tipo = tipo.id_tipo JOIN detalle_abastece on producto.id_producto = detalle_abastece.id_producto"
    );
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
