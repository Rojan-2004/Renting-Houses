import express from "express";
import { userController } from "../../controller/index.js";
const router = express.Router();
router.get("/", userController.getAll);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.delete("/:id", userController.delelteById);
router.get('/count', userController.getUserCount);
router.put('/:id/ban', userController.banUser);
router.put('/:id/unban', userController.unbanUser);
router.delete('/:id/delete', userController.deleteUser);

export { router as userRouter };
