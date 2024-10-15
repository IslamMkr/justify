import { Request, Response } from "express"
import { justifyWithLength } from "../../controllers/justify"
import { justifyText } from "../../services/justify"

jest.mock("../../services/justify", () => ({
	justifyText: jest.fn(),
}))

const controllerName = justifyWithLength.name

describe(`test ${controllerName} controller`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let mockStatus: jest.Mock
	let mockSend: jest.Mock
	let mockSetHeader: jest.Mock

	beforeEach(() => {
		req = { body: {}, params: {} }
		mockSend = jest.fn()
		mockSetHeader = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ send: mockSend })
		res = { status: mockStatus, setHeader: mockSetHeader } as Partial<Response>
		jest.clearAllMocks()
	})

	it("should justify the text with the provided length from params", () => {
		req.body = "This is a test."
		req.params = { length: "40" }
		;(justifyText as jest.Mock).mockReturnValue("This  is  a  test.")

		justifyWithLength(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is a test.", 40)
		expect(mockSetHeader).toHaveBeenCalledWith("Content-Type", "text/plain")
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockSend).toHaveBeenCalledWith("This  is  a  test.")
	})

	it("should handle missing length params parameter and default to 80", () => {
		req.body = "This is a test."
		req.params = {}
		;(justifyText as jest.Mock).mockReturnValue("This  is  a  test.")

		justifyWithLength(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is a test.", NaN)
		expect(mockSetHeader).toHaveBeenCalledWith("Content-Type", "text/plain")
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockSend).toHaveBeenCalledWith("This  is  a  test.")
	})

	it("should return a 500 error if justifyText throws an error", () => {
		req.body = "This is a test."
		req.params = { length: "40" }
		;(justifyText as jest.Mock).mockImplementation(() => {
			throw new Error("Justification error")
		})

		justifyWithLength(req as Request, res as Response)

		expect(mockStatus).toHaveBeenCalledWith(500)
		expect(mockSend).toHaveBeenCalledWith("An error occurred while justifying the text.")
		expect(justifyText).toHaveBeenCalledWith("This is a test.", 40)
	})
})
