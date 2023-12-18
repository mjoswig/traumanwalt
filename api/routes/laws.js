const router = require('express').Router()
const db = require('../db')

// get laws
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT title_short, title_long, slug, popular
    FROM laws
    ORDER BY slug ASC
  `)
  return res.status(200).send(result.rows)
})

// get law sections
router.get('/:law_slug', async (req, res) => {
  const result = await db.query(`
    SELECT
      laws.title_short AS law_title_short,
      laws.title_long AS law_title_long,
      laws.slug AS law_slug,
      law_sections.id AS id,
      law_sections.title AS title,
      law_sections.description AS description,
      law_sections.parent_id AS parent_id
    FROM law_sections
    LEFT JOIN laws ON laws.id = law_sections.law_id
    WHERE laws.slug = $1
  `, [ req.params.law_slug ])
  return res.status(200).send(result.rows)
})

// get law paragraphs
router.get('/:law_slug/paragraphs', async (req, res) => {
  const result = await db.query(`
    SELECT
      law_paragraphs.title_short AS title_short,
      law_paragraphs.title_long AS title_long,
      law_paragraphs.section_id AS section_id,
      law_paragraphs.slug AS slug
    FROM law_paragraphs
    LEFT JOIN laws ON laws.id = law_paragraphs.law_id
    WHERE laws.slug = $1
  `, [ req.params.law_slug ])
  return res.status(200).send(result.rows)
})

module.exports = router