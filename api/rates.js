module.exports = async (req, res) => {
  console.log(`[GET] /api/rates ${req.url}`)

  try {
    const url = require('url')
    const { query } = url.parse(req.url, true)

    const base = query.base || 'USD'
    const target = query.target || null

    if (base !== 'USD') {
      res.statusCode = 400
      return res.end(JSON.stringify({ error: 'Base currency not supported' }))
    }

    const data = {
      base: 'USD',
      rates: {
        CLP: 987.62,
        PEN: 3.81
      },
      asOf: '2025-10-31T17:51:00Z'
    }

    if (target && !data.rates[target]) {
      res.statusCode = 404
      return res.end(JSON.stringify({ error: `Target currency ${target} not found` }))
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))

  } catch (err) {
    console.error('Error /api/rates:', err)
    res.statusCode = 500
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}