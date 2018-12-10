import { createServer as createHttpServer, IncomingMessage, Server as HttpServer, ServerResponse } from "http";

import { State } from "../enums";

export class Server {

  private port: number;
  private state: State;
  private server: HttpServer;
  private routes: Map<string, (req, res) => void>;

  constructor(opts: any) {

    this.port = opts.port;
    this.routes = new Map();
  }

  public async start(): Promise<Server> {

    try {
      if (!this.server) {
        this.server = createHttpServer();
      }

      this.server.listen(this.port, () => {
        this.state = State.LISTENNING;
        this.initializeRequestHandler();
        console.info(`Server is listenning  on port ${this.port}`);
      });
    } catch (e) {
      console.error(e);
    }
    return this;
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

  public route(path: string, cb: (req, res) => void): void {
    this.routes.set(path, cb);
  }

  private initializeRequestHandler() {
    this.server.on("request", (req: IncomingMessage, res: ServerResponse) => {
      if (this.routes.has(req.url)) {
        this.routes.get(req.url)(req, res);
      }
    });
  }
}
