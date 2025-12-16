require('dotenv').config()

const express = require('express')
const router = express.Router()
const { google } = require('googleapis')

const credentials = {
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  universe_domain: 'googleapis.com',
}

router.post('/', async (req, res) => {
  console.log('[POST] /api/subscribe', req.body)

  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, new Date().toISOString()]],
      },
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Google API error:', err.response?.data || err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
