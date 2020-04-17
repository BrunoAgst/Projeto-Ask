const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionID: { //este campo vai receber o ID da pergunta onde vai ser associado a resposta a pergunta
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false});

module.exports = Resposta;