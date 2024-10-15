import { Request, Response, NextFunction } from "express"

/**
 * Interface representing the usage of a token.
 *
 * @property {number} count - The number of times the token has been used.
 * @property {Date} lastRequestDate - The date and time when the token was last used.
 */
interface TokenUsage {
	count: number
	lastRequestDate: Date
}

const MAX_WORDS_PER_DAY = 80000

/**
 * A map that tracks the usage of tokens.
 *
 * @type {Object.<string, TokenUsage>}
 */
const tokensUsageMap: { [key: string]: TokenUsage } = {}

/**
 * Middleware to enforce rate limiting based on word count per day.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack.
 * @returns {void}
 * @throws Will send a 402 Payment Required response if the word limit is exceeded.
 * @throws Will send a 400 Bad Request response if an error occurs during processing.
 */
const rateLimiting = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization!.split(" ")[1]

		const usage = tokensUsageMap[token]
		const today = new Date().toDateString()

		if (!usage || usage.lastRequestDate.toDateString() !== today) {
			tokensUsageMap[token] = {
				count: 0,
				lastRequestDate: new Date(),
			}
		}

		const wordCount = req.body.split(" ").length

		if (tokensUsageMap[token].count + wordCount > MAX_WORDS_PER_DAY) {
			console.error("Payment Required: Word limit exceeded")
			res.status(402).send("Payment Required")
			return
		}

		tokensUsageMap[token].count += wordCount

		next()
	} catch (error) {
		console.error(error)
		res.status(401).send("Bad Request")
	}
}

export default rateLimiting
