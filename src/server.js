//Import por CommonJS 

// const http = require('http') 

//Import por ESModule import/export

import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto' // UUID => Unique Universal ID
//ex: import fastify from 'fastify'

//ROTAS - meios de entrada para o consumidor da API chamar as funcionalidades do nosso app
//Requisição HTTP - Métodos: GET, POST, PUT, PATCH, DELETE (CRUD)

// GET => Buscar uma recurso do backend
// POST => Criar uma recurso no backend
// PUT => Atualizar um recurso no backend - ex: um formulario com muitos campos
// PATCH => Atualizar uma informação especifica de um recurso no backend - ex: atualizar apenas 1 campo
// DELETE => Deletar um recurso no backend

// Podemos ter rotas com o mesmo URL porém metódos diferentes por exemplo
// Get /users => Busca um user
// Post /users => Criando um user

//Salvar em memoria

const database = new Database()

const server = http.createServer(async (request, response) => {
    // Criar um usuário (nome, email, senha) => o request possui todas essas informações
    // Devolver uma resposta enviamos o response
    const {method, url} = request;

    //Middlewares -> Interceptador
    //Interceptador -> Intercepta a requisição e fazem algum tratamento ou validação
    await json(request, response)

    if(method ===  'GET' && url === '/users') {
        const users = database.select('users')

        //Array não pode ser enviado para o front, então iremos converter para JSON - JavaScript Object Notation
        return response.end(JSON.stringify(users)) // retorna um array vazio sempre que reiniciamos a aplicação
    }

    if(method ===  'POST' && url === '/users') {
        const {name, email} = request.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        //Status code: 201 - Sucesso - Created
        return response.writeHead(201).end() 
        // Quando criamos algo não precisamos retornar nenhuma informação apenas o status de sucesso ou erro já é suficiente
    }

    //Status code: 404 - Erro - Not found
    return response.writeHead(404).end() 
    //Rota de "escape" ou seja quando nenhuma rota acima foi encontrada cai aqui
})

//rota do server: http://localhost:3333
// node src/server.js | node --watch src/server.js
server.listen(3333)
console.log("Server up and running!")