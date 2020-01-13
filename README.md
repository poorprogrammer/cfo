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

```
docker-compose -f compose/test/docker-compose.yml run e2e
```

## Production configuration 

overwrite it in `web/.env.production.local` 
<https://cli.vuejs.org/guide/mode-and-env.html>