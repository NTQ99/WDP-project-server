const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
const logger = require('morgan');
const gitRouters = require('./app/routes/github-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//my route
app.get('/', function (req, res) {
  res.json({ message: "Welcome to WDP" });
});

app.use('/git', gitRouters);


app.set('port', process.env.PORT || 80);
const server = app.listen(app.get('port'),"0.0.0.0", () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

exports.server = functions.https.onRequest(app);