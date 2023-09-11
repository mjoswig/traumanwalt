// import packages
const express = require('express')
const cors = require('cors')

// initialize database
const db = require('./db')

// import routes
const lawFirmRoutes = require('./routes/law-firms')
const legalFieldRoutes = require('./routes/legal-fields')
const profileViewRoutes = require('./routes/profile-views')
const stripeRoutes = require('./routes/stripe')
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
app.use('/api/law-firms', lawFirmRoutes)
app.use('/api/legal-fields', legalFieldRoutes)
app.use('/api/profile-views', profileViewRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/users', userRoutes)

// test api request
app.get('/api', async (req, res) => {
  return res.status(200).send('API is ready')
})

// get cities
app.get('/api/cities', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug, popular
    FROM cities
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get popular cities
app.get('/api/cities/popular', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM cities
    WHERE popular IS TRUE
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get city
app.get('/api/cities/:slug', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM cities
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(result.rows)
})

// get languages
app.get('/api/languages', async (req, res) => {
  const result = await db.query(`
    SELECT id, name
    FROM languages
    ORDER BY name ASC
  `)
  return res.status(200).send(result.rows)
})

// get legal guides
app.get('/api/legal-guides', async (req, res) => {
  const result = await db.query(`
    SELECT title, slug, thumbnail_url, content
    FROM legal_guides
    WHERE published IS TRUE
  `)
  return res.status(200).send(result.rows)
})

// update views of legal guide
app.post('/api/legal-guides/:slug/views/update', async (req, res) => {
  await db.query(`
    UPDATE legal_guides
    SET views = views + 1
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(true)
})

module.exports = app