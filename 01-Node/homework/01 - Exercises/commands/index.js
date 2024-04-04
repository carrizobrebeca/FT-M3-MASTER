const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { fork } = require("child_process");

function pwd(print) { 
    print(process.cwd());
}

function date(print) {
    print(Date());
}

function echo(print, args) {
    print(args);
}

function ls(print) {
    fs.readdir(".", (error, files) => {
        if(error) throw new Error(error);
        print(files.join(" "))
    });
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error) throw new Error(error);
        print(data);
    });
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error) throw new Error(error);
        //Invoca la función print y pásale como argumento la primera línea del archivo data
        let aux = data.split("\n");
        print(aux[0]);


        //para imprimir las 8 primeras lineas
        //para gque no salga el prompt en cada linea
        
        // let text;
        
        //let tiene contexto de llaves, la declaro afuera porque la necesito afuera
       
        // for (let i = 0; i <= 7 ; i++) {
        //     text += aux[i] + "\n";
        // }
        // print(text);
    });    
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error) throw new Error(error);

        //una forma
        // let aux = data.split("\n").pop();
        // print(aux.trim());

        //otra forma
        let aux = data.split("\n");
        print(aux[aux.length -1].trim());

    });
}

function curl(print, args) {
    utils.request(args, (error, response)=>{
        if(error) throw new Error(error);
        print(response)
    })
}

//exportar todas las funciones en forma de objeto
//se importan en bash.js 
//bash.js recibe una variable = commands que es un objeto que tiene todas las funciones
module.exports = { pwd, date, echo, ls, cat, head, tail, curl };
