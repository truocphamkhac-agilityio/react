import uuid from 'node-uuid';
import React, {Component} from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.storeChanged = this.storeChanged.bind(this);
  }

  storeChanged(state) {
    this.setState(state);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
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
