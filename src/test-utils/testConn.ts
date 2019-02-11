import { createConnection } from 'typeorm'

export function testConn(drop: boolean = false) {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'gustavoordaz',
    password: '',
    database: 'type-ql-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../entity/*.*']
  })
}
