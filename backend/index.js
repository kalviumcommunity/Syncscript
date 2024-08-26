const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const MongoConnection = require("./config/db")

dotenv.config()

const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}))

MongoConnection();  // connection to the server

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})