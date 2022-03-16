const express = require('express');

const apiRoutes = require('./routes/api.js');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type('text').send('Not Found');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

module.exports = app; //for testing
