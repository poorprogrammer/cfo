[![Build Status](https://travis-ci.com/poorprogrammer/cfo.svg?branch=master)](https://travis-ci.com/poorprogrammer/cfo)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=poorprogrammer_cfo&metric=coverage)](https://sonarcloud.io/dashboard?id=poorprogrammer_cfo)
# CFO for Odds

Chief Finance Officer for Odds people

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

## Run unit test

```
./script/unittestweb
```

## Run end-to-end test

```
docker-compose -f compose/test/docker-compose.yml run --rm e2e
```

## Production configuration 

overwrite it in `web/.env.production.local` 
<https://cli.vuejs.org/guide/mode-and-env.html>
