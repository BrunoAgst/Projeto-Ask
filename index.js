const express = require('express');
const app = express();

// Estou dizendo para o express usar o EJS como view(rederizar o html)
app.set("view engine","ejs");
//definindo arquivos estáticos
app.use(express.static('public')); 


app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(3000, () =>{
    console.log("App rodando!");
});