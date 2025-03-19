const TransaccionService = require('../services/TransaccionService');

class TransaccionController {
    static async obtenerTransacciones(req, res) {
        try {
            const transacciones = await TransaccionService.obtenerTransacciones();
            res.json(transacciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtenerTransaccionPorId(req, res) {
        try {
            const transaccion = await TransaccionService.obtenerTransaccionPorId(req.params.id);
            if (!transaccion) return res.status(404).json({ error: "Transacción no encontrada" });
            res.json(transaccion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async crearTransaccion(req, res) {
        try {
            const nuevaTransaccion = await TransaccionService.crearTransaccion(req.body);
            res.status(201).json(nuevaTransaccion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async actualizarTransaccion(req, res) {
        try {
            const mensaje = await TransaccionService.actualizarTransaccion(req.params.id, req.body);
            res.json(mensaje);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async eliminarTransaccion(req, res) {
        try {
            const mensaje = await TransaccionService.eliminarTransaccion(req.params.id);
            res.json(mensaje);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TransaccionController;
