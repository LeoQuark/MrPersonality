import { Router } from "express";

import {
  createProveedor,
  getProveedorById,
  getAllProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/proveedorControllers";

//RUTAS
const router = Router();

//POST
router.post("/create", createProveedor);

//GET
router.get("/get/:id", getProveedorById);
router.get("/getAll", getAllProveedor);

//UPDATE o PUT
router.put("/update/:id", updateProveedor);

//DELETE
router.delete("/delete/:id", deleteProveedor);

export default router;
