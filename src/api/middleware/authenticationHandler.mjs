import { koaJwtSecret } from 'jwks-rsa';
import jwt from 'koa-jwt';
import { getUserById } from '../../lib/services/UserService.mjs';

const authenticationHandler = () => jwt({
  secret: koaJwtSecret({
    jwksUri: 'http://localhost:1672/system/jwk',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 18000000, // 5 hour
  }),
  key: 'jwtPayload',
  audience: 'bitsocial',
  issuer: 'auth.habyte.com',
});

const jwtExtractionHandler = () => async (ctx, next) => {
  const user = await getUserById(ctx.state.jwtPayload.sub);
  ctx.state.user = user;
  await next();
};

const unauthorizedHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  }
};

export { authenticationHandler, unauthorizedHandler, jwtExtractionHandler };
