import { expect } from 'chai';

import Aurora from '../src/aurora'

describe("Aurora", function () {
  it("Should export an object", function () {
    expect(Aurora).to.be.a('object');
  });
});
