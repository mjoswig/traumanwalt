/*var imaps = require('imap-simple')
const simpleParser = require('mailparser').simpleParser
const _ = require('lodash')

imaps.connect({
  imap: {
    user: 'support@traumanwalt.com',
    password: process.env.EMAIL_PASSWORD,
    host: 'mail.privateemail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
}).then(connection => {
  return connection.openBox('INBOX').then(() => {
    return connection.search(['1:5'], {
      bodies: ['HEADER', 'TEXT', '']
    }).then(messages => {
      messages.forEach(item => {
        const all = _.find(item.parts, { which: '' })
        const id = item.attributes.uid
        const idHeader = "Imap-Id: " + id + "\r\n"
        simpleParser(idHeader + all.body, (err, mail) => {
          console.log(mail.html)
        })
      })
    })
  })
})*/