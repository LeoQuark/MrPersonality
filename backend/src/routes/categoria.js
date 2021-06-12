import { Router } from "express";

import {
  createCategoria,
  getCategoriaById,
  getAllCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoriaControllers";

//RUTAS
const router = Router();

//POST
router.post("/create", createCategoria);

//GET
router.get("/get/:id", getCategoriaById);
router.get("/getAll", getAllCategoria);

//UPDATE o PUT
router.put("/update/:id", updateCategoria);

//DELETE
router.delete("/delete/:id", deleteCategoria);

export default router;
