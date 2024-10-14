/**
 * Justifies a given text to fit within a specified line length.
 *
 * @param text - The text to be justified.
 * @param lineLength - The maximum length of each line. Defaults to 80 characters.
 * @returns {string} The justified text with each line fitting within the specified length.
 */
export const justifyText = (text: string, lineLength: number = 80) => {
	const words = text.split(" ")
	let currentLine = ""
	let justifiedText = ""

	words.forEach((word) => {
		if ((currentLine + word).length <= lineLength) {
			currentLine += word + " "
		} else {
			justifiedText += justifyLine(currentLine.trim(), lineLength) + "\n"
			currentLine = word + " "
		}
	})

	justifiedText += currentLine.trim()
	return justifiedText
}

/**
 * Adjusts the spacing in a given line of text so that it is justified to a specified length.
 *
 * @param line - The line of text to be justified.
 * @param lineLength - The desired length of the justified line.
 * @returns {string} The justified line of text.
 */
const justifyLine = (line: string, lineLength: number) => {
	if (line.length === 0) {
		return line
	}

	let spacesToAdd = lineLength - line.length
	let words = line.split(" ")

	while (spacesToAdd > 0 && words.length > 1) {
		for (let i = 0; i < words.length - 1 && spacesToAdd > 0; i++) {
			words[i] += " "
			spacesToAdd--
		}
	}

	return words.join(" ")
}
