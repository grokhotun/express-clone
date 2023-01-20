import http from 'http';
import { Router, emitter } from './Router';

const PORT = process.env.PORT || 8080;

const router = new Router();

router.get('/login', (request, response) => {
  response.end('You has sent request to login');
});

router.get('/logout', (request, response) => {
  response.end('You has sent request to logout');
});

const server = http.createServer((request, response) => {
  emitter.emit(`[${request.url}]:[${request.method}]`, request, response);
});

server.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} `);
});
