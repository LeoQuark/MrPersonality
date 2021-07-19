import Pool from "../database/connection";

// Funcion para agregar un cliente
export const createCliente = async (req, res) => {
  const {
    nombre,
    correo,
    direccion,
    telefono,
    user_instagram,
    comuna,
    region,
  } = req.body;
  try {
    console.log(
      nombre,
      correo,
      direccion,
      telefono,
      user_instagram,
      comuna,
      region
    );
    //insertar y consultar comuna, region
    const insert_comuna = await Pool.query(
      "INSERT INTO comuna (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [comuna]
    );
    const id_comuna = await Pool.query(
      "SELECT id_comuna FROM comuna WHERE nombre=$1",
      [comuna]
    );

    const insert_region = await Pool.query(
      "INSERT INTO region (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING",
      [region]
    );

    const id_region = await Pool.query(
      "SELECT id_region FROM region WHERE nombre=$1",
      [region]
    );
    console.log(id_region.rows[0]);

    const consulta = await Pool.query(
      "INSERT INTO cliente (nombre, correo, direccion, telefono, user_instagram, id_comuna, id_region) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        nombre,
        correo,
        direccion,
        telefono,
        user_instagram,
        id_comuna.rows[0].id_comuna,
        id_region.rows[0].id_region,
      ]
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
    const consulta = await Pool.query(
      "SELECT * FROM cliente x JOIN comuna y on x.id_comuna = y.id_comuna JOIN region z on x.id_region = z.id_region"
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

// Funcion que obtiene un cliente por medio de su id
export const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * cliente x JOIN comuna y on x.id_comuna = y.id_comuna JOIN ciudad z on x.id_ciudad = z.id_ciudad WHERE id_cliente = $1",
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
  const {
    nombre,
    correo,
    direccion,
    telefono,
    user_instagram,
    id_comuna,
    id_region,
  } = req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE cliente SET nombre=$1, correo=$2, direccion=$3, telefono=$4, user_instagram=$5, id_comuna=$6, id_region=$7 WHERE id_cliente=$8",
      [
        nombre,
        correo,
        direccion,
        telefono,
        user_instagram,
        id_comuna,
        id_region,
        id,
      ]
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
