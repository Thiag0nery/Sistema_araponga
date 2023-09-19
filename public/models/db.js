const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'containers-us-west-163.railway.app',
  database: 'railway',
  password: 'bd1mPMOy8VZg2yWZkuh7',
  port: 5432, // A porta padrão do PostgreSQL é 5432
});

// Conectar ao banco de dados
client.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err));