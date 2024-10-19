import express from "express";

import { createUser, loginUser, addTodo, getTodos, deleteTodo } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/add-todo", addTodo);
router.get("/:userId/todos", getTodos);
router.post("/delete-todo", deleteTodo);

export default router;