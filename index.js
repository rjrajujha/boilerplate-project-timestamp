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
    let fullDate = time.split('-');
    let yyyy = fullDate[0];
    let mm = fullDate[1];
    let dd = fullDate[2];

    let dateInMilliSec = `${mm}/${dd}/${yyyy} 00:00:00`;
    let date = new Date(dateInMilliSec);
    utcdate = date.toUTCString();
    time = date.getTime();
    res.json({ "unix": time, "utc": utcdate });
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
