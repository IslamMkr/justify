import { NextFunction, Request, Response } from "express"
import { isValidEmail } from "../utils/email"

/**
 * Middleware to validate the presence of an email in the request body.
 * & is a valid email format.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const validateAuthRequestPayload = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body

	if (!email || email.trim() === "") {
		console.error("Email is required")
		res.status(400).json({ message: "Email is required" })
		return
	}

	if (typeof email !== "string" || !isValidEmail(email)) {
		console.error("Invalid email format")
		res.status(400).json({ message: "Invalid email format" })
		return
	}

	next()
}

/**
 * Middleware to validate the presence of text in the request body.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const validateJustifyRequestPauload = (req: Request, res: Response, next: NextFunction) => {
	const { text, lineLength } = req.body

	if (!text) {
		console.error("Text is required")
		res.status(400).json({ message: "Text is required" })
		return
	}

	if (typeof text !== "string" || text.trim() === "") {
		console.error("Invalid text format")
		res.status(400).json({ message: "Invalid text format" })
		return
	}

	if (lineLength !== undefined && (typeof lineLength !== "number" || lineLength < 1)) {
		console.error("Invalid line length format")
		res.status(400).json({ message: "Invalid line length format" })
		return
	}

	next()
}
