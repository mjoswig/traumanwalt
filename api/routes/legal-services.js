const router = require('express').Router()
const db = require('../db')

// get legal services
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT id, name, slug, thumbnail_url, price
    FROM legal_services
    ORDER BY order_id, slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get legal service
router.get('/:slug', async (req, res) => {
  const services = await db.query(`
    SELECT id, name, slug, excerpt, thumbnail_url, price, legal_field_id
    FROM legal_services
    WHERE slug = $1
  `, [ req.params.slug ])
  const relatedServices = await db.query(`
    SELECT id, name, slug, excerpt, thumbnail_url, price
    FROM legal_services
    WHERE NOT id = $1
    ORDER BY CASE WHEN legal_field_id = $2 THEN 0 ELSE 1 END
    LIMIT 3
  `, [ services.rows[0].id, services.rows[0].legal_field_id ])
  return res.status(200).send({
    service: services.rows[0],
    related_services: relatedServices.rows
  })
})

module.exports = router