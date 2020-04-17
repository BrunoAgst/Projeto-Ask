const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas"); //só pelo fato de estar importado no index.js o código de criação de tabela já é executado
const Resposta = require('./database/Resposta');
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
    ]}).then(pergunta =>{
        res.render("index", {
            perguntas: pergunta
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

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({ //findOne busca um único dado
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //realizar a verificação se o id existe no banco
            //fazendo a busca no banco para carregar as respostas

            Resposta.findAll({
                where: {questionID: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(resposta => {
                res.render("pergunta",{
                    perguntas: pergunta, 
                    respostas: resposta    
                });
            })
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaID = req.body.perguntaId;

    Resposta.create({
        body: corpo,
        questionID: perguntaID
    }).then(() => {
        res.redirect("/pergunta/" + perguntaID)
    });
});

app.listen(3000, () =>{
    console.log("App rodando!");
});