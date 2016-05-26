import uuid from 'node-uuid';
import React, {Component} from 'react';
import Notes from './Notes.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {id: uuid.v4(), task: 'Wake up'},
        {id: uuid.v4(), task: 'Breakfast'},
        {id: uuid.v4(), task: 'Drink beer'}
      ]
    };

    this.addNote = this.addNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  addNote() {
    let notes = this.state.notes.concat([
      {
        id: uuid.v4(),
        task: 'New task1111'
      }
    ]);

    this.setState({notes});
  }

  handleEditNote(id, value) {
    if (!value.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if (note.id === id) {
        note.task = value;
      }

      return note;
    });

    this.setState({notes});
  }

  handleDeleteNote(id) {
    if (!id) {
      return;
    }

    const notes = this.state.notes.filter(note => {
      return note.id !== id;
    });

    this.setState({notes});
  }

  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={this.state.notes}
          onEdit={this.handleEditNote}
          onDelete={this.handleDeleteNote} />
      </div>
    );
  }
}

/**
 * Expose
 */
export default App;
