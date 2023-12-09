import { Router } from "express";
import AuthRoutes from './Auth.routes.js'
import TaskRoutes from './Tasks.routes.js'

const router = Router()

router.use('/auth',AuthRoutes)
router.use('/tasks',TaskRoutes)

export default router