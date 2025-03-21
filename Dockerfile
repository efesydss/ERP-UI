# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
# original backend (ef)endpoint = https://dev.falcons.iafl.net/
FROM oven/bun:1-debian AS bun

ARG VITE_ENV=development

WORKDIR /usr/src/app

ENV VITE_BACKEND_ENDPOINT=https://dev.falcons.iafl.net/

COPY . .
RUN bun install
RUN bunx --bun vite build --mode ${VITE_ENV}

FROM nginx:latest

COPY --from=bun ./usr/src/app/dist /usr/share/nginx/html/
COPY --from=bun ./usr/src/app/conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
# run the app
ENTRYPOINT [ "nginx", "-g", "daemon off;"]