import { Router } from "express"

import { justify } from "../controllers/justify"

import isAuthenticated from "../middlewares/isAuthenticated"
import rateLimiting from "../middlewares/rateLimiting"
import { validateText } from "../middlewares/validation"

const justifyRoutes = Router()

justifyRoutes.post("/", isAuthenticated, validateText, rateLimiting, justify)

export default justifyRoutes
