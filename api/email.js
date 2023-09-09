const nodemailer = require('nodemailer')

// initialize email client
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// send email
async function send(params) {
  await transporter.sendMail(params)
}

module.exports = {
  send
}