const { SCHED_NONE } = require('cluster');
const express = require('express')
const path = require('path');
const { nextTick, send } = require('process');
var url = require('url');
const cors = require('cors');

const sudoku = require('./sudoku')

const app = express()
const port = 80
const construction = "This page is under construction";

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
  res.send(construction)
});

app.get("/sudoku/api", function(req, res) {
  let condition = "t";  

  let full = req.query.full == condition;
  let possibilities = req.query.possibilities == condition;
  let steps = req.query.steps == condition;

  let runs = 1;

  if (req.query.bench == condition) {
    runs = Math.floor(Number(req.query.runs));
  }

  let sendme = {
    "builds": []
  };

  for (let i = 0; i < runs; i += 1){
    let s = new sudoku.Sudoku()
    s.gen();
    let data = {};
    data.puzzle = s.raw_puzzle;

    data.debug = {};

    if (possibilities || full) {
      data.debug.possibilities = s.possibilities;
    }
    if (steps || full) {
      data.debug.steps = s.steps;
      data.debug.backsteps = s.backsteps;
    }

    if (Object.keys(data.debug).length == 0) {
      delete data.debug;
    }

    sendme.builds.push(data);
  }

  if (sendme.builds.length == 1) {
    sendme = sendme.builds[0];
  }
  
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.json(sendme);
})

app.use(express.static('frontend/build'));

app.get("/", function(req, res) {
  return res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})
