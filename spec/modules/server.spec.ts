import { expect } from "chai";

import { Server } from "../../src/modules";

describe("Server", () => {

  it("Should export a function", () => {
    expect(Server).to.be.a("function");
  });

  it("Should create an object", () => {
    expect(new Server({ port: 8000 })).to.be.a("object");
  });

  describe("Start()", () => {

    const server = new Server({ port: 8000 });

    it("Should be a function", () => {
      expect(server.start).to.be.a("function");
    });
  });
});
