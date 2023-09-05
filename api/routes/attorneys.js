const router = require('express').Router()
const db = require('../db')

// get attorneys
router.get('/', async (req, res) => {
  const attorneys = await db.query(`
    SELECT
      salutation, first_name, last_name,
      address_line, postal_code, city
    FROM users
  `)
  return res.status(200).send(attorneys.rows)
})

module.exports = router