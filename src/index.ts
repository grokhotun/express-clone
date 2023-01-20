import http from 'http';

const PORT = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
  response.end('Server is working!');
});

server.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} `);
});
