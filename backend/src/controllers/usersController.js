const connection = require('../config/db');
const bcrypt = require('bcrypt');

async function listUsers(request, response) {
    connection.query('SELECT * FROM users', (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: `Sucesso! Lista de usuários.`,
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: `Não foi possível realizar a remoção. Verifique os dados informados`,
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    })
}

async function storeUser(request, response) {
    console.log(request.body)
    const params = Array(
        request.body.name,
        request.body.username,
        bcrypt.hashSync(request.body.password, 10)
    );

    const query = 'INSERT INTO users(name,username,password) values(?,?,?);';

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: `Sucesso! Usuários cadastrado.`,
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: `Não foi possível realizar a ação. Verifique os dados informados`,
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }        
    })
}

module.exports = {
    listUsers,
    storeUser
}