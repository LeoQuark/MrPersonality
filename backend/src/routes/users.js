import { Router } from "express";

import { getUser, deleteUser } from "../controllers/userControllers.js";

const router = Router();

router.get("/getUser", getUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
