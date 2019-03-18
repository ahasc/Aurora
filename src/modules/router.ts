import { IncomingMessage, ServerResponse } from "http";
import { Tree } from "../utils/tree";

export class Router {

  private routes: Map<string, (req: IncomingMessage, res: ServerResponse) => void>;
  private routerTree: Tree<Router>;

  /**
   * @description Constructor for Router
   * @param       routes Optionnal. Routes to attach to the Router
   * @returns     New Router instance
   */
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

  /**
   * @description Attach a Router as Router's child
   * @param       identifier URL part as prefix for the given Router
   * @param       router The Router instance to attach to the Server
   * @returns     The Router instance on which the Router was attached on
   */
  public attach(identifier: string, router: Router): Router {
    this.routerTree.insert(identifier, router, this);
    return this;
  }

  /**
   * @description     Adds a route to the Router
   * @param           callback  Callback to execute when URL matches
   * @returns         The Router instance on which the route was created on
   */
  public route(identifier: string, callback: (req: IncomingMessage, res: ServerResponse) => void): Router {
    this.routes.set(identifier, callback);
    return this;
  }

  /**
   * @description Checks if the Router has a given route
   * @param       identifier Identifier of the route
   * @returns     True if Router has the given route, false either
   */
  public hasRoute(identifier: string): boolean {
    return this.routes.has(identifier);
  }

  /**
   * @description Delegates request processing to suitable route's callback
   * @param       req Request object
   * @param       res Response object
   * @param       routeIdentifier Identifier of the route to execute
   */
  public process(req: IncomingMessage, res: ServerResponse, routeIdentifier: string): void {
    const cb = this.routes.get(routeIdentifier);
    if (cb !== undefined) {
      cb(req, res);
    }
  }
}
