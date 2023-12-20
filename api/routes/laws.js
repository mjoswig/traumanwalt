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

// get all law paragraphs
router.get('/paragraphs', async (req, res) => {
  const result = await db.query(`
    SELECT
      laws.slug AS law_slug,
      law_paragraphs.slug AS slug
    FROM law_paragraphs
    LEFT JOIN laws ON laws.id = law_paragraphs.law_id
  `)
  return res.status(200).send(result.rows)
})

// get single law paragraph by slug
router.get('/paragraphs/:paragraph_slug', async (req, res) => {
  const result = await db.query(`
    SELECT
      laws.slug AS law_slug,
      laws.title_short AS law_title_short,
      law_paragraphs.law_id AS law_id,
      law_paragraphs.id AS id,
      law_paragraphs.slug AS slug,
      law_paragraphs.title_short AS title_short,
      law_paragraphs.title_long AS title_long,
      law_paragraphs.content AS content
    FROM law_paragraphs
    LEFT JOIN laws ON laws.id = law_paragraphs.law_id
    WHERE law_paragraphs.slug = $1
  `, [ req.params.paragraph_slug ])

  const resultBefore = await db.query(`
    SELECT
      law_paragraphs.slug AS slug,
      law_paragraphs.title_short AS title_short
    FROM law_paragraphs
    WHERE law_paragraphs.id < $1 AND law_paragraphs.law_id = $2
    ORDER BY $1 - law_paragraphs.id ASC
    LIMIT 1
  `, [ result.rows[0].id, result.rows[0].law_id ])

  const resultAfter = await db.query(`
    SELECT
      law_paragraphs.slug AS slug,
      law_paragraphs.title_short AS title_short
    FROM law_paragraphs
    WHERE law_paragraphs.id > $1 AND law_paragraphs.law_id = $2
    ORDER BY law_paragraphs.id - $1 ASC
    LIMIT 1
  `, [ result.rows[0].id, result.rows[0].law_id ])

  return res.status(200).send({
    result_before: resultBefore.rows[0],
    result_after: resultAfter.rows[0],
    result: result.rows[0]
  })
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

// get law paragraphs by law
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
    ORDER BY law_paragraphs.id ASC
  `, [ req.params.law_slug ])
  return res.status(200).send(result.rows)
})

module.exports = router