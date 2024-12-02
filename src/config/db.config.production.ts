import * as path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


export default (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: process.env.host || 'localhost',
    port: +process.env.port,
    username:  'admin',
    password: String(process.env.password || 'admin'), // Convert to string explicitly
    database: process.env.database || 'postgres',
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    synchronize: false, // Do not set to true in production
});

