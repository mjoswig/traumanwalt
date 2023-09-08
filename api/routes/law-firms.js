const router = require('express').Router()
const db = require('../db')

// get users associated with law firm
router.get('/:slug/users', async (req, res) => {
  const users = await db.query(`
    SELECT
      users.id AS id
    FROM users
    LEFT JOIN law_firm_users ON law_firm_users.user_id = users.id
    LEFT JOIN law_firms ON law_firms.id = law_firm_users.law_firm_id
    WHERE law_firms.slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(users.rows)
})

module.exports = router