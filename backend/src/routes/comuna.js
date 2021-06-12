import { Router } from "express";

import {
  llenarComunas,
  getComunaById,
} from "../controllers/comunasControllers";

//RUTAS
const router = Router();

//GET PARA RELLENAR LAS COMUNAS CON LA API DEL GOBIERNO
router.get("/get", llenarComunas);

//GET PARA OBTENER UNA COMUNA POR SU ID
router.get("/get/:id", getComunaById);

export default router;
