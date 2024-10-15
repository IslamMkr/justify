import { Request, Response, NextFunction } from "express"
import { validateJustifyRequestPauload } from "../../middlewares/validation"

const middlewareName = validateJustifyRequestPauload.name

describe(`test ${middlewareName} middleware`, () => {
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

	it("should return 400 if no text is provided", () => {
		req.body = {}

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Text is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if text is an empty string or whitespace", () => {
		req.body = { text: "   " }

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid text format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if lineLength is invalid (not a number or less than 1)", () => {
		req.body = { text: "Valid text", lineLength: "invalid" }

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid line length format" })
		expect(next).not.toHaveBeenCalled()

		req.body = { text: "Valid text", lineLength: 0 }

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid line length format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should proceed to the next middleware if text and lineLength are valid", () => {
		req.body = { text: "Valid text", lineLength: 80 }

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})

	it("should proceed to the next middleware if only text is valid (lineLength is optional)", () => {
		req.body = { text: "Valid text" }

		validateJustifyRequestPauload(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
