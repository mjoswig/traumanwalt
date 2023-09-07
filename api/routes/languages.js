const router = require('express').Router()
const db = require('../db')

// get languages
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT id, name
    FROM languages
    ORDER BY name ASC
  `)
  return res.status(200).send(result.rows)
})

module.exports = router