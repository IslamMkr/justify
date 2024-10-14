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
