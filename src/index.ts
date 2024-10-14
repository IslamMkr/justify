import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
