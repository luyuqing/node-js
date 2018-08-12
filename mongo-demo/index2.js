// Validate

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground',{ useNewUrlParser: true })
    .then(() => console.log('Successfully connected to Mongodb...'))
    .catch((err) => console.log('Unable to connect to Mongodb...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        enum: ['web', 'mobile'],
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v.length >= 2;
            },
            message: 'At least 2 tags.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 5,
        max: 250,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 16,
        category: 'web'
    });
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (err) {
        console.log(err.message);
    }
}

createCourse();