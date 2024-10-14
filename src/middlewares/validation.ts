import { NextFunction, Request, Response } from "express"

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body

	if (!email) {
		console.error("Email is required")
		res.status(400).json({ message: "Email is required" })
		return
	}

	next()
}

export const validateText = (req: Request, res: Response, next: NextFunction) => {
	const { text } = req.body

	if (!text) {
		console.error("Text is required")
		res.status(400).json({ message: "Text is required" })
		return
	}

	next()
}
