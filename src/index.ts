import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

import authRoutes from "./routes/auth"
import justifyRoutes from "./routes/justify"

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())

app.use("/api/auth", authRoutes)
app.use("/api/justify", justifyRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
