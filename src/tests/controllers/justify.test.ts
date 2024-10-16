import { Request, Response } from "express"
import { justifyText } from "../../services/justify"
import { justify } from "../../controllers/justify"

const controllerName = justify.name

jest.mock("../../services/justify")

describe(`test ${controllerName} controller`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let mockStatus: jest.Mock
	let mockSend: jest.Mock
	let mockSetHeader: jest.Mock

	beforeEach(() => {
		req = { body: "This is the text to justify." }
		mockSend = jest.fn()
		mockSetHeader = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ send: mockSend })
		res = { status: mockStatus, setHeader: mockSetHeader } as Partial<Response>
		jest.clearAllMocks()
	})

	it("should justify text and return the justified result", () => {
		req.body = "This is a test."
		;(justifyText as jest.Mock).mockReturnValue("This  is  a  test.")

		justify(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is a test.")
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockSend).toHaveBeenCalledWith("This  is  a  test.")
	})

	it("should default to a line length of 80", () => {
		req.body = "This is a test."
		;(justifyText as jest.Mock).mockReturnValue("This  is  a  test.")

		justify(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is a test.")
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockSend).toHaveBeenCalledWith("This  is  a  test.")
	})

	it("should return a 500 error if justifyText throws an error", () => {
		req.body = "This is a test."
		;(justifyText as jest.Mock).mockImplementation(() => {
			throw new Error("Justification error")
		})

		justify(req as Request, res as Response)

		expect(mockStatus).toHaveBeenCalledWith(500)
		expect(mockSend).toHaveBeenCalledWith("An error occurred while justifying the text.")
		expect(justifyText).toHaveBeenCalledWith("This is a test.")
	})
})
