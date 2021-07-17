import { Router } from "express";
import { check } from "express-validator";
import multer from "../multer";
//Middlewares
import { validarCampos } from "../middlewares/validation";
import { validateJwt } from "../middlewares/validate-jwt";
//Helpers
import { isEmailValid, existUserForId } from "../helpers/db-validators";
//Controllers
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
router.post(
  "/create",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").isLength({ min: 5 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(isEmailValid),
    validarCampos,
  ],
  createAdmin
);

//GET
router.get(
  "/get/:id",
  [check("id").custom(existUserForId), validarCampos],
  getAdmin
);

router.get("/getAll", getAllAdmin);

//UPDATE o PUT
router.put(
  "/update/:id",
  [check("id").custom(existUserForId), validarCampos],
  multer.single("imagen"),
  updateAdmin
);

//DELETE
router.delete(
  "/delete/:id",
  [
    //Validar que exista el token del usuario
    validateJwt,
    check("id").custom(existUserForId),
    validarCampos,
  ],
  deleteAdmin
);

export default router;
