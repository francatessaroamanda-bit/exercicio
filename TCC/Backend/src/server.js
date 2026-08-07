const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarBanco = require("./config/database");


const app = express();


conectarBanco();


app.use(cors());

app.use(express.json());


app.get("/", (req,res)=>{

    res.json({
        mensagem:"API Mundo Pet funcionando!"
    });

});


const PORT = 5000;


app.listen(PORT,()=>{

    console.log(`Servidor rodando na porta ${PORT}`);

});