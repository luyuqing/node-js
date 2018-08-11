const startupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
<<<<<<< HEAD
const logger = require('./logger');
||||||| merged common ancestors
=======
const logger = require('./middleware/logger');
>>>>>>> e7939234a2a0433c3a6d89e7674322d7d7a86cbd
const express = require('express');
const courses = require('./routes/courses')
const home = require('./routes/home')
const app = express();

<<<<<<< HEAD
app.use(express.json());
app.use(logger);
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});
app.use(express.static('public'));

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// });

// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// });
||||||| merged common ancestors
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// });

// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// });
=======
// console.log(`NODE_ENV ${process.env.NODE_ENV}`);
// console.log(`app ${app.get('env')}`);
>>>>>>> e7939234a2a0433c3a6d89e7674322d7d7a86cbd

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