import { Database } from "./database.js"
import { randomUUID } from 'node:crypto' // UUID => Unique Universal ID

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')

            //Array não pode ser enviado para o front, então iremos converter para JSON - JavaScript Object Notation
            return res.end(JSON.stringify(users)) // retorna um array vazio sempre que reiniciamos a aplicação
        }
    },
    {
        method: 'POST',
        path: '/users',
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
    }
]