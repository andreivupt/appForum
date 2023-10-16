const connection = require('../config/db');

async function commentsByPostId(request, response) {

    const query = "SELECT description, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as data_criacao FROM comments WHERE post_id = ?";

    const params = Array(
        request.params.post_id
    );
    console.log(params)
    connection.query(query, params, (err, results) => {
        console.log(results)
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: `Sucesso! Lista de comentarios.`,
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

async function storeComment(request, response) {
    
    const params = Array(
        request.body.description,
        request.body.user_id,        
        request.body.post_id
    );

    const query = 'INSERT INTO comments(description,user_id,post_id) values(?,?,?);';

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: `Sucesso! Comentário cadastrado.`,
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
    commentsByPostId,
    storeComment
}