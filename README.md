# cfo
Chief Finance Officer

## Run api server

```
cd api
npm run serve
```

## Run web server

```
cd web
npm run serve
```

## Run end-to-end test

1. run api
1. `cd web`
1. `yarn test:e2e --headless`

## Production configuration 

overwrite it in `web/.env.production.local` 
<https://cli.vuejs.org/guide/mode-and-env.html>