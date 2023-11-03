require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;;

// Configuração mais detalhada do CORS
const corsOptions = {
    origin: 'http://seufrontend.com', // Substitua com a origem do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors()); // Habilita o CORS para todas as rotas

app.use(express.json()); // Middleware para lidar com JSON no corpo das requisições

const conexao = require("./infraestrutura/conexao");
const Tabelas = require('./infraestrutura/tabelas');

Tabelas.init(conexao);

const routes = require('./routes/index');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
