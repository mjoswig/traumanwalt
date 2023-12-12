const router = require('express').Router()
const db = require('../db')

// get laws
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT title_short, title_long, slug, popular
    FROM laws
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

module.exports = router