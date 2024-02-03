require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
routes(app)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))