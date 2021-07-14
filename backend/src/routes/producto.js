import { Router } from "express";
import multer from "../multer";

import {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productoControllers";

//RUTAS
const router = Router();
//POST
router.post("/create", multer.single("imagen"), createProduct);

//GET
router.get("/get/:id", getProductById);
router.get("/getAll", getAllProduct);

//UPDATE o PUT
router.put("/update/:id", updateProduct);

//DELETE
router.delete("/delete/:id", deleteProduct);

export default router;
