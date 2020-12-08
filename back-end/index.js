const express = require('express')
const app = express()
const cors = require('cors')

const apiRouter = require('./routes')
const db = require('./connection')

require('dotenv').config()

app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
    origin: 'http://localhost:' + process.env.CLIENT_PORT,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use('/api', apiRouter)

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening at http://localhost:` + process.env.SERVER_PORT)))
