import { createServer as createHttpServer, Server as HttpServer, IncomingMessage, ServerResponse } from "http";

import { State } from '../enums'

export class Server {

  private _port: number
  private _state: State
  private _server: HttpServer

  constructor(opts: any) {

    this._port = opts.port
  }

  async start(): Promise<void> {

    try {
      if (!this._server)
        this._server = createHttpServer()

      this._server.listen(this._port, () => {
        this._state = State.LISTENNING
        console.info(`Server is listenning  on port ${this._port}`)
        this._server.on('request', (req: IncomingMessage, res: ServerResponse) => {
          res.write("alive !")
          res.end()
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  async stop() {
    if (this._state != (State.FAILED | State.STOPPED)) {
      try {
        this._server.close(() => {
          console.info("Server shutdown")
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
