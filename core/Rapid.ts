import http from 'http';
import EventEmitter from 'events';

import { Router } from './Router';

export class Rapid {
  private emitter: EventEmitter;
  private server: http.Server;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
  }

  private routeMask(path: string, method: string) {
    return `[${path}]:[${method}]`;
  }

  private createServer() {
    return http.createServer((request, response) => {
      const isEmitted = this.emitter.emit(
        this.routeMask(request.url, request.method),
        request,
        response
      );

      if (!isEmitted) {
        response.end();
      }
    });
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach(url => {
      const endpoint = router.endpoints[url];
      Object.keys(endpoint).forEach(method => {
        const callback = endpoint[method];
        this.emitter.on(this.routeMask(url, method), (request, response) => {
          callback(request, response);
        });
      });
    });
  }

  listen(port: number | string, callback?: () => void) {
    this.server.listen(port, callback);
  }
}
