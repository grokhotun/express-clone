import { Router } from '@core/Router';
import { useJSONSerializer } from '@core/utils';

const router = new Router();

const users = [
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Mike'
  },
  {
    id: 3,
    name: 'Sam'
  },
  {
    id: 4,
    name: 'Dany'
  }
];

router.get('/users', (request, response) => {
  useJSONSerializer(request, response).sendInJSON(users);
});

router.post('/users', (request, response) => {
  useJSONSerializer(request, response).sendInJSON(users);
});

export { router };
