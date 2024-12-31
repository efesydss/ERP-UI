# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
# original backend (ef)endpoint = https://falcons-erp-api-dev.sd.iafl.net/
FROM oven/bun:1-debian AS bun

WORKDIR /usr/src/app

ENV VITE_BACKEND_ENDPOINT=https://falcons-erp-api-dev.sd.iafl.net/

COPY . .
RUN bun install
RUN bunx --bun vite build

FROM nginx:latest

COPY --from=bun ./usr/src/app/dist /usr/share/nginx/html/
COPY --from=bun ./usr/src/app/conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
# run the app
ENTRYPOINT [ "nginx", "-g", "daemon off;"]