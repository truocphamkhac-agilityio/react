import React from 'react';
import assert from 'assert';
import {renderIntoDocument, findRenderedDOMComponentWithClass} from 'react-addons-test-utils';
import Editable from '../app/components/Editable.jsx';

describe('Editable', () => {
  it('renders value', () => {
    const value = 'value';
    const component = renderIntoDocument(
      <Editable value={value} />
    );
    const valueComponent = component.props.value;

    assert.equal(valueComponent, value);
  })
});
