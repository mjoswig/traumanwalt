const router = require('express').Router()
const user = require('../user')
const email = require('../email')
const db = require('../db')

// create new user
router.post('/create', async (req, res) => {
  const response = await user.create(
    req.body.firebase_uid,
    req.body.salutation,
    req.body.academic_title,
    req.body.first_name,
    req.body.last_name,
    req.body.address_line,
    req.body.postal_code,
    req.body.city,
    req.body.country,
    req.body.mobile_number,
    req.body.client
  )
  return res.status(200).send(response)
})

// update user
router.post('/update', async (req, res) => {
  try {
    await user.update(req.body, req.body.firebase_uid)
    return res.status(200).send(true)
  } catch (e) {
    return res.status(400).send(e)
  }
})

// get user by firebase uid
router.get('/:firebase_uid', async (req, res) => {
  const users = await db.query(`
    SELECT *
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows[0])
})

// get legal fields by user
router.get('/:firebase_uid/legal-fields', async (req, res) => {
  const users = await db.query(`
    SELECT
      legal_fields.id AS id,
      legal_fields.name AS name,
      user_legal_fields.specialized AS specialized
    FROM legal_fields
    LEFT JOIN user_legal_fields ON user_legal_fields.legal_field_id = legal_fields.id
    LEFT JOIN users ON users.id = user_legal_fields.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows)
})

// update legal fields for user
router.post('/:firebase_uid/legal-fields/update', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.updateLegalFields(req.body.legal_fields, userResults.rows[0].id)
  return res.status(200).send(true)
})

// get languages by user
router.get('/:firebase_uid/languages', async (req, res) => {
  const users = await db.query(`
    SELECT
      languages.id AS id,
      languages.name AS name
    FROM languages
    LEFT JOIN user_languages ON user_languages.language_id = languages.id
    LEFT JOIN users ON users.id = user_languages.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows)
})

// update languages for user
router.post('/:firebase_uid/languages/update', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.updateLanguages(Object.values(req.body.languages), userResults.rows[0].id)
  return res.status(200).send(true)
})

// get law firm that user is associated with
router.get('/:firebase_uid/law-firm', async (req, res) => {
  const users = await db.query(`
    SELECT
      law_firms.id AS id,
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
      law_firms.youtube_url AS youtube_url,
      law_firms.admin_id AS admin_id
    FROM law_firms
    LEFT JOIN law_firm_users ON law_firm_users.law_firm_id = law_firms.id
    LEFT JOIN users ON users.id = law_firm_users.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  return res.status(200).send(users.rows[0])
})

// create law firm
router.post('/:firebase_uid/law-firm/create', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.createLawFirm(req.body.name, userResults.rows[0].id)
  return res.status(200).send(true)
})

// update law firm
router.post('/:firebase_uid/law-firm/update', async (req, res) => {
  await user.updateLawFirm(req.body)
  return res.status(200).send(true)
})

// delete law firm
router.post('/:firebase_uid/law-firm/delete', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.deleteLawFirm(userResults.rows[0].id)
  return res.status(200).send(true)
})

// remove user from law firm
router.post('/:firebase_uid/law-firm/users/remove', async (req, res) => {
  const lawFirmResults = await db.query(`
    SELECT law_firms.id AS id
    FROM law_firms
    LEFT JOIN users ON users.id = law_firms.admin_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    DELETE FROM law_firm_users
    WHERE law_firm_id = $1 AND user_id = $2
  `, [ lawFirmResults.rows[0].id, req.body.user_id ])
  return res.status(200).send(true)
})

// join law firm
router.post('/:firebase_uid/law-firm/join', async (req, res) => {
  const userResults = await db.query(`
    SELECT id
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    INSERT INTO law_firm_users(law_firm_id, user_id)
    VALUES($1, $2)
  `, [ req.body.law_firm_id, userResults.rows[0].id ])
  return res.status(200).send(true)
})

