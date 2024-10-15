import { Router } from "express"

import { justify, justifyWithLength } from "../controllers/justify"

import isAuthenticated from "../middlewares/isAuthenticated"
import rateLimiting from "../middlewares/rateLimiting"
import { validateJustifyLengthRequestPayload, validateJustifyRequestPayload } from "../middlewares/validation"

const justifyRoutes = Router()

// POST /api/justify
justifyRoutes.post("/", isAuthenticated, validateJustifyRequestPayload, rateLimiting, justify)

// POST /api/justify/:length
justifyRoutes.post(
	"/:length",
	isAuthenticated,
	validateJustifyRequestPayload,
	validateJustifyLengthRequestPayload,
	rateLimiting,
	justifyWithLength
)

export default justifyRoutes
