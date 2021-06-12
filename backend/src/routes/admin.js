import { Router } from "express";

import {
  createAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminControllers";

//RUTAS
const router = Router();

//POST
router.post("/create", createAdmin);

//GET
router.get("/get/:id", getAdmin);
router.get("/getAll", getAllAdmin);

//UPDATE o PUT
router.put("/update/:id", updateAdmin);

//DELETE
router.delete("/delete/:id", deleteAdmin);

export default router;
