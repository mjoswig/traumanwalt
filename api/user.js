const slugify = require('slugify')
const db = require('./db')

// create user
async function create(firebaseUid, salutation, academicTitle, firstName, lastName, addressLine, postalCode, city, country) {
  const slug = slugify(`${firstName} ${lastName}`, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  const jobTitle = salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'

  const trialExpiresAt = new Date()
  trialExpiresAt.setDate(trialExpiresAt.getDate() + 30)

  await db.query(`
    INSERT INTO users(
      firebase_uid, slug, salutation, job_title, academic_title, first_name, last_name,
      address_line, postal_code, city, country, trial_expires_at
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `, [
    firebaseUid, slug, salutation, jobTitle, academicTitle, firstName, lastName,
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
      suffix_title = $7,
      address_line = $8,
      postal_code = $9,
      city = $10,
      country = $11,
      landline_number = $12,
      mobile_number = $13,
      contact_email = $14,
      website_url = $15,
      linkedin_url = $16,
      xing_url = $17,
      facebook_url = $18,
      twitter_url = $19,
      instagram_url = $20,
      youtube_url = $21,
      about = $22
    WHERE firebase_uid = $23
  `, [
    userData.email,
    userData.salutation,
    userData.job_title,
    userData.academic_title,
    userData.first_name,
    userData.last_name,
    userData.suffix_title,
    userData.address_line,
    userData.postal_code,
    userData.city,
    userData.country,
    userData.landline_number,
    userData.mobile_number,
    userData.contact_email,
    userData.website_url,
    userData.linkedin_url,
    userData.xing_url,
    userData.facebook_url,
    userData.twitter_url,
    userData.instagram_url,
    userData.youtube_url,
    userData.about,
    firebaseUid
  ])
}

// update legal fields
async function updateLegalFields(legalFields, userId) {
  await db.query(`
    DELETE FROM user_legal_fields
    WHERE user_id = $1
  `, [ userId ])

  for (const legalField of legalFields) {
    try {
      await db.query(`
        INSERT INTO user_legal_fields(user_id, legal_field_id, specialized)
        VALUES($1, $2, $3)
      `, [ userId, legalField.id, legalField.specialized ])
    } catch {}
  }
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
  updateLegalFields,
  subscribeToMembership,
  unsubscribeFromMembership
}