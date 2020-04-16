const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas_resposta', 'root','15121996br.',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;