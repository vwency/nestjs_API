import { DatabaseConfig } from "../interfaces/database.interfaces";
import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig: DatabaseConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  autoLoadEntities: true,
  synchronize: true, // Установите false в продакшене
};

export default dbConfig;
