// Buffer => Representação de um espaço na memória do computador em binario(hexadecimal)
// Usado para transitar dados de forma extremamente rapida

const buf = Buffer.from("ok")

console.log(buf) //hexadecimal
console.log(buf.toJSON()) //decimal