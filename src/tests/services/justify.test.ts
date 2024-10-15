import { justifyText } from "../../services/justify"

const serviceName = justifyText.name

describe(`test ${serviceName} service`, () => {
	it("should justify a short text without exceeding line length", () => {
		const text = "This is a sample text to justify."
		const expectedOutput = "This is a sample text to justify."
		const justified = justifyText(text, 40)
		expect(justified).toBe(expectedOutput)
	})

	it("should justify text with line breaks at the specified length", () => {
		const text = "This is a longer sample text that should be split across multiple lines for proper justification."
		const expectedOutput =
			"This is a longer sample text that should\n" +
			"be   split  across  multiple  lines  for\n" +
			"proper justification."
		const justified = justifyText(text, 40)
		expect(justified).toBe(expectedOutput)
	})

	it("should correctly handle a single long word", () => {
		const text = "Supercalifragilisticexpialidocious"
		const expectedOutput = "Supercalifragilisticexpialidocious"
		const justified = justifyText(text, 40)
		expect(justified).toBe(expectedOutput)
	})

	it("should handle text that perfectly fits within the line length", () => {
		const text = "This line fits perfectly."
		const expectedOutput = "This line fits perfectly."
		const justified = justifyText(text, 25)
		expect(justified).toBe(expectedOutput)
	})

	it("should return an empty string for empty input", () => {
		const text = ""
		const justified = justifyText(text, 40)
		expect(justified).toBe("")
	})
})
