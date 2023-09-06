const slugify = require('slugify')
const db = require('./db')

// create user
async function create(firebaseUid, salutation, academicTitle, firstName, lastName, addressLine, postalCode, city, country) {
  const slug = slugify(`${firstName} ${lastName}`, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  const trialExpiresAt = new Date()
  trialExpiresAt.setDate(trialExpiresAt.getDate() + 30)

  await db.query(`
    INSERT INTO users(
      firebase_uid, slug, salutation, academic_title, first_name, last_name,
      address_line, postal_code, city, country, trial_expires_at
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `, [
    firebaseUid, slug, salutation, academicTitle, firstName, lastName,
    addressLine, postalCode, city, country, trialExpiresAt
  ])

  return {
    success: true
  }
}

// update user
async function update(userData, firebaseUid) {
  await db.query(`
    UPDATE users
    SET
      email = $1,
      salutation = $2,
      job_title = $3,
      academic_title = $4,
      first_name = $5,
      last_name = $6,
      suffix_title = $7
    WHERE firebase_uid = $8
  `, [
    userData.email,
    userData.salutation,
    userData.job_title,
    userData.academic_title,
    userData.first_name,
    userData.last_name,
    userData.suffix_title,
    firebaseUid
  ])
}

// upgrade user to subscribed account
async function subscribeToMembership(userId) {
  await db.query(`
    UPDATE users
    SET
      subscribed = TRUE
    WHERE id = $1
  `, [ userId ])
}

// downgrade user to unsubscribed account
async function unsubscribeFromMembership(userId) {
  await db.query(`
    UPDATE users
    SET
      subscribed = FALSE
    WHERE id = $1
  `, [ userId ])
}

module.exports = {
  create,
  update,
  subscribeToMembership,
  unsubscribeFromMembership
}