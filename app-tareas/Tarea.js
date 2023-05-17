const {v4 : uuidv4} = require("uuid")

const Tarea = function(titulo){
    this.id = uuidv4();
    this.titulo = titulo;
    this.estado = "pendiente"
    this.fecha = new Date();
}

module.exports = Tarea