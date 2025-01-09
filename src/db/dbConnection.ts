import { Sequelize } from 'sequelize';
import { CONSTANT_CONFIG } from '../config/CONSTANT_CONFIG';

export const DB_CONN = new Sequelize({
  dialect: CONSTANT_CONFIG.DATABASES.MAIN.dialect,
  host: CONSTANT_CONFIG.DATABASES.MAIN.host,
  port: CONSTANT_CONFIG.DATABASES.MAIN.port,
  database: CONSTANT_CONFIG.DATABASES.MAIN.name,
  username: CONSTANT_CONFIG.DATABASES.MAIN.user,
  password: CONSTANT_CONFIG.DATABASES.MAIN.password,
  logging: true
});
