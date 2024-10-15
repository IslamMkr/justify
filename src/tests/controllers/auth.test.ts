import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { authenticate } from "../../controllers/auth"

const controllerName = authenticate.name

jest.mock("jsonwebtoken")

describe(`test ${controllerName} controller`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let mockStatus: jest.Mock
	let mockJson: jest.Mock

	beforeEach(() => {
		req = { body: { email: "test@example.com" } }
		mockJson = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ json: mockJson })
		res = { status: mockStatus }
		jest.clearAllMocks()
	})

	it("should generate a JWT token and return a 200 status", () => {
		;(jwt.sign as jest.Mock).mockReturnValue("fakeToken123")

		authenticate(req as Request, res as Response)

		expect(jwt.sign).toHaveBeenCalledWith({ email: "test@example.com" }, process.env.SECRET_KEY, { expiresIn: "1d" })
		expect(mockStatus).toHaveBeenCalledWith(200)
		expect(mockJson).toHaveBeenCalledWith({ token: "fakeToken123" })
	})

	it("should return a 400 status if token generation fails", () => {
		;(jwt.sign as jest.Mock).mockImplementation(() => {
			throw new Error("Token generation error")
		})

		authenticate(req as Request, res as Response)

		expect(jwt.sign).toHaveBeenCalledWith({ email: "test@example.com" }, process.env.SECRET_KEY, { expiresIn: "1d" })
		expect(mockStatus).toHaveBeenCalledWith(400)
		expect(mockJson).toHaveBeenCalledWith({
			message: "Failed to generate authentication token",
		})
	})
})
