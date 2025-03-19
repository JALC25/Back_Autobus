const RolService = require('../services/rolService');

class RolController {
    // Obtener todos los roles
    static async getRoles(req, res) {
        try {
            const roles = await RolService.getAllRoles();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un rol por ID
    static async getRolById(req, res) {
        try {
            const rol = await RolService.getRolById(req.params.id);
            if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear un nuevo rol
    static async createRol(req, res) {
        try {
            const rol = await RolService.createRol(req.body);
            res.status(201).json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un rol
    static async updateRol(req, res) {
        try {
            const rol = await RolService.updateRol(req.params.id, req.body);
            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un rol
    static async deleteRol(req, res) {
        try {
            await RolService.deleteRol(req.params.id);
            res.json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RolController;
