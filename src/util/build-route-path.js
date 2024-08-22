// /users/:id
export function buildRoutePath(path) {
    //REGEX 
    //Quero encontrar tudo que comece com : e seja acompanhado de letras de a-z minusculas ou A-Z maiusculas que se repitam diversas vezes "+", busque todos os "matchs" - "g "
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '([a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}