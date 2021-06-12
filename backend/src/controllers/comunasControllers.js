import Pool from "../database/connection";
import axios from "axios";

export const llenarComunas = async (req, res) => {
  try {
    const comunas = new Array();

    const comunasSantiago = await axios
      .get("https://apis.digital.gob.cl/dpa/regiones/13/comunas")
      .then((response) => {
        response.data.map((comuna) => comunas.push(comuna.nombre));
      });

    const llenar = (comunas) => {
      comunas.map(async (comuna) => {
        const consulta = await Pool.query(
          "INSERT INTO comuna (nombre) VALUES ($1)",
          [comuna]
        );
      });
    };

    // llenar(comunas);

    res.json({ msg: "Comunas de la RM agregadas correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const getComunaById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM comuna WHERE id_comuna=$1",
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
