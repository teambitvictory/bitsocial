# bitsocial

bitsocial is a reusable microservices that allows an easy integration of social features into every app.
The microservice handles functionality:
​- Profile management
- Friend management
- Content interactions (like, dislike, ...)

Bitsocial is still in the early stages. If you are interested in using it, feel free to get in contact with us at itsocial(at)bitvictory.dev.

## Setup
The nodejs service could be deployed as a docker or the solution of your choice. It pre requires a mongo database, that can be connected over the environment variables:

The authentication is handled over [JWKS](https://datatracker.ietf.org/doc/html/rfc7517). The URL of your JWKS endpoint could be configured over the environment variables.

You can find a postman collection in the artifacts folder.

