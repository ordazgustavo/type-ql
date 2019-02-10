# type-ql

type-ql is a Node.js server built with [apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) [type-graphql](https://github.com/19majkel94/type-graphql) and [typeorm](https://github.com/typeorm/typeorm) and PostgreSQL for the database.

## Usage

1. Create a database

> You may need to install PostgreSQL if you haven't already.

```bash
createdb dbname
```

2. Edit typeorm config

3. Install dependencies

```bash
npm install
```

3. Start project

```bash
npm start
```

If you didn't remove (or set to `false`) the `logging` option from `ormconfig.json` you should see
some output from the database.

Go to `localhost:4000/graphql` to use the playground
