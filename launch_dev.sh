#!/bin/sh


source .env.dist

bun install --no-save

bun run dev
