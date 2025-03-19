const Asiento = require("../models/Asiento");
const Horario = require("../models/Horario");
const Autobus = require("../models/Autobus");

class AsientoService {
  // Obtener todos los asientos
  static async obtenerAsientos() {
    return await Asiento.findAll({
      include: [
        { model: Horario, as: "Horario" },
        { model: Autobus, as: "Autobus" }
      ]
    });
  }

  // Obtener un asiento por ID
  static async obtenerAsientoPorId(id) {
    return await Asiento.findByPk(id, {
      include: [
        { model: Horario, as: "Horario" },
        { model: Autobus, as: "Autobus" }
      ]
    });
  }

  // Crear un nuevo asiento con validaciones
  static async crearAsiento(datos) {
    if (!datos.id_horario || !datos.id_bus || !datos.numero_asiento) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Verificar que el horario y el bus existen
    const horario = await Horario.findByPk(datos.id_horario);
    if (!horario) throw new Error(`El id_horario (${datos.id_horario}) no existe.`);

    const autobus = await Autobus.findByPk(datos.id_bus);
    if (!autobus) throw new Error(`El id_bus (${datos.id_bus}) no existe.`);

    // Verificar si el asiento ya existe en el mismo bus
    const asientoExistente = await Asiento.findOne({ 
      where: { id_bus: datos.id_bus, numero_asiento: datos.numero_asiento }
    });
    if (asientoExistente) {
      throw new Error(`El asiento número ${datos.numero_asiento} ya está registrado en este autobús.`);
    }

    return await Asiento.create(datos);
  }

  // Actualizar asiento con validaciones
  static async actualizarAsiento(id, datos) {
    const asiento = await Asiento.findByPk(id);
    if (!asiento) throw new Error("Asiento no encontrado");

    await asiento.update(datos);
    return { message: "Asiento actualizado correctamente" };
  }

  // Eliminar asiento
  static async eliminarAsiento(id) {
    const asiento = await Asiento.findByPk(id);
    if (!asiento) throw new Error("Asiento no encontrado");

    await asiento.destroy();
    return { message: "Asiento eliminado correctamente" };
  }
}

module.exports = AsientoService;
