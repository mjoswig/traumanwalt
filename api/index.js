// import packages
const express = require('express')
const cors = require('cors')

// initialize database
const db = require('./db')

// import routes
const conversationRoutes = require('./routes/conversations')
const lawFirmRoutes = require('./routes/law-firms')
const legalFieldRoutes = require('./routes/legal-fields')
const legalServiceRoutes = require('./routes/legal-services')
const profileRoutes = require('./routes/profiles')
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
app.use('/api/conversations', conversationRoutes)
app.use('/api/law-firms', lawFirmRoutes)
app.use('/api/legal-fields', legalFieldRoutes)
app.use('/api/legal-services', legalServiceRoutes)
app.use('/api/profiles', profileRoutes)
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
    SELECT
      count(*) OVER() AS total_count,
      legal_guides.title AS title,
      legal_guides.slug AS slug,
      legal_guides.thumbnail_url AS thumbnail_url,
      legal_guides.content AS content,
      users.salutation AS user_salutation,
      users.first_name AS user_first_name,
      users.last_name AS user_last_name,
      users.photo_url AS user_photo_url
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE published IS TRUE
    ORDER BY legal_guides.created_at DESC
    LIMIT $1 OFFSET $2
  `, [ req.query.page_length, (req.query.page - 1) * req.query.page_length ])
  return res.status(200).send(result.rows)
})

// get legal guide
app.get('/api/legal-guides/:slug', async (req, res) => {
  const guideResults = await db.query(`
    SELECT
      legal_guides.id AS id,
      legal_guides.title AS title,
      legal_guides.slug AS slug,
      legal_guides.thumbnail_url AS thumbnail_url,
      legal_guides.content AS content,
      users.slug AS user_slug,
      users.salutation AS user_salutation,
      users.first_name AS user_first_name,
      users.last_name AS user_last_name,
      users.photo_url AS user_photo_url
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE published IS TRUE AND legal_guides.slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(guideResults.rows[0])
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


// update profile views with new count
app.post('/api/profile-views/update', async (req, res) => {
  let results = await db.query(`
    SELECT profile_views.id
    FROM profile_views
    LEFT JOIN users ON users.id = profile_views.user_id
    WHERE users.slug = $1 AND profile_views.created_at >= NOW() - INTERVAL '1 MONTH'
  `, [ req.body.slug ])

  if (results.rows.length) {
    await db.query(`
      UPDATE profile_views
      SET count = count + 1
      WHERE profile_views.id = ${results.rows[0].id}
    `)
  } else {
    const userResults = await db.query(`
      SELECT users.id
      FROM users
      WHERE users.slug = $1
    `, [ req.body.slug ])
    results = await db.query(`
      INSERT INTO profile_views(user_id) VALUES($1)
    `, [ userResults.rows[0].id ])
  }
  return res.status(200).send(results.rows[0])
})

module.exports = app