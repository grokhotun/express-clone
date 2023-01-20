import { Router } from '@core/Router';

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
  response.sendInJSON(users);
});

router.post('/users', (request, response) => {
  console.log(response.body);
  response.sendInJSON(users);
});

export { router };
