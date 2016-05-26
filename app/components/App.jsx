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

  render() {
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes
          notes={this.state.notes}
          onEdit={this.handleEditNote} />
      </div>
    );
  }
}

/**
 * Expose
 */
export default App;
