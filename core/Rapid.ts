import http from 'http';
import EventEmitter from 'events';

import { Router } from './Router';
import { MiddleWare } from '@core/types';

export class Rapid {
  private emitter: EventEmitter;
  private server: http.Server;
  private middlewares: MiddleWare[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.middlewares = [];
  }

  private routeMask(path: string, method: string) {
    return `[${path}]:[${method}]`;
  }

  private createServer() {
    return http.createServer((request, response) => {
      let body = '';

      request.on('data', chunk => {
        body += chunk;
      });

      request.on('end', () => {
        if (body) {
          // @ts-ignore
          response.body = JSON.parse(body);
        }

        const isEmitted = this.emitter.emit(
          this.routeMask(request.url, request.method),
          request,
          response
        );

        if (!isEmitted) {
          response.end();
        }
      });
    });
  }

  registerRouter(router: Router) {
    Object.keys(router.endpoints).forEach(url => {
      const endpoint = router.endpoints[url];
      Object.keys(endpoint).forEach(method => {
        this.emitter.on(this.routeMask(url, method), (request, response) => {
          const callback = endpoint[method];
          this.middlewares.forEach(middleware => middleware(request, response));
          callback(request, response);
        });
      });
    });
  }

  listen(port: number | string, callback?: () => void) {
    this.server.listen(port, callback);
  }

  use(middleware: MiddleWare) {
    this.middlewares.push(middleware);
  }
}
