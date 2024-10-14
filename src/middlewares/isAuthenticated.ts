import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY!

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		console.error("Unauthorized: No token provided")
		res.status(401).json({ message: "Unauthorized: No token provided" })
		return
	}

	const token = authHeader.split(" ")[1]

	if (!token) {
		console.error("Unauthorized: No token provided")
		res.status(401).json({ message: "Unauthorized: Invalid token format" })
		return
	}

	try {
		jwt.verify(token, SECRET_KEY)
		next()
	} catch (error) {
		console.error(error)
		res.status(401).json({ message: "Forbidden: Invalid token" })
	}
}

export default isAuthenticated
