import { Request, Response, NextFunction } from "express"
import { validateText } from "../../middlewares/validation"

const middlewareName = validateText.name

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
		res = { status: mockStatus }
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 400 if no text is provided", () => {
		req.body = {}

		validateText(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({ message: "Text is required" })
		expect(next).not.toHaveBeenCalled()
	})

	it("should call next if text is provided", () => {
		req.body = { text: "Sample text" }

		validateText(req as Request, res as Response, next)

		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
