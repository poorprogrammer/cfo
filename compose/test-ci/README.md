### Deployment views
On host, we have e2e, web, api and keycloak as below.

```mermaid
graph TD
  e2e["`
    e2e
    [browser]
  `"]

  e2e -->|http localhost: 9000| keycloak
  e2e -->|http localhost: 3000| api
  e2e -->|http localhost: 8080| web
```

But in `docker-compose`, keycloak requires `https`. The deployment view has chaged as below.

```mermaid
graph TD

  subgraph "Docker Network"

    e2e["`
        e2e
        [browser]
    `"]
    
    api_proxy["`
      api_proxy
      https proxy (nginx)
    `"]

    web["`
      web
      https proxy (nginx): 80, 443
      web server:8080
    `"]


    keycloak

    keycloak_proxy["`
      keycloak_proxy
      https proxy (nginx)
    `"]

    api
  end


  e2e -->|https keycloak_proxy| keycloak_proxy
  keycloak_proxy --> |http 8080| keycloak
  e2e --> |https api_proxy| api_proxy
  api_proxy -->|http 3000| api
  e2e --> |https web| web
  web --> |http 8080| web
```

more details at [รัน e2e test ที่ใช้ keycloak ใน docker-compose](https://medium.com/odds-team/%E0%B8%A3%E0%B8%B1%E0%B8%99-e2e-test-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%8A%E0%B9%89-keycloak-%E0%B9%83%E0%B8%99-docker-compose-a1d8e3eeebc4)

### How to debug?

```
docker-compose run --rm e2e_debug
```

then on host machine:

```
cd e2e
npx playwright show-report
```