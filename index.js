
//ESTO ES LO QUE NOS PROPORCIONA NODE JS

const {createServer} = require("http"); //creamos un servidor con http createServer. 

const {createReadStream, stat} = require("fs");

function contentType(extension){//Esto explica los tipos de archivo que soporta el servidor que estamos creando
    if(extension == "html") return "text/html";//Si solo hacemos una linea de if se hace solo en una linea sin llaves
    if(extension == "css") return "text/css";
    if(extension == "js") return "text/javascript";
    if(extension == "jpg" || extension == "jpeg") return "image/jpeg";
    if(extension == "png") return "image/png";
    if(extension == "json") return "application/json";
    return "text/plain"; 
}

function servirFichero(respuesta, ruta, tipo, status){
    respuesta.writeHead(status, {"Content-type" : tipo });
    
    let fichero = createReadStream(ruta); //creamos un flujo de lectura
    fichero.pipe(respuesta);//Con esto conectamos el fichero a la respuesta para que fluyan los datos
    fichero.on("end", () => {
        respuesta.end(); //Presiona el enter para que viaje al cliente
    }); //Cuando termines de fluir invoca este callback
}

const servidor = createServer((peticion, respuesta) => {

    // respuesta.writeHead(404, { "Content-type" : "text/html" }); //Es una función que me va a permitir crear las cabeceras y configurar la respuesta.
    // respuesta.write("..x cosa");//Al no poner una imagen aquí no funciona
    // respuesta.end();

    //Invocamos la funcion de arriba porque es un método más rápido para hacer lo que hemos hecho antes
    if(peticion.url == "/"){//Preguntamos si la url es barrita 
        servirFichero(respuesta, "./publico/index.html", contentType("html"), 200);//si es así servirFichero
    }else{
        let ruta = "./publico" + peticion.url;

        stat(ruta, (error,info) => {
            if(!error && info.isFile()){//si no hay error y además es un fichero sirvo esta ruta
                return servirFichero(respuesta,ruta,contentType(ruta.split(".").pop()),200); 
            }
            servirFichero(respuesta,"./404.html",contentType("html"), 404);
        });
    }
    
});

servidor.listen(process.env.PORT || 3000); // Cuando no estemos en render usaremos este puerto, pero en render nos proporcionarán uno que no controlaremos