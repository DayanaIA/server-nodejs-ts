
# NodeJS course with TypeScript and TypeORM

 How to genrate a complex API REST.

## Technologies to use

- POO
- Docker Compose as DB
- TypeScript

## Dependencies

Needed dependencies:

```bash
npm install class-validator cors dotenv express morgan pg typeorm typeorm-naming-strategies typescript
```

Development dependencies:

```bash
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
```

## TypeScript config

```bash
tsc --init
```

Verify

- "strictPropertyInitialization": true
- "experimentalDecorators": true
- "emitDecoratorMetadata": true
- "outDir": "./dist"

## Runnig server

Development

```bash
npm run start:dev
```

Production

```bash
npm start
```
