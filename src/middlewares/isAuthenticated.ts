import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY!

/**
 * Middleware to check if the request is authenticated.
 *
 * This middleware function checks for the presence of an authorization header
 * in the incoming request.
 *
 * @param req - The incoming request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns {void}
 * @throws Will respond with a 401 status if no token is provided or if the token format is invalid.
 * @throws Will respond with a 403 status if the token is invalid.
 */
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
