const slugify = require('slugify')
const email = require('./email')
const db = require('./db')

// create user
async function create(firebaseUid, salutation, academicTitle, firstName, lastName, addressLine, postalCode, city, country, mobileNumber, isClient) {
  let slug = slugify(`${firstName} ${lastName}`, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  const userResults = await db.query('SELECT slug FROM users WHERE slug ILIKE $1', [ slug ])
  if (userResults.rows.length) {
    const slugIndex = userResults.rows.length
    slug += `-${slugIndex}`
  }

  let jobTitle = null
  let trialExpiresAt = null
  if (!isClient) {
    jobTitle = salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
    trialExpiresAt = new Date()
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 30)
  }

  const newUserResults = await db.query(`
    INSERT INTO users(
      firebase_uid, slug, salutation, job_title, academic_title, first_name, last_name,
      address_line, postal_code, city, country, mobile_number, trial_expires_at, client
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id
  `, [
    firebaseUid, slug, salutation, jobTitle, academicTitle, firstName, lastName,
    addressLine, postalCode, city, country, mobileNumber, trialExpiresAt, isClient
  ])

  await createConversation({
    subject: 'Willkommen auf Traumanwalt',
    text: `Hallo ${salutation} ${lastName}, ich begrüße Sie im Namen des Teams recht herzlich auf unserer Plattform. Antworten Sie mir gerne auf diese Nachricht, falls Sie Fragen oder Anmerkungen haben.`,
    from_email: 'manuel.joswig@traumanwalt.com',
    from_phone: '+491727636181',
    from_salutation: 'Herr',
    from_first_name: 'Manuel',
    from_last_name: 'Joswig'
  }, newUserResults.rows[0].id)

  return {
    success: true
  }
}

