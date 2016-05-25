import uuid from 'node-uuid';
import React, {Component} from 'react';
import Note from './Note.jsx';

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

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <ul>
          {notes.map(note => <li key={note.id}>{note.task}</li>)}
        </ul>
      </div>
    );
  }
}

/**
 * Expose
 */
export default App;
