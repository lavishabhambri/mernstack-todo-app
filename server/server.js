const express = require('express');
const app = express();                      // Creating new instance of express
const bodyParser = require('body-parser');  // Middleware
const cors = require('cors');               // Nodejs package 
const mongoose = require('mongoose');
const todoRoutes = express.Router();        // Creating instance of router
const PORT = 4000;

// Database schema
let Todo = require('./todo.model');

// Adding the middlwares
app.use(cors());
app.use(bodyParser.json());

// Connecting Mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// For the list of Todos
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// For a single todo
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// For adding a todo in todo-list
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()       // For saving to DB
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

// For updating a todo in todo-list , here id is passed to know which object to update
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_deadline = req.body.todo_deadline;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// Router
app.use('/todos', todoRoutes);

// Starting server
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});