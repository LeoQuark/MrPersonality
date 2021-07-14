import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
//Rutas
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import productRoutes from "./routes/producto";
import proveedorRoutes from "./routes/proveedor";
import clienteRoutes from "./routes/cliente";
import comunaRoutes from "./routes/comuna";
import categoriaRoutes from "./routes/categoria";

//Para ocupar variables ocultas .env
dotenv.config();

//Iniciamos express
const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "uploads/")));

//Middlewares}
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Headers para la api
app.use(cors());

//Ruta inicial de la API
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/producto", productRoutes);
app.use("/api/proveedor", proveedorRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/comuna", comunaRoutes);
app.use("/api/categoria", categoriaRoutes);

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
