import { expect } from 'chai';

import { State } from '../../src/enums'

describe("State", () => {

  it("Should export an object", () => {
    expect(State).to.be.a('object')
  })
})
