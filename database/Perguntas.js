const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    //type string para texto curto e type text para textos longos
    title:{
        type: Sequelize.STRING, 
        allowNull: false //impedi que seja nulo
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false }).then(() =>{}); //sincroniza com o banco, caso não exista no banco ele vai criar

module.exports = Pergunta;