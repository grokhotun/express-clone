import http from 'http';

export const useJSONSerializer = <T>(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage>
) => {
  return {
    ...response,
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
  };
};
