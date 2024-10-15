/**
 * Justifies a given text to fit within a specified line length.
 * Handles consecutive newlines by reducing them to one and preserves paragraph structure.
 *
 * @param text - The text to be justified.
 * @param lineLength - The maximum length of each line. Defaults to 80 characters.
 * @returns {string} The justified text with each line fitting within the specified length.
 */
export const justifyText = (text: string, lineLength: number = 80): string => {
	const sanitizedText = text.replace(/\n+/g, "\n")
	const paragraphs = sanitizedText.split("\n")
	let justifiedText = ""

	paragraphs.forEach((paragraph) => {
		const words = paragraph.split(" ")
		let currentLine = ""

		words.forEach((word) => {
			if ((currentLine + word).length < lineLength) {
				currentLine += word + " "
			} else if ((currentLine + word).length > lineLength) {
				justifiedText += justifyLine(currentLine.trim(), lineLength) + "\n"
				currentLine = word + " "
			} else {
				justifiedText += currentLine + word + "\n"
				currentLine = ""
			}
		})

		justifiedText += currentLine.trim() + "\n"
	})

	return justifiedText.trim()
}

/**
 * Adjusts the spacing in a given line of text so that it is justified to a specified length.
 *
 * @param line - The line of text to be justified.
 * @param lineLength - The desired length of the justified line.
 * @returns {string} The justified line of text.
 */
const justifyLine = (line: string, lineLength: number): string => {
	const words = line.split(" ")

	if (words.length === 1) {
		return words[0]
	}

	const totalSpaces = lineLength - words.join("").length
	const spacesPerWord = Math.floor(totalSpaces / (words.length - 1))
	let spacingLeft = totalSpaces - spacesPerWord * (words.length - 1)
	let justifiedLine = ""

	words.forEach((word, index) => {
		if (index !== words.length - 1) {
			justifiedLine += word
			justifiedLine += " ".repeat(spacesPerWord)
			if (spacingLeft > 0) {
				justifiedLine += " "
				spacingLeft--
			}
		} else {
			justifiedLine += word
		}
	})

	return justifiedLine
}