// leave law firm
router.post('/:firebase_uid/law-firm/leave', async (req, res) => {
  const userResults = await db.query(`
    SELECT id
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await db.query(`
    DELETE FROM law_firm_users
    WHERE user_id = $1
  `, [ userResults.rows[0].id ])
  return res.status(200).send(true)
})

// get reviews by user
router.get('/:firebase_uid/reviews', async (req, res) => {
  const reviews = await db.query(`
    SELECT
      count(*) OVER() AS total_count,
      reviews.id AS id,
      reviews.author AS author,
      reviews.rating AS rating,
      reviews.title AS title,
      reviews.description AS description,
      reviews.comment AS comment,
      reviews.created_at AS created_at
    FROM reviews
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE users.firebase_uid = $1
    ORDER BY reviews.created_at DESC
    LIMIT $2 OFFSET $3
  `, [ req.params.firebase_uid, req.query.page_length, (req.query.page - 1) * req.query.page_length ])
  return res.status(200).send(reviews.rows)
})

// send review invitation
router.post('/:firebase_uid/reviews/invite', async (req, res) => {
  const userResults = await db.query(`
    SELECT id, slug, salutation, first_name, last_name
    FROM users
    WHERE firebase_uid = $1
  `, [ req.params.firebase_uid ])
  const user = userResults.rows[0]
  const jobTitle = user.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
  const inviteUrl = `https://traumanwalt.com/anwalt/${user.slug}/bewerten`

  for (let emailAddress of req.body.emails) {
    await email.send({
      from: '"Traumanwalt" <support@traumanwalt.com>',
      to: emailAddress,
      subject: 'Bitte bewerten Sie mich',
      text: `Sie wurden von ${jobTitle} ${user.first_name} ${user.last_name} eingeladen, eine Bewertung auf Traumanwalt zu verfassen.\n\nLink: ${inviteUrl}\n\nMit freundlichen Grüßen,\n\nIhr Traumanwalt Team`
    })
  }

  return res.status(200).send(true)
})

// update review
router.post('/:firebase_uid/reviews/update', async (req, res) => {
  await user.updateReview(req.body)
  return res.status(200).send(true)
})

// get legal guides by user
router.get('/:firebase_uid/legal-guides', async (req, res) => {
  const legalGuides = await db.query(`
    SELECT
      count(*) OVER() AS total_count,
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
    WHERE users.firebase_uid = $1
    ORDER BY legal_guides.created_at DESC
    LIMIT $2 OFFSET $3
  `, [ req.params.firebase_uid, req.query.page_length, (req.query.page - 1) * req.query.page_length ])
  return res.status(200).send(legalGuides.rows)
})

// create legal guide for user
router.post('/:firebase_uid/legal-guides/create', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.createLegalGuide(req.body, userResults.rows[0].id)
  return res.status(200).send(true)
})

// update legal guide for user
router.post('/:firebase_uid/legal-guides/update', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.updateLegalGuide(req.body, userResults.rows[0].id)
  return res.status(200).send(true)
})

// get legal guide by user
router.get('/:firebase_uid/legal-guides/:id', async (req, res) => {
  const guideResults = await db.query(`
    SELECT
      legal_guides.id AS id,
      legal_guides.title AS title,
      legal_guides.slug AS slug,
      legal_guides.thumbnail_url AS thumbnail_url,
      legal_guides.content AS content,
      legal_guides.published AS published
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE users.firebase_uid = $1 AND legal_guides.id = $2
  `, [ req.params.firebase_uid, req.params.id ])
  return res.status(200).send(guideResults.rows[0])
})

// delete legal guide for user
router.post('/:firebase_uid/legal-guides/:id/delete', async (req, res) => {
  const userResults = await db.query('SELECT id FROM users WHERE firebase_uid = $1', [ req.params.firebase_uid ])
  await user.deleteLegalGuide(req.params.id, userResults.rows[0].id)
  return res.status(200).send(true)
})

// get stats by user
router.get('/:firebase_uid/stats', async (req, res) => {
  const profileViewResults = await db.query(`
    SELECT SUM(count) AS count
    FROM profile_views
    LEFT JOIN users ON users.id = profile_views.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])

  const reviewResults = await db.query(`
    SELECT count(*) OVER() AS count
    FROM reviews
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])

  const conversationResults = await db.query(`
    SELECT count(*) OVER() AS count
    FROM conversations
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])

  const legalGuideResults = await db.query(`
    SELECT SUM(views) AS count
    FROM legal_guides
    LEFT JOIN users ON users.id = legal_guides.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])

  const stats = {
    profile_views: profileViewResults.rows[0] ? parseInt(profileViewResults.rows[0].count || 0) : 0,
    reviews: reviewResults.rows[0] ? parseInt(reviewResults.rows[0].count || 0) : 0,
    conversations: conversationResults.rows[0] ? parseInt(conversationResults.rows[0].count || 0) : 0,
    legal_guide_views: legalGuideResults.rows[0] ? parseInt(legalGuideResults.rows[0].count || 0) : 0
  }

  return res.status(200).send(stats)
})

