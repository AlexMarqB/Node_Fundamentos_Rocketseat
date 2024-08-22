import { Database } from "./database.js"
import { randomUUID } from 'node:crypto' // UUID => Unique Universal ID
import { buildRoutePath } from "./util/build-route-path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')

            //Array não pode ser enviado para o front, então iremos converter para JSON - JavaScript Object Notation
            return res.end(JSON.stringify(users)) // retorna um array vazio sempre que reiniciamos a aplicação
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user)

            //Status code: 201 - Sucesso - Created
            return res.writeHead(201).end()
            // Quando criamos algo não precisamos retornar nenhuma informação apenas o status de sucesso ou erro já é suficiente
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

        }
    }
]