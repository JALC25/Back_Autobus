const Horario = require("../models/Horario");
const Ruta = require("../models/Ruta");
const Autobus = require("../models/Autobus");

class HorarioService {
  // Obtener todos los horarios con detalles de Ruta y Autobús
  static async obtenerHorarios() {
    return await Horario.findAll({
      include: [
        { model: Ruta, attributes: ["origen"] },
        { model: Autobus, attributes: ["placa"] },
      ],
    });
  }

  // Obtener un horario por ID
  static async obtenerHorarioPorId(id) {
    const horario = await Horario.findByPk(id, {
      include: [
        { model: Ruta, attributes: ["origen"] },
        { model: Autobus, attributes: ["placa"] },
      ],
    });
    if (!horario) throw new Error("❌ Horario no encontrado");
    return horario;
  }

  // Validar que los campos sean correctos
  static async validarCampos(datos) {
    const errores = [];

    if (!datos.id_ruta) errores.push("❌ El campo 'id_ruta' es obligatorio");
    if (!datos.id_bus) errores.push("❌ El campo 'id_bus' es obligatorio");
    if (!datos.fecha_salida) errores.push("❌ El campo 'fecha_salida' es obligatorio");
    if (!datos.fecha_llegada) errores.push("❌ El campo 'fecha_llegada' es obligatorio");

    if (errores.length > 0) throw new Error(errores.join(". "));

    // Verificar si la Ruta y el Autobús existen
    const ruta = await Ruta.findByPk(datos.id_ruta);
    if (!ruta) throw new Error(`❌ La ruta con id_ruta = ${datos.id_ruta} no existe`);

    const autobus = await Autobus.findByPk(datos.id_bus);
    if (!autobus) throw new Error(`❌ El autobús con id_bus = ${datos.id_bus} no existe`);

    // Validar fecha correcta
    const hoy = new Date().setHours(0, 0, 0, 0);
    const salida = new Date(datos.fecha_salida).setHours(0, 0, 0, 0);
    const llegada = new Date(datos.fecha_llegada).setHours(0, 0, 0, 0);

    if (salida < hoy) errores.push("❌ La 'fecha_salida' no puede ser en el pasado");
    if (llegada < hoy) errores.push("❌ La 'fecha_llegada' no puede ser en el pasado");
    if (salida !== llegada) errores.push("❌ La 'fecha_salida' y 'fecha_llegada' deben ser el mismo día");

    if (errores.length > 0) throw new Error(errores.join(". "));
  }

  // Crear un nuevo horario con validaciones
  static async crearHorario(datos) {
    await this.validarCampos(datos);
    return await Horario.create(datos);
  }

  // Actualizar horario con validaciones
  static async actualizarHorario(id, datos) {
    const horario = await Horario.findByPk(id);
    if (!horario) throw new Error("❌ Horario no encontrado");
    await this.validarCampos(datos);
    await horario.update(datos);
    return { message: "✅ Horario actualizado correctamente" };
  }

  // Eliminar un horario
  static async eliminarHorario(id) {
    const horario = await Horario.findByPk(id);
    if (!horario) throw new Error("❌ Horario no encontrado");
    await horario.destroy();
    return { message: "✅ Horario eliminado correctamente" };
  }
}

module.exports = HorarioService;
