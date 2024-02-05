
import { Router } from "express";
import { AllTasks, AssignTask, GetTask, SingleTask, UpdateTask, myTask } from "../Tasks/Tasks.controller.js";

const router = Router()

router.post('/task-assign',AssignTask)
router.post('/get-task',GetTask)
// router.post('/complete',CompleteTask)
router.post('/mytask',myTask)
router.get('/all-tasks',AllTasks)
router.post('/update',UpdateTask) 
router.get('/single',SingleTask) 


export default router