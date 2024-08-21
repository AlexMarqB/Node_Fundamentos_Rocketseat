//Streams => Funcionalidade chave do Node
//Buffer => Modelo que o Node utiliza para comunicar dados entre streams

//Netflix & Spotfy
//Podemos ver um filme ou escutar uma música mesmo antes da leitura do arquivo ser completa

// Ex:
// Importação de clientes via CSV (Excel)
// 1gb de CSV - 1.000.000 linhas
// Sem Streaming: /upload import.csv -> irá ler o 1gb do arquivo por completo -> depois irá fazer as operações para cada linha
// upload da internet 10mb/s - 100 segundos -> para FINALIZAR o upload -> E só então fazer as inserções das linhas

// Com Streaming: /upload import.csv -> no primerio 10mb existe 10.000 linhas que já foram recebidas pela nossa aplicação
// -> então ele já irá fazer as inserções conforme formos recebendo as linhas mesmo que não tenha sido finalizado

// Readable Stream (Import CSV) o app recebe aos poucos / Writable Streams (Netflix) o app envia aos poucos

// No node toda porta de entrada é automaticamente uma stream

// Streams -> 

// process.stdin //stream de leitura
//     .pipe(process.stdout) //stream de escrita

import { Readable, Writable, Transform } from "node:stream"

//Apenas lê
class OneToHundredStream extends Readable {
    index = 1;
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100) {
                this.push(null) //fornece informações para quem está consumindo ela
            } else {
                //É um tipo de dado aceito pelo node para streams e para criar um buffer é preciso passar uma String como parametro
                const buf = Buffer.from(String(i) + " ") 
    
                this.push(buf)
            }
        }, 1000)
    }
}

//Tem que ler e escrever
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        //params callback (erro, resultado)
        callback(null, Buffer.from(String(transformed)))
    }
}

//Escreve
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        //chunk é o que recebemos da stream de leitura (Buffer)
        //encoding é como a informação está codificada
        //callback é a função que será chamada quando acabar o processamento
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())