import { Router } from "express"

import { justify } from "../controllers/justify"

import isAuthenticated from "../middlewares/isAuthenticated"

const justifyRoutes = Router()

justifyRoutes.post("/", isAuthenticated, justify)

export default justifyRoutes
