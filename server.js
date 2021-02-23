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
  let date_ob = new Date();

  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();

  let data = {
    "Full Url": fullUrl(req),
    "Hostname": req.hostname,
    "Path": req.path,
    "Params": req.params,
    "Queries": req.query,
    "Ip Address": req.ip,
    "Time": hours + ":" + minutes,
  };

  console.log(data);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
});



app.get("/sudoku/api", async function(req, res) {
  let condition = "t";  

  let full = req.query.full == condition;
  //let possibilities = req.query.possibilities == condition;
  let steps = req.query.steps == condition;
  let reduce = req.query.reduce == condition;
  console.log("Conditions set")

  let runs = 1;

  if (req.query.bench == condition) {
    runs = Math.floor(Number(req.query.runs));
  }
  console.log("Runs finished", runs);

  let sendme = {
    "builds": []
  };
  console.log("Sendme created")

  for (let i = 0; i < runs; i += 1){
    let s = new sudoku.Sudoku()
    s.gen();
    console.log("Generated");
    s.pray();
    console.log("Prayed");
    let data = {};
    data.raw_puzzle = s.raw_puzzle;

    data.debug = {};

    /*
    if (possibilities || full) {
      data.debug.possibilities = s.possibilities;
    }
    */
    if (steps || full) {
      data.debug.steps = s.steps;
      data.debug.backsteps = s.backsteps;
    }
    console.log("Steps finished");

    if (reduce || full) {
      data.reduced = s.holy;
      data.difficulty = s.difficulty;
    }
    console.log("Reduction Finished");


    if (Object.keys(data.debug).length == 0) {
      delete data.debug;
    }

    sendme.builds.push(data);
  }

  if (sendme.builds.length == 1) {
    sendme = sendme.builds[0];
  }
  
  console.log("Sudoku finished");

  res.json(sendme);
})

app.use(express.static('frontend/build'));

app.get("/sudoku", function(req, res) {
  return res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.get("/", function(req, res) {
  return res.send('Site Under Construction');
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})
