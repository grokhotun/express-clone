import { Rapid } from '@core/Rapid';
import { JSONMiddleware } from '@core/middlewares';

import { router as usersRouter } from '@src/users/urls';

const PORT = process.env.PORT || 8080;

const rapid = new Rapid();

rapid.registerRouter(usersRouter);
rapid.use(JSONMiddleware);

rapid.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} `);
});
