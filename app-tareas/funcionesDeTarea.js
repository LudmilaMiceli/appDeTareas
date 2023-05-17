const { writeFileSync, readFileSync } = require("fs");
const Tarea = require("./Tarea");
const path = require("path");
require("colors");

const leerJSON = () =>
  JSON.parse(readFileSync(path.join(__dirname, "tareas.json"), "utf-8"));
const escribirJSON = (tareas) =>
  writeFileSync(
    path.join(__dirname, "tareas.json"),
    JSON.stringify(tareas, null, 3),
    "utf-8"
  );

module.exports = {
  tareas: leerJSON(),
  listar: function (tareas = this.tareas) {
    tareas.forEach(({ titulo, estado }, index) => {
      let estadoColorido =
        estado === "pendiente"
          ? estado.yellow
          : estado === "en progreso"
          ? estado.cyan
          : estado === "terminada"
          ? estado.magenta
          : estado;
      console.log(`${index + 1} - Tarea: ${titulo} ---> ${estadoColorido}`);
    });
  },
  agregar: function (titulo) {
    let tareas = leerJSON();
    let tarea = new Tarea(titulo);
    tareas.push(tarea);
    escribirJSON(tareas);
    return `Se agregó ${titulo} correctamente`.green;
  },
  eliminar: function (titulo) {
    const tareas = this.tareas;
    const index = tareas.findIndex((tarea) => tarea.titulo === titulo);
    if (index !== -1) {
      tareas.splice(index, 1);
      escribirJSON(tareas);
      return (`Se eliminó ${titulo} correctamente`).bgCyan;
    } else {
      return `No se encontró la tarea ${titulo}`.red;
    }
  },
  editarEstado: function (titulo, nuevoEstado) {
    const tareas = this.tareas;
    let tarea = tareas.find((t) => t.titulo === titulo);
    if (tarea) {
      tarea.estado = nuevoEstado.toLowerCase();
      escribirJSON(tareas);
      return (`Se editó el estado de ${titulo} a ${nuevoEstado}`).green;
    } else {
      return `No se encontró la tarea ${titulo}`.red;
    }
  },
  filtrarPorEstado: function (estado) {
    const tareasFiltradas = this.tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === estado.toLowerCase()
    );
    if (!tareasFiltradas.length) {
      return console.log(`"No hay tareas con el estado: " ${estado}`).red;
    }
    this.listar(tareasFiltradas);
  },
};
