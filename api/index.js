// import packages
const express = require('express')
const cors = require('cors')

// import routes
const legalFields = require('./routes/legal-fields')

// initialize server
const app = express()
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next()
  } else {
    express.json({ limit: 1024 * 1024 * 10 })(req, res, next)
  }
})
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true }))
app.use('/api/legal-fields', legalFields)

// test api request
app.get('/api', async (req, res) => {
  return res.status(200).send('API is ready')
})

module.exports = app