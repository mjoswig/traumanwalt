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

module.exports = router