// get profile views by user
router.get('/:firebase_uid/profile-views', async (req, res) => {
  let result = await db.query(`
    SELECT count, profile_views.created_at
    FROM profile_views
    LEFT JOIN users ON users.id = profile_views.user_id
    WHERE users.firebase_uid = $1 AND profile_views.created_at > (CURRENT_DATE - INTERVAL '12 MONTHS')
    ORDER BY profile_views.created_at ASC
    LIMIT 12
  `, [ req.params.firebase_uid ])
  return res.status(200).send(result.rows)
})

// get conversations by user
router.get('/:firebase_uid/conversations', async (req, res) => {
  const conversations = await db.query(`
    SELECT
      count(*) OVER() AS total_count,
      conversations.id AS id,
      conversations.subject AS subject,
      conversations.from_first_name AS from_first_name,
      conversations.from_last_name AS from_last_name,
      conversations.unread_messages AS unread_messages,
      conversations.created_at AS created_at,
      MAX(conversation_messages.created_at) AS last_message_created_at
    FROM conversations
    LEFT JOIN conversation_messages ON conversation_messages.conversation_id = conversations.id
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1
    GROUP BY conversations.id, conversations.from_first_name, conversations.from_last_name, conversations.unread_messages, conversations.created_at
    ORDER BY conversations.unread_messages DESC, conversations.created_at DESC
    LIMIT $2 OFFSET $3
  `, [ req.params.firebase_uid, req.query.page_length, (req.query.page - 1) * req.query.page_length ])
  return res.status(200).send(conversations.rows)
})

// get number of unread conversations
router.get('/:firebase_uid/conversations/unread', async (req, res) => {
  const conversationResults = await db.query(`
    SELECT count(*) OVER() AS total_count
    FROM conversations
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1 AND conversations.unread_messages IS TRUE
  `, [ req.params.firebase_uid ])
  return res.status(200).send(conversationResults.rows[0])
})

// get conversation messages
router.get('/:firebase_uid/conversations/:id', async (req, res) => {
  const conversationMessages = await db.query(`
    SELECT
      conversations.id AS id,
      conversations.subject AS subject,
      conversations.from_email AS from_email,
      conversations.from_phone AS from_phone,
      conversations.from_salutation AS from_salutation,
      conversations.from_first_name AS from_first_name,
      conversations.from_last_name AS from_last_name,
      conversation_messages.text AS text,
      conversation_messages.sent AS sent,
      conversation_messages.created_at AS created_at
    FROM conversation_messages
    LEFT JOIN conversations ON conversations.id = conversation_messages.conversation_id
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1 AND conversations.id = $2
    ORDER BY conversation_messages.created_at ASC
  `, [ req.params.firebase_uid, req.params.id ])
  return res.status(200).send(conversationMessages.rows)
})

// mark conversation as read
router.post('/:firebase_uid/conversations/:id/read', async (req, res) => {
  const conversationResults = await db.query(`
    SELECT conversations.id AS id
    FROM conversations
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])
  await user.markConversationAsRead(conversationResults.rows[0].id)
  return res.status(200).send(true)
})

// reply to conversation
router.post('/:firebase_uid/conversations/:id/reply', async (req, res) => {
  const conversationResults = await db.query(`
    SELECT
      conversations.id AS id,
      conversations.from_email AS from_email,
      users.job_title AS user_job_title,
      users.first_name AS user_first_name,
      users.last_name AS user_last_name
    FROM conversations
    LEFT JOIN users ON users.id = conversations.user_id
    WHERE users.firebase_uid = $1
  `, [ req.params.firebase_uid ])

  const message = {
    text: req.body.text,
    sent: true
  }

  const conversation = conversationResults.rows[0]

  const sender = {
    job_title: conversationResults.rows[0].user_job_title,
    first_name: conversationResults.rows[0].user_first_name,
    last_name: conversationResults.rows[0].user_last_name
  }

  await user.replyToConversation(message, conversation, sender)

  return res.status(200).send(true)
})

module.exports = router