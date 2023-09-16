const router = require('express').Router()
const db = require('../db')

// get profiles
router.get('/', async (req, res) => {
  const profiles = await db.query(`
    SELECT
      salutation, job_title, academic_title, first_name, last_name, suffix_title,
      photo_url, address_line, postal_code, city,
      jsonb_agg(
        jsonb_build_object(
          'id', legal_fields.id,
          'name', legal_fields.name,
          'slug', legal_fields.slug,
          'specialized', user_legal_fields.specialized
        )
        ORDER BY user_legal_fields.specialized DESC, legal_fields.name ASC
      ) as legal_fields
    FROM users
    LEFT JOIN user_legal_fields ON user_legal_fields.user_id = users.id
    LEFT JOIN legal_fields ON legal_fields.id = user_legal_fields.legal_field_id
    GROUP BY salutation, job_title, academic_title, first_name, last_name, suffix_title, photo_url, address_line, postal_code, city, users.created_at
    ORDER BY users.created_at DESC
  `)
  return res.status(200).send(profiles.rows)
})

module.exports = router