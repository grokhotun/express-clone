import EventEmitter from 'events';

const emitter = new EventEmitter();

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Callback = <T>(...args: T[]) => void;

export class Router {
  private endpoints: Record<string, Record<Method, Callback> | {}>;

  constructor() {
    this.endpoints = {};
  }

  request(method: Method = 'GET', path: string, handler: Callback) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`${method} already exits on ${path}`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (request, response) => {
      handler(request, response);
    });
  }
}
