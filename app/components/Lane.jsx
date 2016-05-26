import AltContainer from 'alt-container';
import React, {Component, PropTypes} from 'react';

import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

class Lane extends Component {
  constructor(props) {
    super(props);

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleAddNote() {
    const lane = this.props.lane;
    const note = NoteActions.create({task: 'New Task'});

    LaneActions.attachToLane({
      laneId: lane.id,
      noteId: note.id
    });
  }

  handleEditNote(id, task) {
    if (!task) {
      return;
    }

    NoteActions.update({id, task});
  }

  handleDeleteNote(id, e) {
    e.stopPropagation();

    LaneActions.detachFromLane({
      laneId: this.props.lane.id,
      noteId: id
    });

    NoteActions.delete(id);
  }

  render() {
    const lane = this.props.lane;

    return (
      <div>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.handleAddNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >
          <Notes
            onEdit={this.handleEditNote}
            onDelete={this.handleDeleteNote}
          />
        </AltContainer>
      </div>
    );
  }
}

Lane.propTypes = {
  lane: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    notes: PropTypes.array
  }).isRequired
};

Lane.defaultProps = {
  name: '',
  notes: []
};

/**
 * Expose
 */
export default Lane;
