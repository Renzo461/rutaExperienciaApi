const connection = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'rutaexperiencia',
    }
}

const knex = require('knex')(connection)
module.exports = knex
