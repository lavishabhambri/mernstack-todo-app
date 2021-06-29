import render from 'dom-serializer';
import React, {Component} from 'react';
import axios from 'axios';


export default class CreateTodo extends Component{
    constructor(props) {
        super(props);
        
        // Binding to this object so that we can use the state object
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            todo_description: '',   // Description of the todo-task
            todo_responsible: '',   // Who is responsible for performing the task
            todo_priority: '',      // Priority of the todo-task (low/medium/high)
            todo_completed: false   // Whether the task is completed or not
        }
    }

    // Changing the properties of Todo list on click.
    onChangeTodoDescription(e){
        this.setState({
            todo_description: e.target.value
        })
    }


    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible: e.target.value
        })
    }

    onChangeTodoPriority(e){
        this.setState({
            todo_priority: e.target.value
        })
    }

    onSubmit(e) {
        // Preventing the default behaviour of the browser when we submit the form.
        e.preventDefault();
        
        // Submit logic
        console.log('Form submitted');
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        // Creating a new todo object
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        // Make a call using axios library
        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

            
        // Resetting all the values
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        });
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>

                {/* Creating form to collect input from user */}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    // Checking if the priority = Low
                                    checked={this.state.todo_priority==='Low'}  
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    // Checking if the priority = Medium
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    // Checking if the priority = High
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}