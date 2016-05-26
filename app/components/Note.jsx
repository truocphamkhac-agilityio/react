import React, {Component} from 'react';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.renderEdit = this.renderEdit.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.doEdit = this.doEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkKeySubmit = this.checkKeySubmit.bind(this);
  }

  doEdit() {
    // change to edit mode
    this.setState({
      editing: true
    });
  }

  finishEdit(e) {
    const value = e.target.value;

    if (this.props.onEdit) {
      this.props.onEdit(value);
      this.setState({
        editing: false
      });
    }
  }

  checkKeySubmit(e) {
    if (e.which === ENTER_KEY) {
      this.finishEdit(e);
    } else if (e.which === ESCAPE_KEY) {
      this.setState({
        editing: false
      });
    }
  }

  renderEdit() {
    return (
      <input type="text"
        ref={
          (e) => e ? e.selectionStart = this.props.task.length : null
        }
        autoFocus={true}
        defaultValue={this.props.task}
        onBlur={this.finishEdit}
        onKeyDown={this.checkKeySubmit} />
    );
  }

  renderNote() {
    return (
      <div onClick={this.doEdit}>{this.props.task}</div>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
}

/**
 * Expose
 */
export default Note;
