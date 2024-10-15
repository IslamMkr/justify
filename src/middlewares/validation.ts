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
export const validateJustifyRequestPayload = (req: Request, res: Response, next: NextFunction) => {
	const text = req.body as string

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

	next()
}

/**
 * Middleware to validate the request payload for justifying text length.
 *
 * This middleware checks if the `length` parameter is present in the request,
 * and if it is a valid number greater than 0. If the validation fails, it sends
 * a 400 status response with an appropriate error message.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @returns void
 */
export const validateJustifyLengthRequestPayload = (req: Request, res: Response, next: NextFunction) => {
	const { length } = req.params

	if (!length) {
		console.error("Line length is required")
		res.status(400).json({ message: "Line length is required" })
		return
	}

	if (isNaN(Number(length)) || Number(length) < 1) {
		console.error("Invalid line length format")
		res.status(400).json({ message: "Invalid line length format" })
		return
	}

	next()
}
