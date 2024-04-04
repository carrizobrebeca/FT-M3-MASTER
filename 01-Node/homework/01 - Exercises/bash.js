const process = require('process');
const commands = require('./commands/index.js');
//commands = variable que es un objeto que tiene todas las funciones
function print(output) {
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
};

function bash() {
   process.stdout.write("prompt > ");
   
   process.stdin.on("data", (data) => {
      //guardar en variable arg, data y convertirlo en string
      //trin() elimina espacios al inicio y fin
      let args = data.toString().trim().split(" ");
      //guardar en variable cmd la primer palabra del string => args
      //=> primer comando
      //como no podemos sacar cual es la primer palabra 
      //hacemos un split, para sacar la primer palabra que viene en el string
      //convierte ese string en un []
      //y le decimo que a cada elemento del array es uno % x un espacio:
      //Ej llega el string "echo curso soy henry" =>
      //["echo"]["curso"]["soy"]["henry"]
      //usamos el metodo shift para guardar el primer elemento del array
      let cmd = args.shift(); // cmd = "echo" => comando
      //resto del array que queda = args => ["curso"]["soy"]["henry"]
      

      //verifica si dentro del objeto commands existe una propiedad con el valor que contiene la variable "cmd"
      commands[cmd] // = commands.echo
      ? commands[cmd](print, args.join(" "))
      : print(`command not found: ${cmd}`);

   });
};

bash();


module.exports = {
   print,
   bash,
};
