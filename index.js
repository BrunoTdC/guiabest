const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
//Router
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/articlesController")
//View engine
app.set('view engine','ejs')

//Static
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("conexão com banco de dados realizada com sucesso")
    }).catch((error)=>{
        error = "Não conectado ao banco de dados";
        console.log(error)
    })
//Modeus
const article = require("./articles/Article");
const category = require("./categories/Category");

app.use("/",categoriesController)

app.use("/", articlesController)

app.get("/",(req,res)=>{
    res.render('index')
})

app.listen(8080,()=>{
    console.log("Servidor Rodando")
})