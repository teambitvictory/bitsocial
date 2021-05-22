import Router from '@koa/router';
import {
  getFriends,
  updateFriendRequest, removeFriendship, createFriendRequest, getOpenFriendRequests,
} from '../../lib/services/FriendService.mjs';

import {
  getLikesForItem, createItem, like, getLikesForUser,
} from '../../lib/services/ItemService.mjs';

import { createUser } from '../../lib/services/UserService.mjs';

const getAuthRouter = () => {
  const authRouter = new Router();

  // Users
  authRouter.get('/me', async (ctx) => {
    ctx.body = ctx.state.user;
  });
  authRouter.get('/me/likes', async (ctx) => {
    ctx.body = await getLikesForUser(ctx.state.user);
  });
  authRouter.post('/users', async (ctx) => {
    await createUser(ctx.state.jwtPayload.sub);
    ctx.res.statusCode = 201;
  });

  // Friends
  authRouter.get('/me/friends', async (ctx) => {
    ctx.body = await getFriends(ctx.state.user);
  });
  authRouter.delete('/me/friends/:friendshipId', async (ctx) => {
    await removeFriendship(ctx.state.user, ctx.params.friendshipId);
    ctx.res.statusCode = 204;
  });
  authRouter.get('/me/friends/requests', async (ctx) => {
    ctx.body = await getOpenFriendRequests(ctx.state.user);
  });
  authRouter.post('/me/friends/requests/:requestId', async (ctx) => {
    await updateFriendRequest(ctx.state.user, ctx.params.requestId, ctx.request.body);
    ctx.res.statusCode = 204;
  });
  authRouter.post('/users/:otherUserId/friends', async (ctx) => {
    await createFriendRequest(ctx.state.user, ctx.params.otherUserId);
    ctx.res.statusCode = 201;
  });

  // Items
  authRouter.post('/items', async (ctx) => {
    await createItem(ctx.request.body);
    ctx.res.statusCode = 201;
  });

  // Likes
  authRouter.post('/items/:itemId/likes', async (ctx) => {
    await like(ctx.state.user, {
      ...ctx.request.body,
      itemId: ctx.params.itemId,
    });
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
    const likes = await getLikesForItem(ctx.params.itemId);
    ctx.body = {
      numberOfLikes: likes.length,
    };
  });

  return authRouter;
};

export default getAuthRouter;
