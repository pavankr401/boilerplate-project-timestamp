// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// to check empty date request
app.get("/api", function(req, res){
  
  res.json({unix: Date.now(),
           utc: new Date()})
})

// check valid date or not
app.get("/api/:date", function(req, res){
  let dateString = req.params.date;
  if(!Date.parse(dateString) && !Number(dateString))
  {
    return res.json({error: "Invalid Date"})
  }
  else if(!/[-]/.test(dateString) && Number(dateString))
  {
    let date = new Date(Number(dateString));
    return res.send({
      unix: date.getTime(), 
      utc: date.toUTCString()});
  }

  let date = new Date(dateString);
  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.status(200).send(result);
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


