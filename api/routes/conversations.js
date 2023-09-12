const router = require('express').Router()
const email = require('../email')

router.post('/webhook', async (req, res) => {
  const from = req.body.from
  const text = req.body.text
  const subject = req.body.subject
  await email.send({
    from: `"Traumanwalt" <support@traumanwalt.com>`,
    to: 'manuel.joswig@gmail.com',
    subject: 'Response from webhook',
    text: `${from},${text},${subject}`
  })
  return res.status(200).send(true)
})

module.exports = router