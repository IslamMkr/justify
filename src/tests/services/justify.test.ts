import { justifyText } from "../../services/justify"

const serviceName = justifyText.name

describe(`test ${serviceName} service`, () => {
	it("should justify text when it exceeds the line length", () => {
		const input = "This is a simple test of the text justification function."
		const expectedOutput = `This  is  a  simple test of the text\njustification function.`

		const result = justifyText(input, 40)
		expect(result).toBe(expectedOutput)
	})

	it("should return the text as-is if it fits within the line length", () => {
		const input = "This is a short text"
		const result = justifyText(input, 80)

		// No changes are expected, as the text fits within 80 characters
		expect(result).toBe(input)
	})

	it("should handle long single words without splitting them", () => {
		const input = "Supercalifragilisticexpialidocious is a long word"
		const expectedOutput = `Supercalifragilisticexpialidocious is a\nlong word`

		const result = justifyText(input, 40)
		expect(result).toBe(expectedOutput)
	})

	it("should handle text with exactly 80 characters", () => {
		const input = "This text is exactly eighty characters long and fits perfectly in a line."
		const result = justifyText(input, 80)

		// No changes expected, since it fits exactly within the line length
		expect(result).toBe(input)
	})

	it("should handle an empty string", () => {
		const result = justifyText("", 80)

		// Empty input should result in empty output
		expect(result).toBe("")
	})

	it("should handle multiple lines of text with uneven line lengths", () => {
		const input = "This is a test of multiple lines being justified into specific lengths"
		const expectedOutput = `This  is  a  test  of  multiple lines\nbeing justified into specific lengths`

		const result = justifyText(input, 40)
		expect(result).toBe(expectedOutput)
	})
})
