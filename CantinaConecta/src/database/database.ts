import { DataSource, DataSourceOptions } from 'typeorm';
import { Dependent } from '../entities/Dependent';
import { Transaction } from '../entities/Transaction';
import * as SQLite from 'expo-sqlite';

export const setupDatabase = async () => {
  const dataSourceOptions: DataSourceOptions = {
    type: 'expo',
    driver: SQLite,
    database: 'my-database',
    synchronize: true,  
    entities: [Dependent, Transaction],  
  };

  const dataSource = new DataSource(dataSourceOptions);

  try {
    await dataSource.initialize();
    console.log('Database connected and initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};