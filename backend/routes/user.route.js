import express from "express";

import { createUser, loginUser, addTodo, getTodos, deleteTodo, editTodo } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/add-todo", addTodo);
router.get("/:userId/todos", getTodos);
router.post("/delete-todo", deleteTodo);
router.post("/edit-todo", editTodo);
router.get("/test",(req,res,next)=>res.send("it worked"));

export default router;