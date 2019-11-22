module.exports = {
  development: {
    client: 'sqlite3',
    connection: { 
      filename: './database/auth.db3'},
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    }, 
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: { filename: './database/test.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  production_2: {
    client: 'pg',
    connection: 'postgres://hfqubxkcnuaczm:21ee8f200c14012f079471125c1c416464646415afac657661fcf362473ceb90@ec2-54-243-44-102.compute-1.amazonaws.com:5432/d4q320tvnudtt0?ssl=true',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' }, 
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  }
}
