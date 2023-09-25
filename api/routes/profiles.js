const router = require('express').Router()
const user = require('../user')
const email = require('../email')
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
      COUNT(*) OVER() AS total_count,
      COALESCE(reviews.total_reviews, 0) AS total_reviews,
      COALESCE(reviews.total_rating_sum, 0) AS total_rating_sum,
      (total_rating_sum::decimal / reviews.total_reviews::decimal) AS average_rating,
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
    LEFT JOIN (SELECT r.user_id, COUNT(1) AS total_reviews, SUM(r.rating) AS total_rating_sum FROM reviews r GROUP BY r.user_id) AS reviews ON reviews.user_id = users.id
    WHERE users.client IS FALSE
    GROUP BY users.slug, salutation, job_title, academic_title, first_name, last_name, suffix_title, photo_url, address_line, postal_code, city, users.created_at, reviews.total_reviews, reviews.total_rating_sum
    ORDER BY users.created_at DESC
    ${queryArgs.length === 2 ? 'LIMIT $1 OFFSET $2' : ''}
  `, queryArgs)

  return res.status(200).send(profiles.rows)
})

// get profiles by category slug
router.get('/category/:slug', async (req, res) => {
  const queryArgs = []
  let limitQuery = false
  if (req.query.page && req.query.page_length) {
    limitQuery = true
    queryArgs.push(req.query.page_length)
    queryArgs.push((req.query.page - 1) * req.query.page_length)
  }

  let queryCondition = ''
  const categories = []

  const legalField = await db.query(`
    SELECT id, name, slug
    FROM legal_fields
    WHERE $1 LIKE '%' || slug || '%'
  `, [ req.params.slug.toLowerCase() ])

  const city = await db.query(`
    SELECT id, name, slug
    FROM cities
    WHERE $1 LIKE '%' || slug || '%'
  `, [ req.params.slug.toLowerCase() ])

  if (legalField.rows.length && city.rows.length) {
    queryCondition = `legal_fields.id = $${queryArgs.length + 1} AND users.city = $${queryArgs.length + 2}`
    queryArgs.push(legalField.rows[0].id)
    queryArgs.push(city.rows[city.rows.length - 1].name)
    categories.push({
      name: legalField.rows[0].name,
      type: 'legal_field'
    })
    categories.push({
      name: city.rows[city.rows.length - 1].name,
      type: 'city'
    })
  } else if (legalField.rows.length && !city.rows.length) {
    queryCondition = `legal_fields.id = $${queryArgs.length + 1}`
    queryArgs.push(legalField.rows[0].id)
    categories.push({
      name: legalField.rows[0].name,
      type: 'legal_field'
    })
  } else if (!legalField.rows.length && city.rows.length) {
    queryCondition = `users.city = $${queryArgs.length + 1}`
    queryArgs.push(city.rows[city.rows.length - 1].name)
    categories.push({
      name: city.rows[city.rows.length - 1].name,
      type: 'city'
    })
  }

  const profiles = await db.query(`
    SELECT
      COUNT(*) OVER() AS total_count,
      COALESCE(reviews.total_reviews, 0) AS total_reviews,
      COALESCE(reviews.total_rating_sum, 0) AS total_rating_sum,
      (total_rating_sum::decimal / reviews.total_reviews::decimal) AS average_rating,
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
    LEFT JOIN (SELECT r.user_id, COUNT(1) AS total_reviews, SUM(r.rating) AS total_rating_sum FROM reviews r GROUP BY r.user_id) AS reviews ON reviews.user_id = users.id
    WHERE users.client IS FALSE AND ${queryCondition ? queryCondition : ''}
    GROUP BY users.slug, salutation, job_title, academic_title, first_name, last_name, suffix_title, photo_url, address_line, postal_code, city, users.created_at, reviews.total_reviews, reviews.total_rating_sum
    ORDER BY users.created_at DESC
    ${limitQuery ? 'LIMIT $1 OFFSET $2' : ''}
  `, queryArgs)

  return res.status(200).send({
    profiles: profiles.rows,
    categories
  })
})

// get profile
router.get('/:slug', async (req, res) => {
  const languages = await db.query(`
    SELECT name
    FROM languages
    LEFT JOIN user_languages ON user_languages.language_id = languages.id
    LEFT JOIN users ON users.id = user_languages.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const legalFields = await db.query(`
    SELECT
      legal_fields.id AS id,
      legal_fields.name AS name,
      legal_fields.slug AS slug,
      user_legal_fields.specialized AS specialized
    FROM legal_fields
    LEFT JOIN user_legal_fields ON user_legal_fields.legal_field_id = legal_fields.id
    LEFT JOIN users ON users.id = user_legal_fields.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const legalGuides = await db.query(`
    SELECT
      legal_guides.id AS id,
      legal_guides.title AS title,
      legal_guides.slug AS slug,
      legal_guides.thumbnail_url AS thumbnail_url,
      legal_guides.content AS content,
      legal_guides.views AS views,
      legal_guides.published AS published,
      legal_guides.created_at AS created_at
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE users.slug = $1
    ORDER BY legal_guides.created_at DESC
    LIMIT 2
  `, [ req.params.slug ])

  const reviews = await db.query(`
    SELECT
      COUNT(*) OVER() AS total_count,
      SUM(reviews.rating) OVER() AS total_sum,
      reviews.author AS author,
      reviews.rating AS rating,
      reviews.title AS title,
      reviews.description AS description,
      reviews.comment AS comment,
      reviews.created_at AS created_at
    FROM reviews
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE users.slug = $1
    ORDER BY reviews.created_at DESC
    LIMIT 3
  `, [ req.params.slug ])

  const lawFirm = await db.query(`
    SELECT
      law_firms.name AS name,
      law_firms.slug AS slug,
      law_firms.about AS about,
      law_firms.logo_url AS logo_url,
      law_firms.address_line AS address_line,
      law_firms.postal_code AS postal_code,
      law_firms.city AS city,
      law_firms.country AS country,
      law_firms.landline_number AS landline_number,
      law_firms.mobile_number AS mobile_number,
      law_firms.contact_email AS contact_email,
      law_firms.website_url AS website_url,
      law_firms.linkedin_url AS linkedin_url,
      law_firms.xing_url AS xing_url,
      law_firms.facebook_url AS facebook_url,
      law_firms.twitter_url AS twitter_url,
      law_firms.instagram_url AS instagram_url,
      law_firms.youtube_url AS youtube_url
    FROM law_firms
    LEFT JOIN law_firm_users ON law_firm_users.law_firm_id = law_firms.id
    LEFT JOIN users ON users.id = law_firm_users.user_id
    WHERE users.slug = $1
  `, [ req.params.slug ])

  let lawFirmUsers = []
  if (lawFirm.rows.length) {
    const users = await db.query(`
      SELECT
        users.id AS id,
        users.slug AS slug,
        users.salutation AS salutation,
        users.first_name AS first_name,
        users.last_name AS last_name,
        users.photo_url AS photo_url
      FROM users
      LEFT JOIN law_firm_users ON law_firm_users.user_id = users.id
      LEFT JOIN law_firms ON law_firms.id = law_firm_users.law_firm_id
      WHERE law_firms.slug = $1
    `, [ lawFirm.rows[0].slug ])
    lawFirmUsers = users.rows
  }

  const profiles = await db.query(`
    SELECT
      users.slug AS slug,
      salutation, job_title, academic_title, first_name, last_name, suffix_title,
      photo_url, address_line, postal_code, city, memberships, landline_number,
      mobile_number, contact_email, website_url, linkedin_url, xing_url, facebook_url,
      twitter_url, instagram_url, youtube_url
    FROM users
    WHERE users.slug = $1
  `, [ req.params.slug ])

  let profile = null
  if (profiles.rows[0]) {
    profile = {
      ...profiles.rows[0],
      law_firm: {
        ...lawFirm.rows[0],
        users: lawFirmUsers
      },
      languages: languages.rows,
      legal_fields: legalFields.rows,
      legal_guides: legalGuides.rows,
      reviews: reviews.rows
    }
  }

  return res.status(200).send(profile)
})

// get legal guides
router.get('/:slug/legal-guides', async (req, res) => {
  const queryArgs = []
  if (req.query.page && req.query.page_length) {
    queryArgs.push(req.query.page_length)
    queryArgs.push((req.query.page - 1) * req.query.page_length)
  }

  const users = await db.query(`
    SELECT
      slug, salutation, job_title, first_name, last_name, photo_url
    FROM users
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const legalGuides = await db.query(`
    SELECT
      COUNT(*) OVER() AS total_count,
      legal_guides.id AS id,
      legal_guides.title AS title,
      legal_guides.slug AS slug,
      legal_guides.thumbnail_url AS thumbnail_url,
      legal_guides.content AS content,
      legal_guides.views AS views,
      legal_guides.published AS published,
      legal_guides.created_at AS created_at,
      users.first_name AS user_first_name,
      users.last_name AS user_last_name
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE users.slug = $1
    ORDER BY legal_guides.created_at DESC
    ${queryArgs.length === 2 ? 'LIMIT $2 OFFSET $3' : ''}
  `, [ req.params.slug, ...queryArgs ])

  return res.status(200).send({
    user: users.rows[0],
    legal_guides: legalGuides.rows
  })
})

