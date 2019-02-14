import { IncomingMessage, ServerResponse } from "http";
import { Tree } from "../utils/tree";

export class Router {

  private routes: Map<string, (req: IncomingMessage, res: ServerResponse) => void>;
  private routerTree: Tree<Router>;

  constructor(
    routes?: Array<{
      identifier: string,
      callback: (req: IncomingMessage, res: ServerResponse) => void,
    }>,
  ) {
    this.routerTree = Tree.getTree("Router")
    this.routes = new Map();
    if (routes !== undefined) {
      routes.forEach((route) => {
        this.routes.set(route.identifier, route.callback);
      });
    }
  }

  public attach(identifier: string, router: Router): Router {
    this.routerTree.insert(identifier, router, this);
    return this;
  }

  public route(identifier: string, callback: (req: IncomingMessage, res: ServerResponse) => void): Router {
    this.routes.set(identifier, callback);
    return this;
  }

  public hasRoute(identifier: string): boolean {
    return this.routes.has(identifier);
  }

  public process(req: IncomingMessage, res: ServerResponse, routeIdentifier: string): void {
    const cb = this.routes.get(routeIdentifier);
    if (cb !== undefined) {
      cb(req, res);
    }
  }
}
