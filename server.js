var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors')
    utils = require('./client/serverUtils.js'),
    app = express(),
    PORT = process.env.port || 3000;


/**Middleware**/
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());


// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });

// app.use(methodOverride());
// app.use(utils.logErrors);
// app.use(utils.clientSideErrorHandler);
// app.use(utils.errorHandler);


app.get('/', function(req, res){
  res.send('Hello World!');
})

app.listen(PORT, function(){
  console.log('Listening on port '.concat(PORT));
})
