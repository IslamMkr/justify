import { Request, Response } from "express"
import { justifyText } from "../services/justify"

/**
 * Justifies the provided text from the request body and sends it back as plain text.
 *
 * @param req - The request object containing the text to be justified.
 * @param res - The response object used to send the justified text or an error message.
 * @returns {string} The justified text.
 * @throws Will send a 400 status code with an error message if something goes wrong during justification.
 */
export const justify = (req: Request, res: Response) => {
	try {
		const justifiedText = justifyText(req.body)
		res.setHeader("Content-Type", "text/plain")
		res.status(200).send(justifiedText)
	} catch (error) {
		console.error(error)
		res.status(500).send("An error occurred while justifying the text.")
	}
}

/**
 * Justifies the text provided in the request body to the specified length.
 *
 * @param req - The request object containing the text to be justified and the desired length.
 * @param res - The response object used to send the justified text or an error message.
 * @returns {string} The justified text.
 * @throws Will send a 500 status code if an error occurs during the justification process.
 */
export const justifyWithLength = (req: Request, res: Response) => {
	try {
		const justifiedText = justifyText(req.body, Number(req.params.length))
		res.setHeader("Content-Type", "text/plain")
		res.status(200).send(justifiedText)
	} catch (error) {
		console.error(error)
		res.status(500).send("An error occurred while justifying the text.")
	}
}
