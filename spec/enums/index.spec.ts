import { expect } from "chai";

import * as Enums from "../../src/enums";

describe("Enums", () => {

  it("Should export an object", () => {
    expect(Enums).to.be.a("object");
  });

  it("Should have State property an object", () => {
    expect(Enums.State).to.be.a("object");
  });
});
