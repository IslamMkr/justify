import { Request, Response, NextFunction } from "express"
import rateLimiting from "../../middlewares/rateLimiting"

const middlewareName = rateLimiting.name

describe(`test ${middlewareName} middleware`, () => {
	let req: Partial<Request>
	let res: Partial<Response>
	let next: NextFunction
	let mockStatus: jest.Mock
	let mockSend: jest.Mock

	beforeEach(() => {
		req = { headers: { authorization: "Bearer validtoken" }, body: "Hello world" }
		mockSend = jest.fn()
		mockStatus = jest.fn().mockReturnValue({ send: mockSend })
		res = { status: mockStatus }
		next = jest.fn()
		jest.clearAllMocks()
	})

	it("should allow the request if word count does not exceed the limit", () => {
		// Spy on the Date object to simulate "today"
		jest.spyOn(global.Date, "now").mockImplementation(() => new Date("2023-01-01").getTime())

		// Simulate that token usage is 0 for today
		rateLimiting(req as Request, res as Response, next)

		// Check that it increments the word count (since "Hello world" is 2 words)
		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})

	it("should return 402 if the word count exceeds the limit", () => {
		// Spy on the Date object to simulate "today"
		jest.spyOn(global.Date, "now").mockImplementation(() => new Date("2023-01-01").getTime())

		// Simulate that token usage is near the limit
		req.headers = req.headers || {}
		req.headers.authorization = "Bearer validtoken"
		req.body = "word ".repeat(80001) // Simulate a body with more than 80,000 words

		rateLimiting(req as Request, res as Response, next)

		// Expect to see a 402 Payment Required because the word count exceeds the limit
		expect(mockStatus).toHaveBeenCalledWith(402)
		expect(mockSend).toHaveBeenCalledWith("Payment Required")
		expect(next).not.toHaveBeenCalled()
	})

	it("should reset the word count if a new day occurs", () => {
		// Simulate the usage from yesterday
		jest.spyOn(global.Date, "now").mockImplementation(() => new Date("2023-01-01").getTime())

		// Simulate today's request (new day, should reset count)
		rateLimiting(req as Request, res as Response, next)

		// Ensure next middleware is called
		expect(mockStatus).not.toHaveBeenCalled()
		expect(next).toHaveBeenCalled()
	})
})
