import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

//Rutas
import adminRoutes from "./routes/admin.js";
import productRoutes from "./routes/producto.js";

//Para ocupar variables ocultas .env
dotenv.config();

//Iniciamos express
export const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Headers para la api
app.use(cors());

//Ruta inicial de la API
app.use("/api/admin", adminRoutes);
app.use("/api/producto", productRoutes);

//Se declara el puerto en el que correrá el servidor por medio de .env o asignandole por defecto el port:4000
const PORT = process.env.PORT || 4000;
//Se inicia el servidor en determinado puerto (port)
app.listen(PORT, () => {
  try {
    console.log(`PORT ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
