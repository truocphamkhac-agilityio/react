import * as _ from 'underscore';
import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    // init lanes store
    this.lanes = [];
  }

  create(lane) {
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    const lanes = this.lanes.concat(lane);

    this.setState({lanes});
  }

  update(updateLane) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === updateLane.id) {
        return Object.assign({}, lane, updateLane);
      }

      return lane;
    });

    this.setState({lanes});
  }

  delete(laneId) {
    this.setState({
      lanes: _.reject(this.lanes, lane => {
        return lane.id === laneId;
      })
    });
  }

  attachToLane({laneId, noteId}) {
    if (!noteId) {
      this.waitFor(NoteStore);
      noteId = NoteStore.getState().notes.slice(-1)[0].id;
    }

    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        if (lane.notes.includes(noteId)) {
          console.warn('Already attached note to lane', lanes);
        } else {
          lane.notes.push(noteId);
        }
      }

      return lane;
    });

    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.notes = _.reject(lane.notes, note => {
          return note === noteId;
        });
      }

      return lane;
    });

    this.setState({lanes});
  }
}

/**
 * Expose
 */
export default alt.createStore(LaneStore, 'LaneStore');
