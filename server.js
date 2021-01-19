const express = require('express')
const app = express()
const path = require('path');
const port = 3000

app.get('/', (req, res) => {
  res.redirect("../tyler");
})

app.get('/tyler', function(req, res) {
  res.sendFile(path.join(__dirname + '/tyler.html'));
});

app.get('/raildex', function(req, res) {
  res.sendFile(path.join(__dirname + '/raildex.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
