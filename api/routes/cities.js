const router = require('express').Router()
const db = require('../db')

// get cities
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug, popular
    FROM cities
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get city
router.get('/:slug', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM cities
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(result.rows)
})

// get popular cities
router.get('/popular', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM cities
    WHERE popular IS TRUE
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

module.exports = router