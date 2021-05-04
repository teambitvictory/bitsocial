import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';
import Router from '@koa/router';
import mongoose from 'mongoose';
import { createProfile, getProfileByUserId } from './src/lib/services/ProfileService.mjs';
import {
  like, createItem, getLikesForItem, countLikesForItem,
} from './src/lib/services/ItemService.mjs';
import errorHandler from './src/api/middleware/errorHandler.mjs';
import { authenticationHandler, unauthorizedHandler, jwtExtractionHandler } from './src/api/middleware/authenticationHandler.mjs';

mongoose.connect('mongodb://localhost:27017/bitsocial', { useNewUrlParser: true, useUnifiedTopology: true });
const app = new Koa();

app.use(errorHandler());
app.use(unauthorizedHandler());
app.use(authenticationHandler());
app.use(bodyParser());
app.use(jwtExtractionHandler());
app.use(koaHelmet());
app.use(cors());

// TODO Handle auth
const authRouter = new Router();
authRouter.get('/profiles', async (ctx) => {
  ctx.body = [await getProfileByUserId(ctx.state.user.sub)];
});
authRouter.post('/profiles', async (ctx) => {
  await createProfile(ctx.state.user.sub);
  ctx.res.statusCode = 201;
});
authRouter.post('/items', async (ctx) => {
  await createItem(ctx.request.body);
  ctx.res.statusCode = 201;
});
authRouter.post('/items/:itemId/likes', async (ctx) => {
  await like(ctx.state.profile._id, ctx.params.itemId);
  ctx.res.statusCode = 201;
});
authRouter.get('/items/:itemId/likes', async (ctx) => {
  const likes = await getLikesForItem(ctx.params.itemId);
  ctx.body = {
    likedBy: likes,
    numberOfLikes: likes.length,
  };
});
authRouter.get('/items/:itemId/likes/count', async (ctx) => {
  ctx.body = {
    numberOfLikes: await countLikesForItem(ctx.params.itemId),
  };
});

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.listen(3000);
