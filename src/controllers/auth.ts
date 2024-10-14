import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY!

export const authenticate = (req: Request, res: Response) => {
	const { email } = req.body

	try {
		const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1d" })
		res.status(200).json({ token })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Failed to generate authentication token" })
	}
}
