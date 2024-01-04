const router = require('express').Router()
const db = require('../db')

// get legal services
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT id, name, slug, thumbnail_url, price
    FROM legal_services
    ORDER BY order_id, slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get legal service
router.get('/:slug', async (req, res) => {
  const result = await db.query(`
    SELECT id, name, slug, description, thumbnail_url, price
    FROM legal_services
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(result.rows[0])
})

module.exports = router