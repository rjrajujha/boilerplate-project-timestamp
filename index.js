// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  let date = new Date();
  let utcdate = date.toUTCString();
  let time = date.getTime();
  res.json({ "unix": time, "utc": utcdate });
});

app.get('/api/:time', (req, res) => {
  let time = req.params.time;
  let utcdate;
  let timeType = 'date';
  if (parseInt(time) == time) {
    timeType = 'msec';
    time = parseInt(time);
  }
  if (timeType === 'msec') {
    utcdate = new Date(time).toUTCString();
    res.json({ "unix": time, "utc": utcdate });
  }
  else {
    let date = new Date(time);
    utcdate = date.toUTCString();
    time = date.getTime();
    console.log(date);
    if (utcdate === 'Invalid Date') {
      res.json({ error: "Invalid Date" });
    }
    res.json({ "unix": time, "utc": utcdate });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
