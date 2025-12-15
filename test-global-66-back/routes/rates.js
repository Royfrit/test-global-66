const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log("[GET] /api/rates", req.query)

  const { base = "USD", target } = req.query

  if (base !== "USD") {
    return res.status(400).json({ error: "Base currency not supported" })
  }

  const data = {
    base: "USD",
    rates: {
      CLP: 987.62,
      PEN: 3.81
    },
    asOf: "2025-10-31T17:51:00Z"
  }

  if (target && !data.rates[target]) {
    return res.status(404).json({ error: `Target currency ${target} not found` })
  }

  return res.json(data)
})

module.exports = router