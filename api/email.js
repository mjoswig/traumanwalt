const { SMTPClient } = require('emailjs')

// initialize email client
const smtpClient = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true
})

// send email
function send(params) {
  smtpClient.send(params, (err, message) => {
    console.log(err || message)
  })
}

module.exports = {
  send
}