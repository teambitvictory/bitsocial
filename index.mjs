import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';
import Router from '@koa/router';
import mongoose from 'mongoose';
import { createProfile } from './src/lib/services/ProfileService.mjs';
import { like, createItem } from './src/lib/services/ItemService.mjs';
import errorHandler from './src/api/middleware/errorHandler.mjs';

mongoose.connect('mongodb://localhost:27017/bitsocial', { useNewUrlParser: true, useUnifiedTopology: true });
const app = new Koa();

app.use(errorHandler());
app.use(bodyParser());
app.use(koaHelmet());
app.use(cors());

// TODO Handle auth
const authRouter = new Router();
authRouter.get('/profiles', async (ctx) => {
  ctx.body = 'Hi';
});
authRouter.post('/profiles', async (ctx) => {
  ctx.body = await createProfile(ctx.request.body);
});
authRouter.post('/items', async (ctx) => {
  ctx.body = await createItem(ctx.request.body);
});
authRouter.post('/items/:itemId/likes', async (ctx) => {
  ctx.body = await like('Stefan', ctx.params.itemId);
});

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.listen(3000);