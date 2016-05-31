import React, { Component } from 'react';

export default class NewTodoItem extends Component {
  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
  }

  componentDidMount() {
    this._input.focus();
  }

  doSubmit(e) {
    e.preventDefault();

    // get text of new task based on text input
    var text = this._input.value.trim();

    if (!text) {
      return;
    }

    this.props.onTaskSubmit(text);
    this._input.value = '';
    return;
  }

  render() {
    return (
      <div className="commentForm vert-offset-top-2">
        <hr />
        <div className="clearfix">
          <form className="form-horizontal todoForm" onSubmit={this.doSubmit}>
            <div className="form-group new-task-group">
              <input id="task" className="form-control" type="text" ref={(c) => this._input = c} placeholder="What do you need to do?" />
            </div>
            <div className="row">
              <div className="col-md-10 col-md-offset-2 text-right">
                <input className="btn btn-primary" type="submit" value="Save Item" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
