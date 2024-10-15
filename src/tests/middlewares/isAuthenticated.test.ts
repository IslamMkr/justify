import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import isAuthenticated from "../../middlewares/isAuthenticated"

const middlewareName = isAuthenticated.name

jest.mock("jsonwebtoken")

describe(`test ${middlewareName} middleware`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let next: NextFunction
	let mockStatus: jest.Mock
	let mockJson: jest.Mock

	beforeEach(() => {
		req = {}
		mockJson = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ json: mockJson })
		res = { status: mockStatus }
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should return 401 if no authorization header is provided", () => {
		req.headers = {}

		isAuthenticated(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(401)
		expect(mockJson).toHaveBeenCalledWith({
			message: "Unauthorized: No token provided",
		})
		expect(next).not.toHaveBeenCalled()
	})

	it("should return 401 if token format is invalid", () => {
		req.headers = { authorization: "Bearer " }

		isAuthenticated(req as Request, res as Response, next)

		expect(mockStatus).toHaveBeenCalledWith(401)
		expect(mockJson).toHaveBeenCalledWith({
			message: "Unauthorized: Invalid token format",
		})
		expect(next).not.toHaveBeenCalled()
	})

	it("should call next if token is valid", () => {
		req.headers = { authorization: "Bearer validtoken" }
		;(jwt.verify as jest.Mock).mockReturnValue({ email: "test@example.com" })

		isAuthenticated(req as Request, res as Response, next)

		expect(jwt.verify).toHaveBeenCalledWith("validtoken", process.env.SECRET_KEY)
		expect(next).toHaveBeenCalled()
		expect(mockStatus).not.toHaveBeenCalled()
	})

	it("should return 403 if token is invalid", () => {
		req.headers = { authorization: "Bearer invalidtoken" }
		;(jwt.verify as jest.Mock).mockImplementation(() => {
			throw new Error("Invalid token")
		})

		isAuthenticated(req as Request, res as Response, next)

		expect(jwt.verify).toHaveBeenCalledWith("invalidtoken", process.env.SECRET_KEY)
		expect(mockStatus).toHaveBeenCalledWith(401)
		expect(mockJson).toHaveBeenCalledWith({
			message: "Forbidden: Invalid token",
		})
		expect(next).not.toHaveBeenCalled()
	})
})
