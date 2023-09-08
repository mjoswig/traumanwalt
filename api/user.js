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
      about = $22,
      memberships = $23,
      photo_url = $24
    WHERE firebase_uid = $25
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
    userData.memberships,
    userData.photo_url,
    firebaseUid
  ])
}

// create user's law firm
async function createLawFirm(lawFirmName, userId) {
  const lawFirmSlug = slugify(lawFirmName, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })
  const lawFirm = await db.query(`
    INSERT INTO law_firms(name, slug, admin_id)
    VALUES($1, $2, $3)
    RETURNING id
  `, [ lawFirmName, lawFirmSlug, userId ])
  await db.query(`
    INSERT INTO law_firm_users(law_firm_id, user_id)
    VALUES($1, $2)
  `, [ lawFirm.rows[0].id, userId ])
}

// update user's law firm
async function updateLawFirm(lawFirmData) {
  await db.query(`
    UPDATE law_firms
    SET
      name = $1,
      about = $2,
      logo_url = $3,
      address_line = $4,
      postal_code = $5,
      city = $6,
      country = $7,
      landline_number = $8,
      mobile_number = $9,
      contact_email = $10,
      website_url = $11,
      linkedin_url = $12,
      xing_url = $13,
      facebook_url = $14,
      twitter_url = $15,
      instagram_url = $16,
      youtube_url = $17
    WHERE law_firms.id = $18
  `, [
    lawFirmData.name,
    lawFirmData.about,
    lawFirmData.logo_url,
    lawFirmData.address_line,
    lawFirmData.postal_code,
    lawFirmData.city,
    lawFirmData.country,
    lawFirmData.landline_number,
    lawFirmData.mobile_number,
    lawFirmData.contact_email,
    lawFirmData.website_url,
    lawFirmData.linkedin_url,
    lawFirmData.xing_url,
    lawFirmData.facebook_url,
    lawFirmData.twitter_url,
    lawFirmData.instagram_url,
    lawFirmData.youtube_url,
    lawFirmData.id
  ])
}

// delete user's law firm
async function deleteLawFirm(userId) {
  await db.query(`
    DELETE FROM law_firms
    WHERE law_firms.admin_id = $1
  `, [ userId ])
}

// update languages
async function updateLanguages(languages, userId) {
  await db.query(`
    DELETE FROM user_languages
    WHERE user_id = $1
  `, [ userId ])

  for (const language of languages) {
    try {
      if (language.checked) {
        await db.query(`
          INSERT INTO user_languages(user_id, language_id)
          VALUES($1, $2)
        `, [ userId, language.id ])
      }
    } catch {}
  }
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
  createLawFirm,
  updateLawFirm,
  deleteLawFirm,
  updateLanguages,
  updateLegalFields,
  subscribeToMembership,
  unsubscribeFromMembership
}