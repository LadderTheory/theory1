const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listehttps://runkit.com/n(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})