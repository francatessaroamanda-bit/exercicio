const mongoose = require("mongoose");


async function conectarBanco(){

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado!");

    } catch(error){

        console.log("Erro no MongoDB:", error);

    }

}


module.exports = conectarBanco;