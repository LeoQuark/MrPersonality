import Pool from "../database/connection";
import bcryptjs from "bcryptjs";

export const createAdmin = async (req, res) => {
  // Obtengo los valores del formulario (req.body)
  const { nombre, correo, password } = req.body;
  try {
    //Encriptar la contraseña
    const saltos = bcryptjs.genSaltSync();
    const passEncrypted = bcryptjs.hashSync(password, saltos);

    const crearAdmin = await Pool.query(
      "INSERT INTO admin (nombre,correo,password) VALUES ($1,$2,$3)",
      [nombre, correo, passEncrypted]
    );

    if (crearAdmin) {
      res.status(200).json({
        msg: `Admin creado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
};

// Funcion que obtiene el admin por medio de su id
export const getAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM admin WHERE id_admin = $1",
      [id]
    );
    const { password, ...user } = consulta.rows[0];

    // console.log(user);
    if (consulta) {
      res.status(200).json({
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que obtiene todos los admin
export const getAllAdmin = async (req, res) => {
  try {
    const consulta = await Pool.query("SELECT * FROM admin");

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
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const { path } = req.file;
  try {
    const consulta = await Pool.query(
      "UPDATE admin SET nombre=$1, correo=$2, imagen=$3 WHERE id_admin=$4",
      [nombre, correo, path, id]
    );
    // console.log(consulta);

    if (consulta) {
      res.status(200).json({
        msg: `El usuario/admin ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que elimina de la bd un admin a partir de su id
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM admin WHERE id_admin=$1",
      [id]
    );
    const consulta = await Pool.query("DELETE FROM admin WHERE id_admin=$1", [
      id,
    ]);

    if (consulta) {
      res.status(200).json({
        msg: `El usuario/admin ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
