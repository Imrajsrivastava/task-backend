import express from "express";
import {
  createTaskCtrl,
  getTasksCtrl,
  getTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTaskCtrl);
router.get("/", getTasksCtrl);
router.get("/:id", getTaskCtrl);
router.put("/:id", updateTaskCtrl);
router.delete("/:id", deleteTaskCtrl);

export default router;
