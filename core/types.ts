import http from 'http';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Callback = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage>
) => void;
