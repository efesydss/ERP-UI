# ERP-UI
Falcons ERP Web App UI

- Automatically deployed on : https://dev.falcons.iafl.net/swagger-ui/index.html)
- Swagger UI: https://dev.falcons.iafl.net/swagger-ui/index.html 


to run locally, first clone and execute below codes at root directory 

```bash
source .env.dist
bun install
bun run dev
```

use `/login` to login and get the token


Or use the launch_dev.sh script 

```bash
./launch_dev.sh
```


## Dockerization 

This UI app is dockerized to be runned in containerized app platforms.

See `Dockerfile`

Below command creates the docker image 

```bash
 docker build -f Dockerfile -t erp-ui .
```
