const router = require('express').Router()
const multer = require('multer')
const email = require('../email')
const db = require('../db')

const upload = multer()

router.post('/webhook', upload.none(), async (req, res) => {
  const to = req.body.to
  const text = req.body.text

  let conversationId = null
  if (email.indexOf('<') !== -1) {
    const conversation = to.split('<')[1].split('@')[0]
    conversationId = parseInt(conversation.split('c')[1])
  } else {
    const conversation = to.split('@')[0]
    conversationId = parseInt(conversation.split('c')[1])
  }

  if (conversationId) {
    await db.query(`
      INSERT INTO conversation_messages(text, sent, conversation_id)
      VALUES($1, $2, $3)
    `, [ text, false, conversationId ])

    const userResults = await db.query(`
      SELECT
        users.email AS email,
        users.salutation AS salutation,
        users.last_name AS last_name,
        conversations.from_first_name AS from_first_name,
        conversations.from_last_name AS from_last_name
      FROM users
      LEFT JOIN conversations ON conversations.user_id = users.id
      WHERE conversations.id = $1
    `, [ conversationId ])

    if (userResults.rows.length) {
      const user = userResults.rows[0]
      const recipientName = `${user.from_first_name} ${user.from_last_name}`

      await email.send({
        from: `"Traumanwalt" <support@traumanwalt.com>`,
        to: user.email,
        subject: `Neue Nachricht von ${recipientName}`,
        text: `Hallo ${user.salutation} ${user.last_name},\n\nSie haben eine neue Nachricht von ${recipientName} auf Traumanwalt erhalten. Bitte melden Sie sich kurz auf traumanwalt.com an und antworten Sie auf die Nachricht.\n\nMit freundlichen Grüßen,\n\nIhr Traumanwalt Team`
      })
    }
  }

  return res.status(200).send(true)
})

module.exports = router