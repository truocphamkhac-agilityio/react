import assert from 'assert';
import {expect} from 'chai';

describe('add', () => {
  it('adds', () => {
    assert.equal(1 + 1, 2);
  });
});

describe('true', () => {
  it('should be true', () => {
    expect(true).to.equal(true);
  });
});
