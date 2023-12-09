
import { Router } from "express";
import { AssignTask, GetTask } from "../Tasks/Tasks.controller.js";

const router = Router()

router.post('/task-assign',AssignTask)
router.post('/get-task',GetTask)


export default router