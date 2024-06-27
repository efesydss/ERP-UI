# ERP-UI
Falcons ERP Web App UI

to run locally, first clone..

at root directory `bun install`

then `bun run dev`

use `/login` to login and get the token



## Dockerization 

This UI app is dockerized to be runned in containerized app platforms.

See `Dockerfile`

Below command creates the docker image 

```bash
 docker build -f Dockerfile -t erp-ui .
```
