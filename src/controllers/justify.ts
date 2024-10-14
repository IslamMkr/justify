import { Request, Response } from "express"
import { justifyText } from "../services/justify"

export const justify = (req: Request, res: Response) => {
	const { text } = req.body

	try {
		const justifiedText = justifyText(text)
		res.status(200).send(justifiedText)
	} catch (error) {
		console.error(error)
		res.status(500).send("An error occurred while justifying the text.")
	}
}
