const HorarioService = require("../services/HorarioService");

class HorarioController {
  static async obtenerHorarios(req, res) {
    try {
      const horarios = await HorarioService.obtenerHorarios();
      res.json(horarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerHorarioPorId(req, res) {
    try {
      const horario = await HorarioService.obtenerHorarioPorId(req.params.id);
      res.json(horario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async crearHorario(req, res) {
    try {
      const nuevoHorario = await HorarioService.crearHorario(req.body);
      res.status(201).json(nuevoHorario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async actualizarHorario(req, res) {
    try {
      const mensaje = await HorarioService.actualizarHorario(req.params.id, req.body);
      res.json(mensaje);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async eliminarHorario(req, res) {
    try {
      const mensaje = await HorarioService.eliminarHorario(req.params.id);
      res.json(mensaje);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = HorarioController;
