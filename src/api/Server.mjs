import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.mjs';
import { authenticationHandler, unauthorizedHandler, jwtExtractionHandler } from './middleware/authenticationHandler.mjs';
import getAuthRouter from './routing/AuthenticatedRoutes.mjs';

const startServer = () => {
  mongoose.connect('mongodb://localhost:27017/bitsocial', { useNewUrlParser: true, useUnifiedTopology: true });
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

  app.listen(3000);
};

export default startServer;
