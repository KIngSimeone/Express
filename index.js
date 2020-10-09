const express = require('express')
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'Python'},
    { id: 2, name: 'Java'},
    { id: 3, name: 'Javascript'}
];

app.get('/', (req,res) =>{
    res.send('Hello World');
}); 

// Get all courses
app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

// Get single Course
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find( c=> c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID was not found.")
    res.send(course);
});

// Create a course
app.post('api/courses', (req,res) =>{
    const course = {
        id: courses.lenght + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.params);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port${port}....`))
