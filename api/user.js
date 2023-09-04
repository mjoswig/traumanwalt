const slugify = require('slugify')
const db = require('./db')

// create user
async function create(firebaseUid, salutation, academicTitle, firstName, lastName, addressLine, postalCode, city, country) {
  const username = slugify(`${firstName} ${lastName}`, {
    remove: /[*+~.()'"!:@]/g,
    lower: true
  })

  await db.query(`
    INSERT INTO users(
      firebase_uid, username, salutation, academic_title, first_name, last_name,
      address_line, postal_code, city, country
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [
    firebaseUid, username, salutation, academicTitle, firstName, lastName,
    addressLine, postalCode, city, country
  ])

  return {
    success: true
  }
}

// update user
async function update(email, firebaseUid) {
  await db.query(`
    UPDATE users
    SET
      email = $1
    WHERE firebase_uid = $2
  `, [ email, firebaseUid ])
}

module.exports = {
  create,
  update
}