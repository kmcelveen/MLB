var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors'),
  utils = require('./client/scripts/serverUtils.js'),
  PORT = process.env.PORT || 3000;

var httpsRedirect = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

/** Middleware **/

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(httpsRedirect);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});
