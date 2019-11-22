require('dotenv').config();

const server = require('./api/server.js');

console.log('\nmessage:', process.env.MSG);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

