import React, {Component} from 'react';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class Editable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueEdit: this.props.value
    };

    this.finishEdit = this.finishEdit.bind(this);
    this.checkKeySubmit = this.checkKeySubmit.bind(this);
    this.renderEditView = this.renderEditView.bind(this);
    this.renderValueView = this.renderValueView.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.editing ? this.renderEditView() : this.renderValueView()
        }
      </div>
    );
  }

  renderEditView() {
    return (
      <input
        type="text"
        ref={
          (e) => e ? e.selectionStart = this.state.valueEdit.length : null
        }
        autoFocus={true}
        defaultValue={this.state.valueEdit}
        onBlur={this.finishEdit}
        onKeyDown={this.checkKeySubmit} />
    );
  }

  renderValueView() {
    return (
      <div onClick={this.props.onValueClick}>
        {this.props.value} {
          this.props.onDelete ? <span className="btn btn-xs delete" onClick={this.props.onDelete}>x</span> : null
        }
      </div>
    );
  }

  finishEdit(e) {
    const value = e.target.value;

    if (this.props.onEdit) {
      this.props.onEdit(value);
      this.state.valueEdit = value;
    }
  }

  checkKeySubmit(e) {
    if (e.which === ENTER_KEY) {
      this.finishEdit(e);
    } else if (e.which === ESCAPE_KEY) {
      let value = this.state.valueEdit;
      this.props.onEdit(value);
      this.state.valueEdit = value;
    }
  }
}

/**
 * Expose
 */
export default Editable;
