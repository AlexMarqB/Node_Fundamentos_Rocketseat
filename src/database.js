import fs from 'node:fs/promises'

//                            ../ volta 2 diretorios
const databasePath = new URL('../db.json', import.meta.url) //import.mete.url => Aponta todo o caminho do arquivo atual
//Mesmo banco de dados para mais informações além dos usuarios
// { "users": [...] }

export class Database {
    //com o hashtag na frente da prop ela se torna privada
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
        .then(data => this.#database = JSON.parse(data))
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        //busca se existe uma chave === table e retorna todos os dados
        const data = this.#database[table] ?? []

        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]; //Cria a chave e insere o valor
        }

        this.#persist();

        return data;
    }
}