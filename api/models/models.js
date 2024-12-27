const mongoose = require('mongoose');
const config = require('../config/config.js');


//
// Variavel global que mantém a conexao com o banco de dados
//
var connection = null;


//
// Variavel global que mantém o modelo das receitas
//
var Receita = null;


//
// Variavel global que mantém o modelo dos usuarios
//
var Usuario = null;


//
// Conecta ao banco de dados e cria os modelos
//
async function connect() {
    if (!connection) {
        await mongoose.connect(config.database.connectionString);
        connection = mongoose.connection;
        connection.on("error", console.error.bind(console, "MongoDB connection error:"));
        
       
        var usuarioSchema = { 
            dataRegistro: Date,
            dataAtualizacao: Date,
            nome: String,
            email: String,
            senha: String,
            tokenSenha: String,
            dataTokenSenha: Date,
            falhasLogin: { type: Number, default: 0 },
            bloqueado: { type: Boolean, default: false },
            administrador: { type: Boolean, default: false }
        };

        Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');
    }

    return { connection, Usuario } 
}

module.exports = { connect };