// update user
async function update(userData, firebaseUid) {
  let slug = slugify(`${userData.first_name} ${userData.last_name}`, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  if (slug.indexOf(userData.slug) === -1) {
    const userResults = await db.query('SELECT slug FROM users WHERE slug ILIKE $1', [ slug ])
    if (userResults.rows.length) {
      const slugIndex = userResults.rows.length
      slug += `-${slugIndex}`
    }
  }

  await db.query(`
    UPDATE users
    SET
      email = $1,
      slug = $2,
      salutation = $3,
      job_title = $4,
      academic_title = $5,
      first_name = $6,
      last_name = $7,
      suffix_title = $8,
      address_line = $9,
      postal_code = $10,
      city = $11,
      country = $12,
      landline_number = $13,
      mobile_number = $14,
      contact_email = $15,
      website_url = $16,
      linkedin_url = $17,
      xing_url = $18,
      facebook_url = $19,
      twitter_url = $20,
      instagram_url = $21,
      youtube_url = $22,
      about = $23,
      memberships = $24,
      photo_url = $25
    WHERE firebase_uid = $26
  `, [
    userData.email,
    slug,
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
  let slug = slugify(lawFirmName, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  const lawFirmResults = await db.query('SELECT slug FROM law_firms WHERE slug ILIKE $1', [ slug ])
  if (lawFirmResults.rows.length) {
    const slugIndex = lawFirmResults.rows.length
    slug += `-${slugIndex}`
  }

  const lawFirm = await db.query(`
    INSERT INTO law_firms(name, slug, admin_id)
    VALUES($1, $2, $3)
    RETURNING id
  `, [ lawFirmName, slug, userId ])

  await db.query(`
    INSERT INTO law_firm_users(law_firm_id, user_id)
    VALUES($1, $2)
  `, [ lawFirm.rows[0].id, userId ])
}

// update user's law firm
async function updateLawFirm(lawFirmData) {
  let slug = slugify(lawFirmData.name, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  if (slug.indexOf(lawFirmData.slug) === -1) {
    const lawFirmResults = await db.query('SELECT slug FROM law_firms WHERE slug ILIKE $1', [ slug ])
    if (lawFirmResults.rows.length) {
      const slugIndex = lawFirmResults.rows.length
      slug += `-${slugIndex}`
    }
  }

  await db.query(`
    UPDATE law_firms
    SET
      name = $1,
      slug = $2,
      about = $3,
      logo_url = $4,
      address_line = $5,
      postal_code = $6,
      city = $7,
      country = $8,
      landline_number = $9,
      mobile_number = $10,
      contact_email = $11,
      website_url = $12,
      linkedin_url = $13,
      xing_url = $14,
      facebook_url = $15,
      twitter_url = $16,
      instagram_url = $17,
      youtube_url = $18
    WHERE law_firms.id = $19
  `, [
    lawFirmData.name,
    slug,
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

// update review
async function updateReview(reviewData) {
  await db.query(`
    UPDATE reviews
    SET
      comment = $1
    WHERE id = $2
  `, [
    reviewData.comment,
    reviewData.id
  ])
}

// create user's legal guide
async function createLegalGuide(guideData, userId) {
  let slug = slugify(guideData.title, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  const guideResults = await db.query('SELECT slug FROM legal_guides WHERE slug ILIKE $1', [ slug ])
  if (guideResults.rows.length) {
    const slugIndex = guideResults.rows.length
    slug += `-${slugIndex}`
  }

  await db.query(`
    INSERT INTO legal_guides(title, slug, thumbnail_url, content, published, user_id)
    VALUES($1, $2, $3, $4, $5, $6)
  `, [ guideData.title, slug, guideData.thumbnail_url, guideData.content, guideData.published, userId ])
}

// update user's legal guide
async function updateLegalGuide(guideData, userId) {
  let slug = slugify(guideData.title, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'de'
  })

  if (slug.indexOf(guideData.slug) === -1) {
    const guideResults = await db.query('SELECT slug FROM legal_guides WHERE slug ILIKE $1', [ slug ])
    if (guideResults.rows.length) {
      const slugIndex = guideResults.rows.length
      slug += `-${slugIndex}`
    }
  }

  await db.query(`
    UPDATE legal_guides
    SET title = $1, slug = $2, thumbnail_url = $3, content = $4, published = $5
    WHERE id = $6 AND user_id = $7
  `, [ guideData.title, slug, guideData.thumbnail_url, guideData.content, guideData.published, guideData.id, userId ])
}

// delete user's legal guide
async function deleteLegalGuide(legalGuideId, userId) {
  await db.query(`
    DELETE FROM legal_guides
    WHERE legal_guides.id = $1 AND legal_guides.user_id = $2
  `, [ legalGuideId, userId ])
}

// create conversation for user
async function createConversation(conversation, userId) {
  const conversationResults = await db.query(`
    INSERT INTO conversations(subject, from_email, from_phone, from_salutation, from_first_name, from_last_name, recipient_id, user_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `, [ conversation.subject, conversation.from_email, conversation.from_phone, conversation.from_salutation, conversation.from_first_name, conversation.from_last_name, conversation.recipient_id, userId ])

  await db.query(`
    INSERT INTO conversation_messages(text, sent, conversation_id)
    VALUES($1, $2, $3)
  `, [ conversation.text, false, conversationResults.rows[0].id ])

  return conversationResults.rows[0]
}

// mark conversation as read
async function markConversationAsRead(conversationId) {
  await db.query(`
    UPDATE conversations
    SET unread_messages = FALSE
    WHERE id = $1
  `, [ conversationId ])
}

// reply to a conversation
async function replyToConversation(message, conversation, user) {
  await db.query(`
    INSERT INTO conversation_messages(text, sent, conversation_id)
    VALUES($1, $2, $3)
  `, [ message.text, message.sent, conversation.id ])

  if (message.sent) {
    await email.send({
      from: '"Traumanwalt" <support@traumanwalt.com>',
      replyTo: `"Traumanwalt" <c${conversation.id}@parse.traumanwalt.com>`,
      to: conversation.from_email,
      subject: `Neue Nachricht von ${user.job_title} ${user.first_name} ${user.last_name}`,
      html: `${message.text}<br />----------<br />Ihre Antwort auf diese E-Mail wird automatisch an ${user.job_title} ${user.first_name} ${user.last_name} weitergeleitet. Sie haben diese Nachricht erhalten, weil Sie eine Anfrage über Traumanwalt gesendet haben.`
    })
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
  updateReview,
  createLegalGuide,
  updateLegalGuide,
  deleteLegalGuide,
  createConversation,
  markConversationAsRead,
  replyToConversation,
  subscribeToMembership,
  unsubscribeFromMembership
}