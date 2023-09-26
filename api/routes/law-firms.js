const router = require('express').Router()
const db = require('../db')

// get all law firms
router.get('/', async (req, res) => {
  const lawFirms = await db.query(`
    SELECT id, name, slug
    FROM law_firms
    ORDER BY name ASC
  `)
  return res.status(200).send(lawFirms.rows)
})

// get law firm that user is associated with
router.get('/:slug', async (req, res) => {
  const lawFirms = await db.query(`
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
    WHERE law_firms.slug = $1
  `, [ req.params.slug ])

  let lawFirmUsers = []
  if (lawFirms.rows.length) {
    const users = await db.query(`
      SELECT
        users.id AS id,
        users.slug AS slug,
        users.salutation AS salutation,
        users.job_title AS job_title,
        users.first_name AS first_name,
        users.last_name AS last_name,
        users.photo_url AS photo_url
      FROM users
      LEFT JOIN law_firm_users ON law_firm_users.user_id = users.id
      LEFT JOIN law_firms ON law_firms.id = law_firm_users.law_firm_id
      WHERE law_firms.slug = $1
    `, [ lawFirms.rows[0].slug ])
    lawFirmUsers = users.rows
  }

  let lawFirm = null
  if (lawFirms.rows[0]) {
    lawFirm = {
      ...lawFirms.rows[0],
      users: lawFirmUsers
    }
  }

  return res.status(200).send(lawFirm)
})

// get users associated with law firm
router.get('/:slug/users', async (req, res) => {
  const users = await db.query(`
    SELECT
      users.id AS id,
      users.slug AS slug,
      users.first_name AS first_name,
      users.last_name AS last_name,
      users.photo_url AS photo_url
    FROM users
    LEFT JOIN law_firm_users ON law_firm_users.user_id = users.id
    LEFT JOIN law_firms ON law_firms.id = law_firm_users.law_firm_id
    WHERE law_firms.slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(users.rows)
})

module.exports = router