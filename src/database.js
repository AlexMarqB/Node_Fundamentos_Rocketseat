
//Mesmo banco de dados para mais informações além dos usuarios
// { "users": [...] }

export class Database {
    //com o hashtag na frente da prop ela se torna privada
    #database = {}

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

        return data;
    }
}