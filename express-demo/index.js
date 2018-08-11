const startupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const courses = require('./routes/courses')
const home = require('./routes/home')
const app = express();

// console.log(`NODE_ENV ${process.env.NODE_ENV}`);
// console.log(`app ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});
app.use(express.static('public'));
app.use(helmet());
app.use('api/courses', courses);
app.use('/', home);

console.log('App name: ' + config.get('name'));
console.log('App server: ' + config.get('mail.host'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebug('morgan enabled...');
}

dbDebug('Database connecting...');

const port = process.env.PORT || 9555;
app.listen(port, () => console.log(`Listening on port ${port}`));