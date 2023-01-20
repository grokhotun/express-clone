import http from 'http';

export const JSONMiddleware = <T>(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage>
) => {
  Object.assign(response, {
    sendInJSON(payload: T[]) {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });

      return response.end(
        JSON.stringify({
          results: payload,
          length: payload.length
        })
      );
    }
  });
};
