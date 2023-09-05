const router = require('express').Router()
const db = require('../db')

// get legal fields
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM legal_fields
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get legal field
router.get('/:slug', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM legal_fields
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(result.rows)
})

module.exports = router