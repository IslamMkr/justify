import { Request, Response, NextFunction } from "express"
import { validateJustifyLengthRequestPayload } from "../../middlewares/validation"

const middlewareName = validateJustifyLengthRequestPayload.name

describe(`test ${middlewareName} middleware`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let next: NextFunction
	let mockStatus: jest.Mock
	let mockJson: jest.Mock

	beforeEach(() => {
		req = { params: {} }
		mockJson = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ json: mockJson })
		res = { status: mockStatus } as Partial<Response>
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 400 if length is not provided", () => {
		req.params = {}

		validateJustifyLengthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Line length is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if length is not a number", () => {
		req.params = { length: "invalid" }

		validateJustifyLengthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid line length format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 400 if length is less than 1", () => {
		req.params = { length: "0" }

		validateJustifyLengthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Invalid line length format" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should call next() if a valid length is provided", () => {
		req.params = { length: "40" }

		validateJustifyLengthRequestPayload(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(mockJson).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
