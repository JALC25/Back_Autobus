const UsuarioService = require('../services/usuarioService');

class UsuarioController {
    // Obtener todos los usuarios
    static async getUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un usuario por ID
    static async getUsuarioById(req, res) {
        try {
            const usuario = await UsuarioService.getUsuarioById(req.params.id);
            if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear un nuevo usuario
    static async createUsuario(req, res) {
        try {
            const usuario = await UsuarioService.createUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un usuario
    static async updateUsuario(req, res) {
        try {
            const usuario = await UsuarioService.updateUsuario(req.params.id, req.body);
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un usuario
    static async deleteUsuario(req, res) {
        try {
            await UsuarioService.deleteUsuario(req.params.id);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuarioController;
