import express from 'express'
import colors from 'colors'
import cors from 'cors'
import log from './utils/log.js'
import morgan from 'morgan'
import sercrets from './utils/secrets.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/apiRouter.js'
import * as apiResponse from './helper/apiResponse.js'

const app = express()

mongoose
  .connect(sercrets.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(res => log.succ(`MongoDB Connected: ${res.connection.host}`))
  .catch(err => log.err(err.message))

if (sercrets.IS_DEV) app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cors())

app.get('/ping', (req, res) => res.send('pong'))

app.use('/api/', apiRouter)

// throw 404 if URL not found
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Not found!')
})

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message)
  }
})

const PORT = sercrets.PORT || 8000
app.listen(PORT, () =>
  log.succ(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
