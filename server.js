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


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/games', (req, res) => {
    var options = {
      url: 'http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json'
    };
    request(options, (err, response, body) => {
      if (err) {
        console.log(err);
      }
      var gameData = JSON.parse(body);
      res.send(gameData);
    });
});

app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});
