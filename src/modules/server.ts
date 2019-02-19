import { createServer as createHttpServer, IncomingMessage, Server as HttpServer, ServerResponse } from "http";

import { State } from "../enums";
import { Tree } from "../utils/tree";
import { Router } from "./router";

export class Server {

  private port: number;
  private state: State;
  private server: HttpServer;
  private routerTree: Tree<Router>;

  constructor(opts: any) {

    this.port = opts.port || 8000;
    this.routerTree = Tree.createTree<Router>("Router");

    const mainRouter = new Router()
    mainRouter.route("", (req, res) => {
      res.write("ShineTS Framework v" + require("../../package.json").version);
      res.end();
    });
    this.routerTree.insert("", mainRouter);
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

  /**
   * Adds a route to the default router responding to '/' URL
   * @param callback Callback to execute when URL matches
   */
  public route(callback: (req: IncomingMessage, res: ServerResponse) => void): Server {
    this.routerTree.getNodeByUrl("/")[0].value.route("", callback);
    return this;
  }

  public attach(identifier: string, router: Router): Server {
    this.routerTree.insert(identifier, router, this.routerTree.getNodeByUrl("/").node.value);
    return this;
  }

  private initializeRequestHandler() {
    this.server.on("request", (req: IncomingMessage, res: ServerResponse) => {
      const resolved = this.routerTree.getNodeByUrl(req.url);
      if (resolved != null) {
        resolved.node.value.process(req, res, resolved.remainingPath);
      }
    });
  }
}
