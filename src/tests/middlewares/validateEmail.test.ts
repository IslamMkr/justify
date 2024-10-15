import { Request, Response, NextFunction } from "express"
import { validateEmail } from "../../middlewares/validation"
import { isValidEmail } from "../../utils/email"

// Mock isValidEmail function
jest.mock("../../utils/email", () => ({
	isValidEmail: jest.fn(),
}))

const middlewareName = validateEmail.name

describe(`test ${middlewareName} test`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let next: NextFunction
	let mockStatus: jest.Mock
	let mockJson: jest.Mock

	beforeEach(() => {
		req = { body: {} }
		mockJson = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ json: mockJson })
		res = { status: mockStatus }
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 400 if no email is provided", () => {
		req.body = {}

		validateEmail(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Email is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if the email format is invalid", () => {
		req.body = { email: "invalidemail" }
		;(isValidEmail as jest.Mock).mockReturnValue(false)

		validateEmail(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid email format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should call next if the email format is valid", () => {
		req.body = { email: "test@example.com" }
		;(isValidEmail as jest.Mock).mockReturnValue(true)

		validateEmail(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
