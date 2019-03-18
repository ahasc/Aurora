import { expect } from "chai";

import * as Utils from "../../src/utils";

describe("Utils", () => {

  it("Should export an object", () => {
    expect(Utils).to.be.a("object");
  });

  it("Should have Tree property as function", () => {
    expect(Utils.Tree).to.be.a("function");
  });
});
