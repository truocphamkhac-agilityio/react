import AltContainer from 'alt-container';
import React, {Component} from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleAddNote() {
    NoteActions.create({task: 'New Task'});
  }

  handleEditNote(id, value) {
    if (!value.trim()) {
      return;
    }

    NoteActions.update({id, value});
  }

  handleDeleteNote(id, e) {
    e.stopPropagation();

    NoteActions.delete(id);
  }

  render() {
    return (
      <div>
        <button className="add-note" onClick={this.handleAddNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
        >
          <Notes
            onEdit={this.handleEditNote}
            onDelete={this.handleDeleteNote} />
        </AltContainer>
      </div>
    );
  }
}

/**
 * Expose
 */
export default App;