// get reviews
router.get('/:slug/reviews', async (req, res) => {
  const queryArgs = []
  if (req.query.page && req.query.page_length) {
    queryArgs.push(req.query.page_length)
    queryArgs.push((req.query.page - 1) * req.query.page_length)
  }

  const users = await db.query(`
    SELECT
      slug, salutation, job_title, first_name, last_name, photo_url
    FROM users
    WHERE users.slug = $1
  `, [ req.params.slug ])

  const reviews = await db.query(`
    SELECT
      COUNT(*) OVER() AS total_count,
      SUM(reviews.rating) OVER() AS total_sum,
      reviews.id AS id,
      reviews.author AS author,
      reviews.rating AS rating,
      reviews.title AS title,
      reviews.description AS description,
      reviews.comment AS comment,
      reviews.created_at AS created_at
    FROM reviews
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE users.slug = $1
    ORDER BY reviews.created_at DESC
    ${queryArgs.length === 2 ? 'LIMIT $2 OFFSET $3' : ''}
  `, [ req.params.slug, ...queryArgs ])

  return res.status(200).send({
    user: users.rows[0],
    reviews: reviews.rows
  })
})

// review user's profile
router.post('/:slug/review', async (req, res) => {
  // validate security question answer to prevent bot attacks
  if (req.body.sqa + req.body.sqb !== req.body.sqn) return res.status(200).send(true)

  const userResults = await db.query('SELECT id, email, salutation, last_name FROM users WHERE slug = $1', [ req.params.slug ])

  await user.createReview({
    rating: req.body.rating,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  }, userResults.rows[0].id)

  await email.send({
    from: '"Traumanwalt" <support@traumanwalt.com>',
    replyTo: `"Traumanwalt" <support@traumanwalt.com>`,
    to: userResults.rows[0].email,
    subject: 'Neue Bewertung',
    html: `Hallo ${userResults.rows[0].salutation} ${userResults.rows[0].last_name},<br /><br />Sie haben eine neue Bewertung auf Traumanwalt erhalten. Bitte loggen Sie sich bei traumanwalt.com ein, um die Bewertung öffentlich zu kommentieren.<br /><br />Bewertung: ${req.body.rating} Sterne<br />Überschrift: ${req.body.title}<br />Beschreibung: ${req.body.description}<br />Name: ${req.body.author}<br /><br />Mit freundlichen Grüßen,<br /><br />Ihr Traumanwalt Team`
  })

  return res.status(200).send(true)
})

