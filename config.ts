// config.ts
export default () => ({
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || 'password',
      name: process.env.DATABASE_NAME || 'test',
    },
    // Add more configuration sections as needed
  });
  