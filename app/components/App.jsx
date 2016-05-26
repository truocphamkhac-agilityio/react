import AltContainer from 'alt-container';
import React, {Component} from 'react';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddLane = this.handleAddLane.bind(this);
    this.handleEditLane = this.handleEditLane.bind(this);
    this.handleDeleteLane = this.handleDeleteLane.bind(this);
  }

  handleAddLane() {
    LaneActions.create({name: 'New Lane'});
  }

  handleEditLane(id, value) {
    if (!value.trim()) {
      return;
    }

    LaneActions.update({id, value});
  }

  handleDeleteLane(id, e) {
    e.stopPropagation();

    LaneActions.delete(id);
  }

  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.handleAddLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}
        >
          <Lanes
            onEdit={this.handleEditLane}
            onDelete={this.handleDeleteLane} />
        </AltContainer>
      </div>
    );
  }
}

/**
 * Expose
 */
export default App;
