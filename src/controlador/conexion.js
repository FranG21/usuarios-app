var knex = require('knex')({
  client: 'pg',
  version: '11.6',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'clientesdb'
  }
});

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
