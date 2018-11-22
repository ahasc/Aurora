import { expect } from 'chai';

import * as Modules from '../../src/modules'

describe("Modules", () => {

  it("Should export an object", () => {
    expect(Modules).to.be.a('object')
  })

  it("Should have Server property as function", () => {
    expect(Modules.Server).to.be.a('function')
  })
})
