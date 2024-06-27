# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest

ENV VITE_BACKEND_ENDPOINT=https://falcons-erp-api-dev.sd.iafl.net/

COPY . .
RUN bun install
EXPOSE 5173:5173
# run the app
ENTRYPOINT [ "bun", "run", "dev" ]