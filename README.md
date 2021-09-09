[![Build Status](https://app.travis-ci.com/poorprogrammer/cfo.svg?branch=master)](https://app.travis-ci.com/poorprogrammer/cfo)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=poorprogrammer_cfo&metric=coverage)](https://sonarcloud.io/dashboard?id=poorprogrammer_cfo)[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=poorprogrammer_cfo&metric=bugs)](https://sonarcloud.io/dashboard?id=poorprogrammer_cfo)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=poorprogrammer_cfo&metric=code_smells)](https://sonarcloud.io/dashboard?id=poorprogrammer_cfo)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=poorprogrammer_cfo&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=poorprogrammer_cfo)

# Automated CFO for Odds

Automated Chief Financial Officer for Odds people

## Run unit test

```
./script/unittestweb
./script/unittestapi
```

## Run end-to-end test

```
docker-compose -f compose/test/docker-compose.yml build e2e
docker-compose -f compose/test/docker-compose.yml run --rm e2e
```

## Run api server

```
cd api
npm run serve
```

### Load initial fixtures

```
cd api
node tests/fixtures/loadData.js
```

## Run web server

```
cd web
npm run serve
```



## Production configuration 

overwrite it using Environment Variables. See `.env` for more details.

<https://cli.vuejs.org/guide/mode-and-env.html>
