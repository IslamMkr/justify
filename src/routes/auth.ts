import { Router } from "express"
import { authenticate } from "../controllers/auth"
import { validateAuthRequestPayload } from "../middlewares/validation"

const authRoutes = Router()

authRoutes.post("/", validateAuthRequestPayload, authenticate)

export default authRoutes
