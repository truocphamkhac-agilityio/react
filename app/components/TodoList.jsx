import * as _ from 'underscore';
import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  removeNode(nodeId) {
    this.props.removeNode(nodeId);
    return;
  }

  toggleComplete(nodeId) {
    this.props.toggleComplete(nodeId);
    return;
  }

  render() {
    let tasks = this.props.tasks.map((task) => {
      return (
        <TodoItem
          key={task._id}
          nodeId={task._id}
          text={task.text}
          complete={task.complete}
          removeNode={this.removeNode.bind(this, task._id)}
          toggleComplete={this.toggleComplete.bind(this, task._id)} />
      );
    });

    return (
      <ul className="list-group">
        {tasks}
      </ul>
    );
  }
}
