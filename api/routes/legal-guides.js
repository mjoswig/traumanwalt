const router = require('express').Router()
const db = require('../db')

// get legal guides
router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT title, slug, thumbnail_url, content
    FROM legal_guides
    WHERE published IS TRUE
  `)
  return res.status(200).send(result.rows)
})

// update views of legal guide
router.post('/:slug/views/update', async (req, res) => {
  await db.query(`
    UPDATE legal_guides
    SET views = views + 1
    WHERE slug = $1
  `, [ req.params.slug ])
  return res.status(200).send(true)
})

module.exports = router