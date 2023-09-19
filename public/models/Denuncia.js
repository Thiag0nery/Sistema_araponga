const db = require('./db.js')

const Denuncia = db.sequelize.define('denuncia', {
    nome: {
        type: db.Sequelize.STRING
    },
    
})

//Criar a tabela
Denuncia.sync({force: true})

module.exports = Denuncia