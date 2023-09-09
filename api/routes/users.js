const router = require('express').Router()
const user = require('../user')
const email = require('../email')
const db = require('../db')

// get users
router.get('/', async (req, res) => {
  const users = await db.query(`
    SELECT
      salutation, first_name, last_name,
      address_line, postal_code, city,
      jsonb_agg(
        jsonb_build_object(
          'name', legal_fields.name,
          'slug', legal_fields.slug,
          'specialized', user_legal_fields.specialized
        )
        ORDER BY user_legal_fields.specialized DESC
      ) as legal_fields
    FROM users
    LEFT JOIN user_legal_fields ON user_legal_fields.user_id = users.id
    LEFT JOIN legal_fields ON legal_fields.id = user_legal_fields.legal_field_id
    GROUP BY salutation, first_name, last_name, address_line, postal_code, city
  `)
  return res.status(200).send(users.rows)
})

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
      law_firms.slug AS slug,
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

// create law firm
router.post('/:firebase_uid/law-firm/create', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.createLawFirm(req.body.name, userResults.rows[0].id)
  return res.status(200).send(true)
})

// update law firm
router.post('/:firebase_uid/law-firm/update', async (req, res) => {
  await user.updateLawFirm(req.body)
  return res.status(200).send(true)
})

// delete law firm
router.post('/:firebase_uid/law-firm/delete', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.deleteLawFirm(userResults.rows[0].id)
  return res.status(200).send(true)
})

// remove user from law firm
router.post('/:firebase_uid/law-firm/users/remove', async (req, res) => {
  const lawFirmResults = await db.query(`
    SELECT law_firms.id AS id
    FROM law_firms
    LEFT JOIN users ON users.id = law_firms.admin_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    DELETE FROM law_firm_users
    WHERE law_firm_id = $1 AND user_id = $2
  `, [ lawFirmResults.rows[0].id, req.body.user_id ])
  return res.status(200).send(true)
})

// join law firm
router.post('/:firebase_uid/law-firm/join', async (req, res) => {
  const userResults = await db.query(`
    SELECT id
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    INSERT INTO law_firm_users(law_firm_id, user_id)
    VALUES($1, $2)
  `, [ req.body.law_firm_id, userResults.rows[0].id ])
  return res.status(200).send(true)
})

// leave law firm
router.post('/:firebase_uid/law-firm/leave', async (req, res) => {
  const userResults = await db.query(`
    SELECT id
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    DELETE FROM law_firm_users
    WHERE user_id = $1
  `, [ userResults.rows[0].id ])
  return res.status(200).send(true)
})

// get reviews by user
router.get('/:firebase_uid/reviews', async (req, res) => {
  const reviews = await db.query(`
    SELECT
      reviews.id AS id,
      reviews.author AS author,
      reviews.rating AS rating,
      reviews.heading AS heading,
      reviews.description AS description,
      reviews.comment AS comment,
      reviews.created_at AS created_at
    FROM reviews
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(reviews.rows)
})

// send review invitation
router.post('/:firebase_uid/reviews/invite', async (req, res) => {
  const userResults = await db.query(`
    SELECT id, slug, salutation, first_name, last_name
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  const user = userResults.rows[0]
  const jobTitle = user.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
  const inviteUrl = `https://traumanwalt.com/anwalt/${user.slug}/bewerten`

  for (let emailAddress of req.body.emails) {
    await email.send({
      from: '"Traumanwalt" <support@traumanwalt.com>',
      to: emailAddress,
      subject: 'Bitte bewerten Sie mich',
      text: `Sie wurden von ${jobTitle} ${user.first_name} ${user.last_name} eingeladen, eine Bewertung auf Traumanwalt zu verfassen.\n\nLink: ${inviteUrl}\n\nMit freundlichen Grüßen,\n\nIhr Traumanwalt Team`
    })
  }

  return res.status(200).send(true)
})

// update review
router.post('/:firebase_uid/reviews/update', async (req, res) => {
  await user.updateReview(req.body)
  return res.status(200).send(true)
})

module.exports = router