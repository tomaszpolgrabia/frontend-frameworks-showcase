#!/bin/sh
docker build --no-cache . -t frontend-showcase-backend:latest
docker tag frontend-showcase-backend:latest tpolgrabia/frontend-showcase-backend:latest
docker push tpolgrabia/frontend-showcase-backend:latest
