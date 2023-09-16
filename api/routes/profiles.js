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

module.exports = router