var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors')
    utils = require('./client/scripts/serverUtils.js'),
    app = express(),
    PORT = process.env.PORT || 3000;


/** Middleware **/

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

var https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};

app.use(https_redirect);
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


app.get('/', function(req, res){
  res.send('Hello World!');
});

app.listen(PORT, function(){
  console.log('Listening on port '.concat(PORT));
});
