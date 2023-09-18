const router = require('express').Router()
const db = require('../db')

// get profiles
router.get('/', async (req, res) => {
  const queryArgs = []
  if (req.query.page && req.query.page_length) {
    queryArgs.push(req.query.page_length)
    queryArgs.push((req.query.page - 1) * req.query.page_length)
  }

  const profiles = await db.query(`
    SELECT
      count(*) OVER() AS total_count,
      users.slug AS slug,
      salutation, job_title, academic_title, first_name, last_name, suffix_title,
      photo_url, address_line, postal_code, city,
      jsonb_agg(
        jsonb_build_object(
          'id', legal_fields.id,
          'name', legal_fields.name,
          'slug', legal_fields.slug,
          'specialized', user_legal_fields.specialized
        )
        ORDER BY user_legal_fields.specialized DESC, legal_fields.slug ASC
      ) as legal_fields
    FROM users
    LEFT JOIN user_legal_fields ON user_legal_fields.user_id = users.id
    LEFT JOIN legal_fields ON legal_fields.id = user_legal_fields.legal_field_id
    GROUP BY users.slug, salutation, job_title, academic_title, first_name, last_name, suffix_title, photo_url, address_line, postal_code, city, users.created_at
    ORDER BY users.created_at DESC
    ${queryArgs.length === 2 ? 'LIMIT $1 OFFSET $2' : ''}
  `, queryArgs)

  return res.status(200).send(profiles.rows)
})

// get profile
router.get('/:slug', async (req, res) => {
  const languages = await db.query(`
    SELECT name
    FROM languages
    LEFT JOIN user_languages ON user_languages.language_id = languages.id
    LEFT JOIN users ON users.id = user_languages.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const legalFields = await db.query(`
    SELECT
      legal_fields.id AS id,
      legal_fields.name AS name,
      legal_fields.slug AS slug,
      user_legal_fields.specialized AS specialized
    FROM legal_fields
    LEFT JOIN user_legal_fields ON user_legal_fields.legal_field_id = legal_fields.id
    LEFT JOIN users ON users.id = user_legal_fields.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const profiles = await db.query(`
    SELECT
      users.slug AS slug,
      salutation, job_title, academic_title, first_name, last_name, suffix_title,
      photo_url, address_line, postal_code, city, memberships, landline_number,
      mobile_number, contact_email, website_url
    FROM users
    WHERE users.slug = $1
  `, [ req.params.slug ])

  let profile = null
  if (profiles.rows[0]) {
    profile = {
      ...profiles.rows[0],
      languages: languages.rows,
      legal_fields: legalFields.rows
    }
  }

  return res.status(200).send(profile)
})

module.exports = router