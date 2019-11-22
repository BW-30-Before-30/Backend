const db = require('../database/dbConfig')
const knex = require('knex');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const ids = await db('users').insert(user).returning('id')
  console.log(ids)
  return findById(ids[0]);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}