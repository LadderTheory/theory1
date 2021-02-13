const express = require('express')
const path = require('path');
const { nextTick, send } = require('process');
var url = require('url');

const sudoku = require('./sudoku')

const app = express()
const port = 80

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

app.use(function(req, res, next) {
  let data = {
    "Full Url": fullUrl(req),
    "Hostname": req.hostname,
    "Params": req.params,
    "Queries": req.query,
    "Ip Address": req.ip,
  };

  console.log(data)
  next();
});

app.get("/sudoku", function(req, res) {
  let s = new sudoku.Sudoku()
  s.gen();
  let sendme = {};
  sendme.puzzle = s.raw_puzzle;

  if (req.query.possibilities == "1") {
    sendme.debug = {};
    sendme.debug.possibilities = s.possibilities;
  }
  res.json(sendme);
})

app.use(express.static('frontend'));

app.listen(port, () => {
  console.log(`listening at ${port}`)
})
