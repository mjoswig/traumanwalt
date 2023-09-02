const { Pool } = require('pg')

// connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// query database
async function query(text, params) {
  const result = await pool.query(text, params)
  return result
}

module.exports = {
  query
}