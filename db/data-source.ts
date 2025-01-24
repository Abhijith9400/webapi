import { DataSource as TypeOrmDataSource, DataSourceOptions, DataSource } from 'typeorm';
 // Import UserEntity for database operations
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'abhijith003',
  password: 'Subhamani@03',
  database: 'webapi',
  entities: [], // Register your entities here
  migrations: ['dist/migrations/*.js'], // Provide the path to your migration files
  logging: false,
  synchronize: true, // Set to false in production to avoid accidental schema changes
};

// Create a DataSource instance
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
