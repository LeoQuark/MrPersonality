import { Router } from "express";

import {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productoControllers.js";

//RUTAS
const router = Router();

//POST
router.post("/create", createProduct);

//GET
router.get("/get/:id", getProductById);
router.get("/getAll", getAllProduct);

//UPDATE o PUT
router.put("/update/:id", updateProduct);

//DELETE
router.delete("/delete/:id", deleteProduct);

export default router;
