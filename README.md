# PERN Stack Template

Postgres, Express, React, Node

## Running the App with docker

Ensure that you have installed [Docker Compose](https://docs.docker.com/compose/install/).

Build the application using the following command:

```
docker-compose build
```

Startup the application using the following command:

```
docker-compose up -d
```

You may also startup the services individually by running:

```
docker-compose up -d webapp
```

OR

```
docker-compose up -d postgresdb
```

OR

```
docker-compose up -d restapi
```

To stop all the services, run the following command in the root directory:

```
docker-compose down
```

All the services are now up. The webapp is running in docker and forwarded to http://localhost:8888](http://localhost:8888), so you can go there.

## Running the App locally

Alternatively, the webapp can be run locally using `npm` assuming you have [NPM and NodeJS](https://nodejs.org/en/download/) installed.

```
npm install
npm start
```

Navigate to the webapp at [http://localhost:3000](http://localhost:3000)

The restapi could also be run locally, by running the following commands:

```
npm install
npm start
```
