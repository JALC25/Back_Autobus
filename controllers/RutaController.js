const RutaService = require("../services/RutaService");

class RutaController {
  // Obtener todas las rutas
  static async obtenerRutas(req, res) {
    try {
      const rutas = await RutaService.obtenerRutas();
      res.json(rutas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una ruta por ID
  static async obtenerRutaPorId(req, res) {
    try {
      const ruta = await RutaService.obtenerRutaPorId(req.params.id);
      res.json(ruta);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Crear una nueva ruta
  static async crearRuta(req, res) {
    try {
      const nuevaRuta = await RutaService.crearRuta(req.body);
      res.status(201).json(nuevaRuta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una ruta
  static async actualizarRuta(req, res) {
    try {
      const mensaje = await RutaService.actualizarRuta(req.params.id, req.body);
      res.json(mensaje);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una ruta
  static async eliminarRuta(req, res) {
    try {
      const mensaje = await RutaService.eliminarRuta(req.params.id);
      res.json(mensaje);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = RutaController;
