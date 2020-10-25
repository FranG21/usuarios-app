var knex = require('knex')({
  client: 'pg',
  version: '11.6',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
  }
});

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
