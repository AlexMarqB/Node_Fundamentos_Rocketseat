//Import por CommonJS 

// const http = require('http') 

//Import por ESModule import/export

import http from 'node:http';
//ex: import fastify from 'fastify'

const server = http.createServer((request, response) => {
    // Criar um usuário (nome, email, senha) => o request possui todas essas informações
    // Devolver uma resposta enviamos o response
    return response.end("Hello world")
})

//rota do server: localhost:3333
// node src/server.js
server.listen(3333)
console.log("Server up and running!")
