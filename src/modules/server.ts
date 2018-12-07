import { createServer as createHttpServer, IncomingMessage, Server as HttpServer, ServerResponse } from "http";

import { State } from "../enums";

export class Server {

  private port: number;
  private state: State;
  private server: HttpServer;

  constructor(opts: any) {

    this.port = opts.port;
  }

  public async start(): Promise<void> {

    try {
      if (!this.server) {
        this.server = createHttpServer();
      }

      this.server.listen(this.port, () => {
        this.state = State.LISTENNING;
        console.info(`Server is listenning  on port ${this.port}`);
        this.server.on("request", (req: IncomingMessage, res: ServerResponse) => {
          res.write("alive !");
          res.end();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async stop() {
    if (this.state !== State.FAILED && this.state !== State.STOPPED) {
      try {
        this.server.close(() => {
          console.info("Server shutdown");
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}
