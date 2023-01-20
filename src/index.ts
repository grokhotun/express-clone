import { Rapid } from '@core/Rapid';
import { Router } from '@core/Router';

const PORT = process.env.PORT || 8080;

const router = new Router();
const rapid = new Rapid();

router.get('/login', (request, response) => {
  response.end('You has sent request to login');
});

router.get('/logout', (request, response) => {
  response.end('You has sent request to logout');
});

rapid.addRouter(router);

rapid.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} `);
});
