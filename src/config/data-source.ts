import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'node_auth',
    entities: [User],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    logging: true,
});