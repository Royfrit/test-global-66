const express = require('express')
const router = express.Router()
const { google } = require('googleapis')

router.post('/', async (req, res) => {
  console.log("[POST] /api/subscribe", req.body)

  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './google/creds.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })

    await sheets.spreadsheets.values.append({
      spreadsheetId: 'TU_SHEET_ID',
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, new Date().toISOString()]]
      }
    })

    return res.json({ success: true })

  } catch (err) {
    console.error("Google API error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router