import React, { Component } from 'react';

export default class NewTodoItem extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this._input.focus();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref={(c) => this._input = c} type="text" />
      </form>
    );
  }

  onSubmit(ev) {
    ev.preventDefault();

    var text = this._input.value;

    this.props.addEvent({text});
    this._input.value = '';
  }
}
