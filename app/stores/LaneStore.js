import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

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

  attachToLane(attach) {
    const landId = attach.laneId;
    const note = attach.note;
    const lanes = this.lanes.map(lane => {
      if (lane.id === landId) {
        if (lane.notes.includes(note)) {
          console.warn('Already attached note to lane', lanes);
        } else {
          lane.notes.push(note);
        }
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
