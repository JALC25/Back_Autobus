const AsientoService = require("../services/AsientoService");

class AsientoController {
  static async obtenerAsientos(req, res) {
    try {
      const asientos = await AsientoService.obtenerAsientos();
      res.json(asientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerAsientoPorId(req, res) {
    try {
      const asiento = await AsientoService.obtenerAsientoPorId(req.params.id);
      if (!asiento) return res.status(404).json({ error: "Asiento no encontrado" });
      res.json(asiento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async crearAsiento(req, res) {
    try {
      const nuevoAsiento = await AsientoService.crearAsiento(req.body);
      res.status(201).json(nuevoAsiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async actualizarAsiento(req, res) {
    try {
      await AsientoService.actualizarAsiento(req.params.id, req.body);
      res.json({ message: "Asiento actualizado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async eliminarAsiento(req, res) {
    try {
      await AsientoService.eliminarAsiento(req.params.id);
      res.json({ message: "Asiento eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AsientoController;
