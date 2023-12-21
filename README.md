## Setup

### 1. Install the required dependencies

```bash
$ npm install
```

### 2. Rename the .env.example filename to .env and set your local variables

```bash
$ mv .env.example .env
```

### 3. Start the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker for development

```bash
# start the application
$ npm run docker:up

# stop the application
$ npm run docker:down
```

## Swagger documentation

- [localhost:{PORT}/docs](http://localhost:{PORT}/docs)
