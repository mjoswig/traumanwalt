const router = require('express').Router()
const multer = require('multer')
const email = require('../email')

const upload = multer()

router.post('/webhook', upload.none(), async (req, res) => {
  //const from = req.body.from
  const to = req.body.to
  const text = req.body.text
  const subject = req.body.subject

  // @TODO: store values in conversation_messages

  // @TODO: send email notification to user
  await email.send({
    from: `"Traumanwalt" <support@traumanwalt.com>`,
    to: 'manuel.joswig@gmail.com',
    subject: 'Response from webhook',
    text: `${to},${text},${subject}`
  })

  return res.status(200).send(true)
})

module.exports = router