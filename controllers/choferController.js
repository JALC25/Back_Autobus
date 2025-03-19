const ChoferService = require('../services/choferService');

class ChoferController {
    static async getChoferes(req, res) {
        try {
            const choferes = await ChoferService.obtenerChoferes();
            res.json(choferes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getChoferById(req, res) {
        try {
            const chofer = await ChoferService.obtenerChoferPorId(req.params.id);
            if (!chofer) return res.status(404).json({ error: "Chofer no encontrado" });
            res.json(chofer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createChofer(req, res) {
        try {
            const chofer = await ChoferService.crearChofer(req.body);
            res.status(201).json(chofer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateChofer(req, res) {
        try {
            const respuesta = await ChoferService.actualizarChofer(req.params.id, req.body);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteChofer(req, res) {
        try {
            const respuesta = await ChoferService.eliminarChofer(req.params.id);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ChoferController;
