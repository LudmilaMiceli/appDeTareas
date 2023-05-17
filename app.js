const listarTareas = require("./app-tareas/funcionesDeTarea");
const argv = require("process").argv;
const accion = argv[2];
require("colors");

switch (accion) {
  case "listar":
    console.log(
      `
       LISTA DE TAREAS
       `
    );
    listarTareas.listar();
    break;
  case undefined:
    console.log(
      "Atención! Tienes que pasar una acción. Las acciones disponibles son: listar, agregar, eliminar, editar, filtrarPorEstado"
    );
    break;
    case "agregar":
      console.log(listarTareas.agregar(argv[3]));
      break;
  case "eliminar":
    console.log(listarTareas.eliminar(argv[3]));
    break;
  case "editar":
    console.log(listarTareas.editarEstado(argv[3], argv[4]));
    break;
  case "filtrarPorEstado":
    return listarTareas.filtrarPorEstado(argv[3].toLowerCase());
  default:
    console.log("No entiendo qué quieres hacer".bgRed);
}