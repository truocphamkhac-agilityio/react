import * as $ from 'jquery';
import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  render() {
    let classes = 'list-group-item clearfix';

    if (this.props.complete) {
      classes = classes + ' list-group-item-success';
    }

    return (
      <li className={classes}>
        {this.props.text}
        <div className="pull-right" role="group">
          <button className="btn btn-xs btn-success img-circle" type="button" onClick={this.props.toggleComplete}>&#x2713;</button>
          <button className="btn btn-xs btn-danger img-circle" type="button" onClick={this.props.removeNode}>&#xff38;</button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  nodeId: PropTypes.number.isRequired
};
