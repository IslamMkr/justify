import { isValidEmail } from "../../utils/email"

const utilName = isValidEmail.name

describe(`test ${utilName} util`, () => {
	it("should return true for a valid email", () => {
		expect(isValidEmail("test@example.com")).toBe(true)
		expect(isValidEmail("user123@domain.co")).toBe(true)
		expect(isValidEmail("user.name@sub.domain.com")).toBe(true)
	})

	it('should return false for an email without "@" symbol', () => {
		expect(isValidEmail("testexample.com")).toBe(false)
	})

	it("should return false for an email without a domain", () => {
		expect(isValidEmail("test@")).toBe(false)
		expect(isValidEmail("test@example")).toBe(false)
	})

	it("should return false for an email with spaces", () => {
		expect(isValidEmail("test @example.com")).toBe(false)
		expect(isValidEmail("test@ example.com")).toBe(false)
	})

	it("should return false for an empty email", () => {
		expect(isValidEmail("")).toBe(false)
	})

	it('should return false for an email with multiple "@" symbols', () => {
		expect(isValidEmail("test@@example.com")).toBe(false)
	})
})
