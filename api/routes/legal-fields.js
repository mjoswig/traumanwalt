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

module.exports = router