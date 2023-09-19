// Importe o módulo Express.js
const express = require('express');

// Crie uma instância do aplicativo Express
const app = express();
const path = require('path'); // Importe o módulo 'path'
app.use(express.static("public"));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));
const { Client } = require('pg');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'ejs');

// Diretório onde seus arquivos de visualização (templates) estão localizados
app.set('views', path.join(__dirname, 'src', 'views'));


const client = new Client({
    user: 'postgres',
    host: 'containers-us-west-163.railway.app',
    database: 'railway',
    password: 'bd1mPMOy8VZg2yWZkuh7',
    port: 5702, // A porta padrão do PostgreSQL é 5432
  });
client.connect()
.then(() => console.log('Conectado ao PostgreSQL'))
.catch(err => console.error('Erro ao conectar ao PostgreSQL', err));  

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/denuncia', (req, res) => {
    res.render('denuncia_page'); // 'outra_pagina' é o nome do arquivo EJS (sem a extensão .ejs)
  });
app.post('/add-denuncia', function(req, res){
    const { campo1, campo2,campo3,campo4 } = req.body;
    console.log(campo1)
    
    const query = 'INSERT INTO denuncia (email, nascimento, nome, fatos) VALUES ($1, $2, $3, $4)';
    const values = [req.body.email, req.body.nascimento, req.body.nome, req.body.fatos];
    console.log(values)
    client.query(query, values)
    .then(() => {
      console.log('Dados inseridos com sucesso!');
      res.status(201).json({ mensagem: 'Dados inseridos com sucesso' });
    })
    .catch(err => {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ erro: 'Erro ao inserir dados' });
    });
    // res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})
// Inicie o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});