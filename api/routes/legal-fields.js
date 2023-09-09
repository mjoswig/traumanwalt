const router = require('express').Router()
const db = require('../db')

// get legal fields
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT id, name, slug
    FROM legal_fields
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get legal field
router.get('/:slug', async (req, res) => {
  const result = await db.query(`
    SELECT name, slug
    FROM legal_fields
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(result.rows)
})

// get users by legal field
router.get('/:slug/users', async (req, res) => {
  const attorneys = await db.query(`
    SELECT
      salutation, first_name, last_name,
      photo_url, address_line, postal_code, city,
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
    WHERE legal_fields.slug = $1
    GROUP BY salutation, first_name, last_name, photo_url, address_line, postal_code, city
  `, [ req.params.slug ])
  return res.status(200).send(attorneys.rows)
})

module.exports = router