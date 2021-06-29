import render from 'dom-serializer';
import React, {Component} from 'react';
import axios from 'axios';


export default class EditTodo extends Component{

    constructor(props) {
        super(props);

        // Binding this object so as to use state object
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false  // initially tood is not completed
        }
    }

    // Get post with backend
    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                
            </div>
        )
    }
}