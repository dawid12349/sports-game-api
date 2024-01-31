import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as assert from "assert";

dotenv.config({ path: '.env' });

const env = process.env.NODE_ENV
const db_host = process.env.POSTGRES_HOST
const db_port = process.env.POSTGRES_PORT
const db_user = process.env.POSTGRES_USER
const db_password = process.env.POSTGRES_PASSWORD
const db_database = process.env.POSTGRES_DB

assert.ok(env, 'NODE_ENV not specified')
assert.ok(db_host, 'POSTGRES_HOST not specified')
assert.ok(db_port, 'POSTGRES_PORT not specified')
assert.ok(db_user, 'POSTGRES_USER not specified')
assert.ok(db_password, 'POSTGRES_PASSWORD not specified')
assert.ok(db_database, 'POSTGRES_DATABASE not specified')

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: db_host,
    port: +db_port,
    username: db_user,
    password: db_password,
    database: db_database,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    synchronize: env !== 'production',
    logging: env !== 'production',
    namingStrategy: new SnakeNamingStrategy()
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;