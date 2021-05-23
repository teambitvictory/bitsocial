import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.mjs';
import { authenticationHandler, unauthorizedHandler, jwtExtractionHandler } from './middleware/authenticationHandler.mjs';
import getAuthRouter from './routing/AuthenticatedRoutes.mjs';

const startServer = () => {
  const {
    DB_PROTOCOL = 'mongodb',
    DB_HOST = 'localhost',
    DB_PORT = '27017',
    DB_NAME = 'bitsocial',
  } = process.env;
  mongoose.connect(`${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
  const app = new Koa();

  app.use(errorHandler());
  app.use(unauthorizedHandler());
  app.use(authenticationHandler());
  app.use(bodyParser());
  app.use(jwtExtractionHandler());
  app.use(koaHelmet());
  app.use(cors());

  const authRouter = getAuthRouter();
  app.use(authRouter.routes());
  app.use(authRouter.allowedMethods());

  const port = process.env.PORT || 3000;
  app.listen(port);
  // eslint-disable-next-line
  console.log(`bitsocial listening on port ${port}`);
};

export default startServer;
