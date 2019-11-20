const db = require('../database/dbConfig')

module.exports = {
    findByListId,
    add,
    remove,
    update,
  findById
};

function findByListId(listId) {
    return db('items')
        .join('bucketlists', 'bucketlists.id', '=', 'items.bucketlist_id')
        .where('bucketlists.id', listId)
        .select('items.*')
        .then(items => items.map(item => {
            const isCompleted = item.completed === 1;
            return {...item, completed: isCompleted};
        }));
}
// function find() {
//   return db('users').select('id', 'username');
// }

// function findBy(filter) {
//   return db('users').where(filter);
// }

async function add(item) {
  const [id] = await db('items').insert(item).returning('id');

  return findById(id);
}

async function update(item) {
    const itemId = item.id;
    await db('items').where('id', itemId).update(item);
    return findById(itemId);
  }

function findById(id) {
  return db('items')
    .where({ id })
    .first()
    .then(item => {
        const isCompleted = item.completed === 1;
        return {...item, completed: isCompleted};
    });
}

function remove(id) {
    return db('items').where({id}).delete();
}