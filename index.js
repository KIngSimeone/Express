const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const courses = [
    { id: 1, name: 'Python'},
    { id: 2, name: 'Java'},
    { id: 3, name: 'Javascript'},
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
    if (!course) return res.status(404).send("The course with the given ID was not found.")

    res.send(course);
});

// Create a course
//app.post('/api/courses', (req,res) => {
    //const schema = Joi.object(
        //{
            //name: Joi.string().min(3).required()
        //}
    
    //);
    //const result = Joi.validate(req.body, schema);
    //console.log(result);

    //if (req.body.name || req.body.name.length < 3) {
        //400 Bad request
        //res.status(400).send("Name is required and Should be minimum 3 Characters")
        //return;
    //}

    //const course = {
        //id: courses.length + 1,
        //name: req.body.name
    //};
    //courses.push(course);
    //res.send(course);
//});

//sample Create course with Joi for Validation
app.post('/api/courses',(req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate({name:req.body.name});
    //console.log(result);

    //Generate error in Postman
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }

    try { 
        const value = schema.validateAsync({
            name: req.body.name
        });
    }
    catch (err) {}
    
    const course = {
        id:courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

//Update a Course
app.put('/api/courses/:id', (req, res) => {
    // Check if course exists, If not return 404
    const course = courses.find( c=> c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.")

    //Validate the course, return 404 if not
    const { error } = validateCourse(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);


    //Update the course and return the course
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}


//Delete A Course
app.delete('/api/courses/:id', (req, res) =>{
     // Check if course exists, If not return 404
     const course = courses.find( c=> c.id === parseInt(req.params.id));
     if (!course) return res.status(404).send("The course with the given ID was not found.")


     //Delete course
     const index = courses.indexOf(course);
     courses.splice(index, 1);

     //Return the course
     res.send(course);
 

})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port${port}....`))
