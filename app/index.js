import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList.jsx';

let allTasks = [
  {_id: 1, text: 'Task 1'},
  {_id: 2, text: 'Task 2'},
  {_id: 3, text: 'Task 3'}
];

ReactDOM.render(
  <TodoList tasks={allTasks} />,
  document.getElementById('main')
);
