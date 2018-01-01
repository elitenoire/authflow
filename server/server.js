const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const models = require('./models');
const authRouter = require('./routes/authRouter')
const { MONGO_URI } = require('./config')

const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

// logger
app.use(morgan('dev'))
// tell the app to parse HTTP body messages and Html Form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json() );


// tell the app to look for static files in these directories
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// authentication route handler
app.use('/auth', authRouter)


if (process.env.NODE_ENV === 'production') {
  //serve index.html for unrecognized route -> react-router
  const path = require('path')
  app.get('*' , (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app;
