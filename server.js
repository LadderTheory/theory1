const express = require('express')
const app = express()
const path = require('path');
const { nextTick } = require('process');
const port = 3000

var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

app.use(function(req, res, next) {
  console.log(fullUrl(req));
  console.log(req.ip);
  next();
});

app.use(express.static('frontend'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})