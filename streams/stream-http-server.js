import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async (req, res) => {
//req => ReadbleStream
//res => WritableStream

// Preciso ler um arquivo por completo antes de trabalhar com ele

    const buffers = []

    //Espera por cada pedaço da requisição e acumula no array
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    //após finalizar o processo acima

    const fullStreamContent = Buffer.concat(buffers).toString()

    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

server.listen(3334)
console.log("Server up and running!")