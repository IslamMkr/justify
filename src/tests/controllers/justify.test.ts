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

	beforeEach(() => {
		req = { body: { text: "This is the text to justify." } }
		mockSend = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ send: mockSend })
		res = { status: mockStatus }
		jest.clearAllMocks()
	})

	it("should justify the text and return a 200 status", () => {
		;(justifyText as jest.Mock).mockReturnValue("This is the justified text.")

		justify(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is the text to justify.")
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockSend).toHaveBeenCalledWith("This is the justified text.")
	})

	it("should return a 500 status if justification fails", () => {
		;(justifyText as jest.Mock).mockImplementation(() => {
			throw new Error("Justification error")
		})

		justify(req as Request, res as Response)

		expect(justifyText).toHaveBeenCalledWith("This is the text to justify.")
		expect(mockStatus).toHaveBeenCalledWith(500)
		expect(mockSend).toHaveBeenCalledWith("An error occurred while justifying the text.")
	})
})
