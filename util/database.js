const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_practice', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;