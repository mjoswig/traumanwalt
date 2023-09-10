const router = require('express').Router()
const db = require('../db')

// update profile views with new count
router.post('/update', async (req, res) => {
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

// update law firm profile views with new count
router.post('/law-firm/update', async (req, res) => {
  let results = await db.query(`
    SELECT profile_views.id
    FROM profile_views
    LEFT JOIN law_firms ON law_firms.id = profile_views.law_firm_id
    WHERE law_firms.slug = $1 AND profile_views.created_at >= NOW() - INTERVAL '1 MONTH'
  `, [ req.body.slug ])

  if (results.rows.length) {
    await db.query(`
      UPDATE profile_views
      SET count = count + 1
      WHERE profile_views.id = ${results.rows[0].id}
    `)
  } else {
    const lawFirmResults = await db.query(`
      SELECT law_firms.id
      FROM law_firms
      WHERE law_firms.slug = $1
    `, [ req.body.slug ])
    results = await db.query(`
      INSERT INTO profile_views(user_id) VALUES($1)
    `, [ lawFirmResults.rows[0].id ])
  }
  return res.status(200).send(results.rows[0])
})

module.exports = router