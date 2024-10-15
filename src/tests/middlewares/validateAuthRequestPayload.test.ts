import { Request, Response, NextFunction } from "express"
import { validateAuthRequestPayload } from "../../middlewares/validation"
import { isValidEmail } from "../../utils/email"

jest.mock("../../utils/email", () => ({
	isValidEmail: jest.fn(),
}))

const middlewareName = validateAuthRequestPayload.name

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
		res = { status: mockStatus } as Partial<Response>
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 400 if no email is provided", () => {
		req.body = {}

		validateAuthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Email is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if email is an empty string or whitespace", () => {
		req.body = { email: "   " }

		validateAuthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Email is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if email is not a valid format", () => {
		req.body = { email: "invalid-email" }
		;(isValidEmail as jest.Mock).mockReturnValue(false)

		validateAuthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid email format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should proceed to the next middleware if email is valid", () => {
		req.body = { email: "test@example.com" }
		;(isValidEmail as jest.Mock).mockReturnValue(true)

		validateAuthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
