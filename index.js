require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const routes = require('./routes')

app.use(express.json())
routes(app)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))