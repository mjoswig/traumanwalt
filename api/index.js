// import packages
const express = require('express')
const cors = require('cors')

// import routes
const attorneyRoutes = require('./routes/attorneys')
const cityRoutes = require('./routes/cities')
const legalFieldRoutes = require('./routes/legal-fields')
const userRoutes = require('./routes/users')

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
app.use('/api/attorneys', attorneyRoutes)
app.use('/api/cities', cityRoutes)
app.use('/api/legal-fields', legalFieldRoutes)
app.use('/api/users', userRoutes)

// test api request
app.get('/api', async (req, res) => {
  return res.status(200).send('API is ready')
})

module.exports = app