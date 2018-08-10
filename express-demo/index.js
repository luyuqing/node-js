const Joi = require('joi');
const express = require('express');
const app = express();

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

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('No name or name length < 3.');
    //     return;
    // }
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    // console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found.');

    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    } else {
        course.name = req.body.name;
        res.send(course);
    };

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course not found.');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(9555, () => console.log('Listening on port 9555'));