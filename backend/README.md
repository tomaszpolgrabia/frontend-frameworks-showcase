# How to start backend

node .\index.js .\config-dev.json

# Building docker image

Please proceed with following steps:

- execute 'docker build --no-cache . -t frontend-showcase-backend:latest'
- check if 'docker run frontend-showcase-backend:latest' works well
- execute 'docker login'
- execute 'docker tag frontend-showcase-backend:latest tpolgrabia/frontend-showcase-backend:latest'
- execute 'docker push tpolgrabia/frontend-showcase-backend:latest'
