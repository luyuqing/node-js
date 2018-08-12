const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground',{ useNewUrlParser: true })
    .then(() => console.log('Successfully connected to Mongodb...'))
    .catch((err) => console.log('Unable to connect to Mongodb...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({name: 1}) // 1 for ascend, -1 for descend
        .select({name: 1, tags: 1});
    console.log(courses);
}

/*
// query first
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return; 
    course.isPublished = true;
    course.author = 'AAA author';
    const result = await course.save();
    console.log(result);
}
*/

// update first
// async function updateCourse(id) {
//     const result = await Course.update({ _id: id }, {
//         $set: {
//             author:  'Mosh',
//             isPublished: false
//         }
//     });
//     console.log(result);
// }
async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author:  'Jiajia',
            isPublished: true
        }
    }, {new: true});
    console.log(course);
}

async function deleteCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// createCourse();
// getCourses();
// updateCourse('5b6ef1415c240128de7242ee');
// deleteCourse('5b6ef1415c240128de7242ee');
