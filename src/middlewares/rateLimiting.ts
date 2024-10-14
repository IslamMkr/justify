import { Request, Response, NextFunction } from "express"

interface TokenUsage {
	count: number
	lastRequestDate: Date
}

const MAX_WORDS_PER_DAY = 80000

const tokensUsageMap: { [key: string]: TokenUsage } = {}

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

		const wordCount = req.body.text!.split(" ").length

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
