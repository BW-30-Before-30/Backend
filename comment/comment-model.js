const db = require('../database/dbConfig')

module.exports = {
  add,
  findBy,
  findById,
  remove
};

function findBy(filter) {
  return db('comments').where(filter);
}

async function add(comment) {
  const [id] = await db('comments').insert(comment).returning('id');
  return findById(id);
}

function findById(id) {
  return db('comments').where({id}).first();
}

function remove(id) {
  return db('comments').where({id}).delete();
}