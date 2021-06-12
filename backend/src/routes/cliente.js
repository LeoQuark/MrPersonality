import { Router } from "express";

import {
  createCliente,
  getClienteById,
  getAllCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clienteControllers";

//RUTAS
const router = Router();

//POST
router.post("/create", createCliente);

//GET
router.get("/get/:id", getClienteById);
router.get("/getAll", getAllCliente);

//UPDATE o PUT
router.put("/update/:id", updateCliente);

//DELETE
router.delete("/delete/:id", deleteCliente);

export default router;
