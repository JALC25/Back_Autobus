const AutobusService = require("../services/autobusService");

class AutobusController {
  // Obtener todos los autobuses
  static async obtenerAutobuses(req, res) {
    try {
      const autobuses = await AutobusService.obtenerAutobuses();
      res.json(autobuses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los autobuses", detalle: error.message });
    }
  }

  // Obtener un autobús por ID
  static async obtenerAutobusPorId(req, res) {
    try {
      const { id } = req.params;
      const autobus = await AutobusService.obtenerAutobusPorId(id);
      res.json(autobus);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Crear un nuevo autobús
  static async crearAutobus(req, res) {
    try {
      const datos = req.body;
      const nuevoAutobus = await AutobusService.crearAutobus(datos);
      res.status(201).json({ message: "🚍 Autobús creado correctamente", autobus: nuevoAutobus });
    } catch (error) {
      res.status(400).json({ error: "Error al crear el autobús", detalle: error.message });
    }
  }

  // Actualizar un autobús
  static async actualizarAutobus(req, res) {
    try {
      const { id } = req.params;
      const datos = req.body;
      const autobusActualizado = await AutobusService.actualizarAutobus(id, datos);
      res.json({ message: "✅ Autobús actualizado correctamente", autobus: autobusActualizado });
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el autobús", detalle: error.message });
    }
  }

  // Eliminar un autobús
  static async eliminarAutobus(req, res) {
    try {
      const { id } = req.params;
      await AutobusService.eliminarAutobus(id);
      res.json({ message: "🗑️ Autobús eliminado correctamente" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = AutobusController;
