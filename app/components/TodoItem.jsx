import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  render() {
    return (
      <li>{this.props.children}</li>
    );
  }
}

TodoItem.propTypes = {
  task: PropTypes.object.isRequired
};
