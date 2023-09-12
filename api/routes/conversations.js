const router = require('express').Router()
const email = require('../email')
//const db = require('../db')

router.post('/webhook', async (req, res) => {
  await email.send({
    from: `"Traumanwalt" <support@traumanwalt.com>`,
    to: 'manuel.joswig@gmail.com',
    subject: 'Response from webhook',
    text: `Webhook triggered: ${req.body}`
  })
  return res.status(200).send(true)
})

module.exports = router