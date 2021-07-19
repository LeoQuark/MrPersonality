import { Router } from "express";

import { createVenta, getAllVentas } from "../controllers/ventaControllers";

//RUTAS
const router = Router();
//POST
router.post("/create", createVenta);

//GET
// router.get("/get/:id", getProductById);
router.get("/getAll", getAllVentas);

//UPDATE o PUT
// router.put("/update/:id", updateProduct);

//DELETE
// router.delete("/delete/:id", deleteProduct);

export default router;
