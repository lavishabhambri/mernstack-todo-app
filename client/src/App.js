import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import CreateTodo from './components/create-todo.component';
import EditTodo from './components/edit-todo.component';
import TodosList from './components/todos-list.component';

import logo from "./logo.png"

class App extends Component {
  render () {
    return (
      <Router>
        <div className="container">

          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#" target="_blank">
              <img src={logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>




          {/* Adding routes */}
          <Route path="/" exact component={ TodosList }></Route>
          <Route path="/edit/:id" component={ EditTodo }></Route>
          <Route path="/create" component={ CreateTodo }></Route>
        </div>
      
      </Router>
    );
  }
}

export default App;
