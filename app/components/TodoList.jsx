import * as _ from 'underscore';
import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';
import NewTodoItem from './NewTodoItem.jsx';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
  }

  render() {
    let tasks = this.props.tasks.map((task) => {
      return (
        <TodoItem key={task._id}>
          {task.text}
        </TodoItem>
      );
    });

    return (
      <div className="container">
        <header><h1>Todos list</h1></header>
        <ul>
          {tasks}
        </ul>
        <NewTodoItem addEvent={this.addEvent} />
      </div>
    );
  }

  addEvent(taskObject) {
    let tasks = this.props.tasks;
    let length = _.size(tasks);

    taskObject._id = length + 1;

    tasks.push(taskObject);

    console.log(tasks);

    this.setState({tasks});
  }
}
