# bitsocial

bitsocial is a reusable microservices that allows an easy integration of social features into every app.
The microservice handles functionality:
​- Profile management
- Friend management
- Content interactions (like, dislike, ...)

Bitsocial is still in the early stages. If you are interested in using it, feel free to get in contact with us at itsocial(at)bitvictory.dev.

## Setup
bitsocial could be deployed as a docker or the solution of your choice. It pre requires a mongo database, that can be connected over the environment variables:
```
DB_PROTOCOL = 'mongodb'
DB_HOST = 'localhost'
DB_PORT = '27017'
DB_NAME = 'bitsocial'
```

The authentication is handled over [JWKS](https://datatracker.ietf.org/doc/html/rfc7517). The URL of your JWKS endpoint and additional parameter over the enviroment variables.
```
JWKS_URI
JWT_AUDIENCE
JWT_ISSUER
```


You can find a postman collection in the artifacts folder. By default the endpoint is running at port 3000.
```
PORT = 3000
```