import { CurrentUser, DeleteUser, Login, Register } from "../Controllers/Auth.controller.js";
import { Router } from "express";

const router = Router()

router.post('/login',Login)
router.post('/register',Register)
router.post('/deleteUser',DeleteUser)
router.post('/current-user',CurrentUser)

export default router