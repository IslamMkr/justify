import { Request, Response } from "express"
import jwt from "jsonwebtoken"

/**
 * Authenticates a user by generating a JWT token.
 *
 * @param req - The request object containing the user's email in the body.
 * @param res - The response object used to send back the JWT token or an error message.
 * @returns {string} A JWT token if the user is authenticated.
 * @throws Will return a 400 status code and an error message if token generation fails.
 */
export const authenticate = (req: Request, res: Response) => {
	const { email } = req.body

	try {
		const token = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: "1d" })
		res.status(200).json({ token })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Failed to generate authentication token" })
	}
}
