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

  const lawFirm = await db.query(`
    SELECT
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
      law_firms.youtube_url AS youtube_url
    FROM law_firms
    LEFT JOIN law_firm_users ON law_firm_users.law_firm_id = law_firms.id
    LEFT JOIN users ON users.id = law_firm_users.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  let lawFirmUsers = []
  if (lawFirm.rows.length) {
    const users = await db.query(`
      SELECT
        users.id AS id,
        users.slug AS slug,
        users.salutation AS salutation,
        users.first_name AS first_name,
        users.last_name AS last_name,
        users.photo_url AS photo_url
      FROM users
      LEFT JOIN law_firm_users ON law_firm_users.user_id = users.id
      LEFT JOIN law_firms ON law_firms.id = law_firm_users.law_firm_id
      WHERE law_firms.slug = $1
    `, [ lawFirm.rows[0].slug ])
    lawFirmUsers = users.rows
  }

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
      law_firm: {
        ...lawFirm.rows[0],
        users: lawFirmUsers
      },
      languages: languages.rows,
      legal_fields: legalFields.rows
    }
  }

  return res.status(200).send(profile)
})

module.exports = router