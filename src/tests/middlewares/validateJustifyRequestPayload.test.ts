import { Request, Response, NextFunction } from "express"
import { validateJustifyRequestPayload } from "../../middlewares/validation"

const middlewareName = validateJustifyRequestPayload.name

describe(`test ${middlewareName} middleware`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let next: NextFunction
	let mockStatus: jest.Mock
	let mockJson: jest.Mock

	beforeEach(() => {
		req = { body: "" }
		mockJson = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ json: mockJson })
		res = { status: mockStatus } as Partial<Response>
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 400 if no text is provided", () => {
		validateJustifyRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Text is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if text is an empty string or whitespace", () => {
		req.body = "   "

		validateJustifyRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid text format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should proceed to the next middleware if text is valid", () => {
		req.body = "Valid text"

		validateJustifyRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
