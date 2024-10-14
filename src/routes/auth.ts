import { Router } from "express"
import { authenticate } from "../controllers/auth"
import { validateEmail } from "../middlewares/validation"

const authRoutes = Router()

authRoutes.post("/", validateEmail, authenticate)

export default authRoutes
