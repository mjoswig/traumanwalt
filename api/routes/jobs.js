const router = require('express').Router()
const db = require('../db')

// get all job types
router.get('/types', async (req, res) => {
  const jobTypes = await db.query(`
    SELECT id, name
    FROM job_types
    ORDER BY id ASC
  `)
  return res.status(200).send(jobTypes.rows)
})

// get all employment types
router.get('/employment-types', async (req, res) => {
  const employmentTypes = await db.query(`
    SELECT id, name
    FROM employment_types
    ORDER BY id ASC
  `)
  return res.status(200).send(employmentTypes.rows)
})

// create new job
router.post('/create', async (req, res) => {
  const jobResults = await db.query(`
    INSERT INTO jobs(
      title, description, type_id, employment_type_id, location,
      company_name, company_logo_url, company_address_line, company_postal_code,
      company_city, company_country, company_email, company_phone, company_website_url,
      company_linkedin_url
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING id
  `, [
    req.body.title, req.body.description, req.body.type_id, req.body.employment_type_id,
    req.body.location, req.body.company_name, req.body.company_logo_url, req.body.company_address_line,
    req.body.company_postal_code, req.body.company_city, req.body.company_country, req.body.company_email,
    req.body.company_phone, req.body.company_website_url, req.body.company_linkedin_url
  ])

  if (req.body.legal_field_id) {
    await db.query(`
      INSERT INTO job_legal_fields(
        job_id, legal_field_id
      )
      VALUES($1, $2)
    `, [ jobResults.rows[0].id, req.body.legal_field_id ])
  }

  return res.status(200).send(jobResults.rows[0])
})

module.exports = router