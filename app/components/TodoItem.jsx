import * as $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editText: this.props.text,
      isEditing: this.props.editing
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.doEditing = this.doEditing.bind(this);
  }

  componentDidUpdate() {
    if(this.state.isEditing) {
      this.refs.inputEdit.focus();
    }
  }

  handleChange(e) {
    this.setState({
      editText: e.target.value
    });
  }

  handleSubmit(e) {
    let value = this.state.editText.trim();

    if (value) {
      this.props.onSave(value);
      this.setState({
        editText: value,
        isEditing: false
      });
    }
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({
        editText: this.props.text,
        isEditing: false
      });
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  }

  doEditing(e) {
    e.preventDefault();

    this.setState({
      isEditing: this.state.isEditing == true ? false : true
    });
  }

  render() {
    let classes = 'list-group-item clearfix';

    if (this.props.complete && !this.state.isEditing) {
      classes = classes + ' list-group-item-success';
    }

    if (this.state.isEditing) {
      classes = classes + ' list-group-item-warning';
      return (
        <li className={classes}>
          <input className="form-control" type="text" ref="inputEdit"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </li>
      );
    } else {
      return (
        <li className={classes}>
          {this.props.text}
          <div className="pull-right" role="group">
            <button className="btn btn-sm btn-warning img-circle" type="button" onClick={this.doEditing}><i className="glyphicon glyphicon-pencil"></i></button>
            <button className="btn btn-sm btn-success img-circle" type="button" onClick={this.props.toggleComplete}><i className="glyphicon glyphicon-ok"></i></button>
            <button className="btn btn-sm btn-danger img-circle" type="button" onClick={this.props.removeNode}><i className="glyphicon glyphicon-remove"></i></button>
          </div>
        </li>
      );
    }
  }
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  nodeId: PropTypes.number.isRequired
};

/**
 * Expose
 */
export default TodoItem;
