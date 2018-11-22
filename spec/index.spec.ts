import { expect } from 'chai';

import * as Shine from '../src/'

describe("Shine", () => {

  it("Should export an object", () => {
    expect(Shine).to.be.a('object')
  })

  it("Should have Server property as function", () => {
    expect(Shine.Server).to.be.a('function')
  })
})
