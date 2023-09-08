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

// get legal fields by user
router.get('/:firebase_uid/legal-fields', async (req, res) => {
  const users = await db.query(`
    SELECT
      legal_fields.id AS id,
      legal_fields.name AS name,
      user_legal_fields.specialized AS specialized
    FROM legal_fields
    LEFT JOIN user_legal_fields ON user_legal_fields.legal_field_id = legal_fields.id
    LEFT JOIN users ON users.id = user_legal_fields.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows)
})

// update legal fields for user
router.post('/:firebase_uid/legal-fields/update', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.updateLegalFields(req.body.legal_fields, userResults.rows[0].id)
  return res.status(200).send(true)
})

// get languages by user
router.get('/:firebase_uid/languages', async (req, res) => {
  const users = await db.query(`
    SELECT
      languages.id AS id,
      languages.name AS name
    FROM languages
    LEFT JOIN user_languages ON user_languages.language_id = languages.id
    LEFT JOIN users ON users.id = user_languages.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows)
})

// update languages for user
router.post('/:firebase_uid/languages/update', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.updateLanguages(Object.values(req.body.languages), userResults.rows[0].id)
  return res.status(200).send(true)
})

// get law firm that user is associated with
router.get('/:firebase_uid/law-firm', async (req, res) => {
  const users = await db.query(`
    SELECT
      law_firms.id AS id,
      law_firms.name AS name,
      law_firms.about AS about,
      law_firms.logo_url AS logo_url,
      law_firms.address_line AS address_line,
      law_firms.postal_code AS postal_code,
      law_firms.city AS city,
      law_firms.country AS country,
      law_firms.landline_number AS landline_number,
      law_firms.mobile_number AS mobile_number,
      law_firms.contact_email AS contact_email,
      law_firms.website_url AS website_url,
      law_firms.linkedin_url AS linkedin_url,
      law_firms.xing_url AS xing_url,
      law_firms.facebook_url AS facebook_url,
      law_firms.twitter_url AS twitter_url,
      law_firms.instagram_url AS instagram_url,
      law_firms.youtube_url AS youtube_url,
      law_firms.admin_id AS admin_id
    FROM law_firms
    LEFT JOIN law_firm_users ON law_firm_users.law_firm_id = law_firms.id
    LEFT JOIN users ON users.id = law_firm_users.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows[0])
})

// update law firm
router.post('/:firebase_uid/law-firm/update', async (req, res) => {
  await user.updateLawFirm(req.body)
  return res.status(200).send(true)
})

module.exports = router