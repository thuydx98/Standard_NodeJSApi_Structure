const Sequelize = require('sequelize');

const DATABASE_URL = 'postgres://root:root@127.0.0.1:5432/node-postgres-sequelize';
const database = new Sequelize(DATABASE_URL);

module.exports = database;