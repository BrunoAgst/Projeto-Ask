const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas"); //só pelo fato de estar importado no index.js o código de criação de tabela já é executado
// model é representação de uma tabela com código javascript


//database connection
connection
    .authenticate()
    .then(() => {
        console.log("Success Connection")
    })
    .catch((error) => {
        console.log(error);
    })

// Estou dizendo para o express usar o EJS como view(rederizar o html)
app.set("view engine","ejs");
//definindo arquivos estáticos
app.use(express.static('public'));
//configurando o bodyparser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/",(req, res) => {
    //pegar os dados do banco e rederizar no front end do site
    Pergunta.findAll({ raw: true, order:[ //ordenando as perguntas pelo id
        ['id', 'DESC'] //DESC: decrescente e ASC: crescente 
    ]}).then(perguntas =>{
        res.render("index", {
            perguntas: perguntas
        });
    }); 
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    //pegando as informações do formulario com bodyparser
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
     //adcionando ao banco de dados
    Pergunta.create({
        title: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/"); //caso o usuário tenha sido criado com sucesso usamos a função redirect para enviar para a página principal
    })
});

app.listen(3000, () =>{
    console.log("App rodando!");
});