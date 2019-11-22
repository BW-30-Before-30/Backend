const db = require('../database/dbConfig')

module.exports = {
  create,
  findBy,
  findById,
  update
};



function findBy(filter) {
  return db('bucketlists').where(filter);
}

async function create(user_id) {

  const [id] = await db('bucketlists').insert({user_id: user_id}).returning('id');

  return findById(id);
}

function findById(id) {
  return db('bucketlists').where({id}).first();
}

function update(id, bucketlist) {
    return db('bucketlists')
    .where({id: id})
    .update(bucketlist)
}