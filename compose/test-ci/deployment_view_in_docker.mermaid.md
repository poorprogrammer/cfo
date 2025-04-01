### Deployment view on host

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

### Deployment view in docker

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

preview in [Mermaid Live Editor](https://mermaid.live/edit) or use [plugin](https://marketplace.visualstudio.com/items?itemName=MermaidChart.vscode-mermaid-chart)