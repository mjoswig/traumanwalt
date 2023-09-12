const router = require('express').Router()
const multer = require('multer')
const email = require('../email')

const upload = multer()

router.post('/webhook', upload.none(), async (req, res) => {
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