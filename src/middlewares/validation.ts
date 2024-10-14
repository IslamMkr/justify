import { NextFunction, Request, Response } from "express"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Middleware to validate the presence of an email in the request body.
 * & is a valid email format.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body

	if (!email) {
		console.error("Email is required")
		res.status(400).json({ message: "Email is required" })
		return
	}

	if (!EMAIL_REGEX.test(email)) {
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
export const validateText = (req: Request, res: Response, next: NextFunction) => {
	const { text } = req.body

	if (!text) {
		console.error("Text is required")
		res.status(400).json({ message: "Text is required" })
		return
	}

	next()
}
