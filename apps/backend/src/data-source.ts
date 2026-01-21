import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { SportsArticle } from './entities/SportsArticle';
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    entities: [SportsArticle],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
});