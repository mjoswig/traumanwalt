const router = require('express').Router()
const user = require('../user')
const db = require('../db')

// create new user
router.post('/create', async (req, res) => {
  const response = await user.create(
    req.body.firebase_uid,
    req.body.salutation,
    req.body.academic_title,
    req.body.first_name,
    req.body.last_name,
    req.body.address_line,
    req.body.postal_code,
    req.body.city,
    req.body.country
  )
  return res.status(200).send(response)
})

// update user
router.post('/update', async (req, res) => {
  try {
    await user.update(req.body, req.body.firebase_uid)
    return res.status(200).send(true)
  } catch (e) {
    return res.status(400).send(e)
  }
})

// get user by firebase uid
router.get('/:firebase_uid', async (req, res) => {
  const users = await db.query(`
    SELECT *
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows[0])
})

module.exports = router