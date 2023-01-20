import { Rapid } from '@core/Rapid';

import { router as usersRouter } from '@src/users/urls';

const PORT = process.env.PORT || 8080;

const rapid = new Rapid();

rapid.registerRouter(usersRouter);
rapid.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} `);
});
