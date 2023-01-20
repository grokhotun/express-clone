import http from 'http';

export type SendInJSON = <T>(payload: T) => { results: T[]; length: number };
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Callback = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    sendInJSON: SendInJSON;
    body?: any;
  }
) => void;

export type MiddleWare = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage>
) => void;
