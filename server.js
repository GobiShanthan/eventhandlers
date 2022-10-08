const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


require('dotenv').config();
require('./config/database');
require('./config/passport');

app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: 'EventHandlers',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));





app.use('/api/users', require('./routes/users'));



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

