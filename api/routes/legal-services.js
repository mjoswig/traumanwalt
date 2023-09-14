const router = require('express').Router()
const db = require('../db')

// get legal services
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT id, name, slug, excerpt, thumbnail_url, price
    FROM legal_services
    ORDER BY order_id, slug ASC
  `)
  return res.status(200).send(result.rows)
})

module.exports = router