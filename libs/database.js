import { DataSource } from 'typeorm';
import databaseConfig from '../ormconfig.json';

let AppDataSource;

export const initializeDataSource = async () => {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    AppDataSource = new DataSource(databaseConfig);
    await AppDataSource.initialize();
  }
  return AppDataSource;
};