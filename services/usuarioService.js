const Usuario = require('../models/Usuario');

class UsuarioService {
    // Obtener todos los usuarios con su rol
    static async getAllUsuarios() {
        return await Usuario.findAll({ include: 'Rol' });
    }

    // Obtener un usuario por ID
    static async getUsuarioById(id) {
        return await Usuario.findByPk(id, { include: 'Rol' });
    }

    // Crear un nuevo usuario
    static async createUsuario(data) {
        return await Usuario.create(data);
    }

    // Actualizar un usuario
    static async updateUsuario(id, data) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error('Usuario no encontrado');
        return await usuario.update(data);
    }

    // Eliminar un usuario
    static async deleteUsuario(id) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error('Usuario no encontrado');
        return await usuario.destroy();
    }
}

module.exports = UsuarioService;

