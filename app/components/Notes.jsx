import React, { Component } from 'react';
import Note from './Note.jsx';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onEdit: this.props.onEdit,
      onDelete: this.props.onDelete
    };
  }

  render() {
    const notes = this.props.notes;
    return(
      <ul>
        {notes.map(note => <li key={note.id}><Note
          task={note.task}
          onEdit={this.state.onEdit.bind(null, note.id)}
          onDelete={this.state.onDelete.bind(null, note.id)} /></li>)}
      </ul>
    );
  }
}

/**
 * Expose
 */
module.exports = Notes;
