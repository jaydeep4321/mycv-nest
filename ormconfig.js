var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  // cli: {
  //   migrationsDir: 'migrations',
  // },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
    });
    break;

  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      keepConnectionAlive: true,
    });
    break;

  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
