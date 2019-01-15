# uSocial

> The uPort Social Module

[![Build Status](https://travis-ci.org/zurfyx/usocial.svg?branch=master)](https://travis-ci.org/zurfyx/usocial)<br/>
[Master] https://uport-social.herokuapp.com

[![Build Status](https://travis-ci.org/zurfyx/usocial.svg?branch=development)](https://travis-ci.org/zurfyx/usocial)<br/>
[Development] https://uport-social-dev.herokuapp.com

## Getting started

```
npm install
npm start
```

## Production

```
export NODE_ENV=production
export REACT_APP_CLIENT=http://localhost:3000
export REACT_APP_API=http://localhost:3001
export PORT=3000
export API_PORT=3001
npm run build
npm run serve
```

## Environment variables

- NODE_ENV: `production` or `development`
- REACT_APP_CLIENT: Client base URL (i.e. `http://localhost:3000`)
- REACT_APP_API: API base URL (i.e. `http://localhost:3001`)
- PORT: Client port to listen to (i.e. `3000`)
- API_PORT: API port to listen to (i.e. `3001`)

Client is only aware of environment variables starting with `REACT_APP_`.

Environment variables can also be set through `.env` files, see `.env.example` in `packages/<name>/`. 

## Thanks

- [Attester](https://github.com/rhizomik/attester)

## License

MIT © Gerard Rovira Sánchez
