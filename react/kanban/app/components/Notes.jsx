import React, { Component } from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onEdit: this.props.onEdit,
      onDelete: this.props.onDelete,
      onValueClick: this.props.onValueClick
    };
  }

  render() {
    const notes = this.props.notes;
    return(
      <ul className="notes">
        {
          notes.map(note =>
            <Note
              className="note"
              id={note.id}
              key={note.id}
            >
              <Editable
                editing={note.editing}
                value={note.task}
                onValueClick={this.state.onValueClick.bind(null, note.id)}
                onEdit={this.state.onEdit.bind(null, note.id)}
                onDelete={this.state.onDelete.bind(null, note.id)}
              />
            </Note>
          )
        }
      </ul>
    );
  }
}

/**
 * Expose
 */
module.exports = Notes;
