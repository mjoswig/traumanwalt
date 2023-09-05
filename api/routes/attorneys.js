const router = require('express').Router()
const db = require('../db')

// get attorneys
router.get('/', async (req, res) => {
  const attorneys = await db.query(`
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
  return res.status(200).send(attorneys.rows)
})

module.exports = router