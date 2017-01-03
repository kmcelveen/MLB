var express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  path = require('path'),
  cors = require('cors'),
  utils = require('./client/scripts/serverUtils.js'),
  app = express(),
  PORT = process.env.PORT || 3000;

/** Middleware **/

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(utils.httpsRedirect());
/** Custom Setup for parsing the body of the request **/

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });

/** Error handling **/

// app.use(methodOverride());
// app.use(utils.logErrors);
// app.use(utils.clientSideErrorHandler);
// app.use(utils.errorHandler);
// app.all('*', function(req, res, next) {
//        res.header("Access-Control-Allow-Origin", "*");
//        res.header("Access-Control-Allow-Headers", "X-Requested-With");
//        res.header('Access-Control-Allow-Headers', 'Content-Type');
//        next();
// });
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/games', (req, res) => {
    var options = {
      url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json&callback=?"
    };
    request(options, (err, response, body) => {
      if(err){
        console.log(err);
      }
      var gameData = JSON.parse(body);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.writeHead(200);
      res.send(gameData);
    });
});

app.listen(PORT, function () {
  console.log('Listening on port '.concat(PORT));
});
