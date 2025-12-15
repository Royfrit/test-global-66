const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) 

// logs
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

// rutas
app.use('/api/rates', require('./routes/rates'))
app.use('/api/subscribe', require('./routes/subscribe'))

const PORT = 3001
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))