const mongoose = require("mongoose");

//Criando schema
const HomeSchema = new mongoose.Schema({
  titulo: { type: String, require: true },
  descricao: String,
});

//Criando model
const HomeModel = mongoose.model("Home", HomeSchema);

class Home {}

//module.exports =  HomeModel
