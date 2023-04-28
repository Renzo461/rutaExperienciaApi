const connection = {
    // client: 'mysql',
    // connection: {
    //     host: '127.0.0.1',
    //     port: 3306,
    //     user: 'root',
    //     password: '',
    //     database: 'rutaexperiencia',
    // }
    client: 'mysql',
    connection: {
        host: '144.22.59.87',
        port: 3306,
        user: 'beatriz',
        password: '#GKHrMhVt9uYd4ox#',
        database: 'rutaexperiencia',
    }
}

const knex = require('knex')(connection)
module.exports = knex