// contact user's profile
router.post('/:slug/contact', async (req, res) => {
  // validate security question answer to prevent bot attacks
  if (req.body.sqa + req.body.sqb !== req.body.sqn) return res.status(200).send(true)

  const userResults = await db.query('SELECT id, email, salutation, last_name FROM users WHERE slug = $1', [ req.params.slug ])

  await user.createConversation({
    subject: 'Neue Anfrage',
    text: req.body.message,
    from_email: req.body.email,
    from_phone: req.body.phone,
    from_salutation: req.body.salutation,
    from_first_name: req.body.first_name,
    from_last_name: req.body.last_name,
    from_id: req.body.from_id
  }, userResults.rows[0].id)

  await email.send({
    from: '"Traumanwalt" <support@traumanwalt.com>',
    replyTo: `"Traumanwalt" <support@traumanwalt.com>`,
    to: userResults.rows[0].email,
    subject: 'Neue Anfrage',
    html: `Hallo ${userResults.rows[0].salutation} ${userResults.rows[0].last_name},<br /><br />Sie haben eine neue Anfrage auf Traumanwalt erhalten. Bitte loggen Sie sich bei traumanwalt.com ein und antworten Sie anschließend über das interne Nachrichtensystem.<br /><br />Name: ${req.body.salutation} ${req.body.first_name} ${req.body.last_name}<br />E-Mail: ${req.body.email}<br />Telefonnummer: ${req.body.phone}<br />Nachricht: ${req.body.message}<br /><br />Mit freundlichen Grüßen,<br /><br />Ihr Traumanwalt Team`
  })

  return res.status(200).send(true)
})

module.exports = router