import React, {Component, PropTypes} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const noteSource = {
  beginDrag(props) {
    console.log('begin dragging note', props);
    return {};
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    console.log('dragging note', sourceProps, targetProps);
  }
};

/**
 * define the collect function
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class Note extends Component {
  render() {
    console.log('::Note::props', this.props);
    const connectDragSource = this.props.connectDragSource;
    const isDragging = this.props.isDragging;

    return connectDragSource(
      <li
        className={this.props.className}
        id={this.props.id}
        key={this.props.id}
        style={{
          opacity: isDragging ? 0.5 : 1
        }}
      >
        {this.props.children}
      </li>
    );
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

/**
 * Expose
 */
export default Note;

module.exports = DragSource(ItemTypes.NOTE, noteSource, collect)(Note);
