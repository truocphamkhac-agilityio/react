import React, {Component} from 'react';
import Lane from './Lane.jsx';

class Lanes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lanes">
        {this.props.lanes.map(lane => <Lane className="lane" key={lane.id} lane={lane} />)}
      </div>
    );
  }
}

/**
 * Expose
 */
export default Lanes;
