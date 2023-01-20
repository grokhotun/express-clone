import EventEmitter from 'events';
import { Callback, Method } from './types';

export const emitter = new EventEmitter();

export class Router {
  public endpoints: Record<string, Record<Method, Callback> | {}>;

  constructor() {
    this.endpoints = {};
  }

  request(method: Method = 'GET', path: string, callback: Callback) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`${method} already exits on ${path}`);
    }

    endpoint[method] = callback;
    emitter.on(`[${path}]:[${method}]`, (request, response) => {
      callback(request, response);
    });
  }

  get(path: string, callback: Callback) {
    this.request('GET', path, callback);
  }

  post(path: string, callback: Callback) {
    this.request('POST', path, callback);
  }

  put(path: string, callback: Callback) {
    this.request('PUT', path, callback);
  }

  delete(path: string, callback: Callback) {
    this.request('DELETE', path, callback);
  }
}
