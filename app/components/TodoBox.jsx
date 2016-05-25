import * as _ from 'underscore';
import React from 'react';

import TodoList from './TodoList.jsx';
import NewTodoItem from './NewTodoItem.jsx';

let TodoBox = React.createClass({
  getInitialState() {
    return {
      tasks: [
        {_id: 1, text: 'Wake up', complete: true, editing: false},
        {_id: 2, text: 'Eat breakfast', complete: true, editing: false},
        {_id: 3, text: 'Drink beer', complete: false, editing: false}
      ]
    };
  },

  handleNodeRemoval(nodeId) {
    let tasks = this.state.tasks;
    tasks = tasks.filter((task) => {
      return task._id !== nodeId;
    });

    console.log('[info] - Remove task', nodeId);

    this.setState({tasks});
    return;
  },

  handleToggleComplete(nodeId) {
    let tasks= this.state.tasks;

    tasks.forEach(task => {
      if (task._id === nodeId) {
        task.complete = task.complete === true ? false : true;
      }
    });

    console.log('[info] - Toggle task', nodeId);

    this.setState({tasks});
    return;
  },

  handleSaveNode(task, textEditing) {
    let tasks = this.state.tasks;

    tasks.forEach(taskItem => {
      if (taskItem._id === task._id) {
        taskItem.text = textEditing;
      }
    });

    console.log('[info] - Editing task text', textEditing);
    console.log('[info] - tasks', tasks);

    this.setState({tasks});
    return;
  },

  handleSubmit(text) {
    let tasks = this.state.tasks;
    let _id = _.size(tasks) + 1;
    let complete = false;

    console.log('[info] - Add task content', text);

    tasks = tasks.concat([{_id, text, complete}]);
    this.setState({tasks});
  },

  render() {
    return (
      <div className="well">
        <h1 className="vert-offset-top-0">Todo list</h1>
        <TodoList
          tasks={this.state.tasks}
          removeNode={this.handleNodeRemoval}
          toggleComplete={this.handleToggleComplete}
          onSave={this.handleSaveNode} />
        <NewTodoItem onTaskSubmit={this.handleSubmit} />
      </div>
    );
  }
});

/**
 * Expose.
 */
module.exports = TodoBox;
