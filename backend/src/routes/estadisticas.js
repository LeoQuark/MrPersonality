import { Router } from "express";

import {
  getProductoMV,
  getTotalVentas,
  estadisticas,
} from "../controllers/estadisiticasControllers";

//RUTAS
const router = Router();

//GET
router.get("/estadisticas", estadisticas);

export default router;
