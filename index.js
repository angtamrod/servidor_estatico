
//ESTO ES LO QUE NOS PROPORCIONA NODE JS

const {createServer} = require("http"); //creamos un servidor con http createServer. 

const {createReadStream} = require("fs");

const servidor = createServer((peticion, respuesta) => {

    respuesta.writeHead(404, { "Content-type" : "text/html" }); //Es una función que me va a permitir crear las cabeceras y configurar la respuesta.
    respuesta.write("..x cosa");//Al no poner una imagen aquí no funciona
    respuesta.end();
});

servidor.listen(process.env.PORT || 3000); // Cuando no estemos en render usaremos este puerto, pero en render nos proporcionarán uno que no controlaremos