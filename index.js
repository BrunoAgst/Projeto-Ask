const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Estou dizendo para o express usar o EJS como view(rederizar o html)
app.set("view engine","ejs");
//definindo arquivos estáticos
app.use(express.static('public'));
//configurando o bodyparser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    //pegando as informações do formulario com bodyparser
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulario recebido " + titulo + " " + descricao);
});

app.listen(3000, () =>{
    console.log("App rodando!");
});